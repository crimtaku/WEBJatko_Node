'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({

});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
        if ( error ){
          
        }
        else
        {
        
        }
    });

    },

    fetchAll: function(req, res){
        
      res.send("Kutsuttiin fetchAll");
    },

    create: function(req, res){
    
      res.send("Kutsuttiin create");
    },

    update: function(req, res){

    },

    delete : function (req, res) {
        res.send("Kutsuttiin delete");
    }
}
