'use strict'

const { json } = require('body-parser');
// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost', //tietokantapalvelimen osoite
  port : 3306, //oletuksena portti 3006 
  user : "root", //kehitystarkoituksissa root on ok
  password:"Natsumikohaku1324", //voi jättää tyhjäksi?
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
      connection.query('SELECT Avain, Nimi, Osoite, PostiNro, PostiTmp, LuontiPvm, Asty_Avain FROM Asiakas', function(error, results, fields){
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
