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
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
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
      var sql= "SELECT * FROM Asiakas WHERE 1=1";
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
        console.log(sql+=" AND ASTY_AVAIN LIKE '"+req.query.asiakastyyppi+"%'");
        sql+=" AND ASTY_AVAIN LIKE '"+req.query.asiakastyyppi+"%'";
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
      //connection.query...
      console.log("Data="+JSON.stringify(reg.body))
      console.log(reg.body.nimi)
      res.send("Kutsuttiin create");
    },

    update: function(req, res){

    },

    delete : function (req, res) {
      console.log("Body= "+JSON.stringify(reg.body))
      console.log("Params= "+JSON.stringify(reg.params))
      res.send("Kutsuttiin delete");
    }
}
