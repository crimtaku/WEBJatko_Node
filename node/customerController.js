'use strict'

const { json } = require('body-parser');
// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost', //tietokantapalvelimen osoite
  port : 3306, //oletuksena portti 3006, vaihda oma portti
  user : "root", //vaihda oma root
  password:"Natsumikohaku1324", //vaihda oma salasana
  database:"asiakas",
});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT avain, lyhenne, selite FROM Asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("virhe haettaessa dataa Asiakas-taulusta. " + error);
          res.status(500);
          res.json({"status" :"Ei toimi"});
        }
        else
        {
          console.log("Data = "+JSON.stringify(results))
          res.json(results); //onnistunut data lähetetään selaimelle
        }
    });

    },

    fetchAll: function(req, res){
      //tähän connection.query... katso fetchTypes
      //Haettaessa yksittäistä saadaan vaatimukset tavalla req.query.nimi
      var sql= "SELECT avain, nimi, osoite, postinro, postitmp, luontipvm, asty_avain FROM Asiakas WHERE 1=1";
      console.log(req.query.nimi);
      console.log(req.query.osoite);
      console.log(req.query.asiakastyyppi);
      if (req.query.nimi!=undefined){
        console.log(sql+=" AND nimi LIKE '"+req.query.nimi+"%'");
        console.log(JSON.stringify(req.query.nimi));
        sql+=" AND nimi LIKE '"+req.query.nimi+"%'";
      }

      if (req.query.osoite!=undefined){
        console.log(sql+=" AND osoite='"+req.query.osoite+"%'");
        sql+=" AND osoite LIKE '"+req.query.osoite+"%'";
      }

      if (req.query.asiakastyyppi!=undefined){
        console.log(sql+=" AND asty_avain LIKE '"+req.query.asiakastyyppi+"%'");
        sql+=" AND asty_avain LIKE '"+req.query.asiakastyyppi+"%'";
      }

      connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("virhe haettaessa dataa Asiakas-taulusta. " + error);
          res.status(500);
          res.json({"status" :"Ei toimi"});
        }
        else
        {
          console.log("Data = "+JSON.stringify(results))
          res.status(200);
          res.json(results); //onnistunut data lähetetään selaimelle
        }
    });
    
    },


    create: function(req, res){

      var dateObj = new Date();
      var month = dateObj.getMonth() + 1; //months from 1-12
      var day = dateObj.getDate();
      var year = dateObj.getFullYear();

      var newdate = year + "-" + month + "-" + day;

      var sql="INSERT INTO asiakas (nimi, osoite, postinro, postitmp, luontipvm, asty_avain) VALUES ('";

      sql+= req.body.nimi + "', '" + req.body.osoite + "', '" + req.body.postinro + "', '" + req.body.postitmp + "', '" + newdate +  "', '" + req.body.asty_avain + "')";

      console.log(sql);

      if (req.body.nimi==""  || req.body.osoite==""  || req.body.postinro==""  || req.body.postitmp=="" || req.body.asty_avain=="" ){
        //Jokin tarvittava data puuttui
        res.status(418);
        res.send("Tarvittava datakenttä oli tyhjä");
      }

      else{
        //Kaikki tarvittavat kentät löytyivät, data lähetetään eteenpäin
        connection.query(sql, function(error, results, fields){
          if ( error ){
            console.log("virhe lisättäessä dataa Asiakas-tauluun. " + error);
            res.status(500);
            res.json({"status" :"Ei toimi"});
          }
          else
          {
            console.log("Data = "+JSON.stringify(results))
            res.status(201);
            res.json(results); //onnistunut data lähetetään selaimelle
          }
        });
      }




      //connection.query...
      console.log("Data="+JSON.stringify(req.body))
      console.log(req.body.nimi)
    },

    update: function(req, res){

    },

    delete : function (req, res) {

      var sql="DELETE FROM asiakas WHERE avain='"+req.params.id+"'";
      console.log(sql);

      connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("virhe poistaessa dataa Asiakas-taulusta. " + error);
          res.status(500);
          res.json({"status" :"Ei toimi"});
        }
        else
        {
          console.log("Data = "+JSON.stringify(results))
          res.status(200);
          res.json(results); //onnistunut data lähetetään selaimelle
        }
    });


      console.log("Body= "+JSON.stringify(req.body))
      console.log("Params= "+JSON.stringify(req.params))
      //res.send("Kutsuttiin delete");
    }

}
