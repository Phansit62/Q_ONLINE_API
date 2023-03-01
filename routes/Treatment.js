var express = require('express');
var router = express.Router();
var sql = require('mssql');
var help = require('../helper/Respon');
var config = 'Server=43.229.149.77,1443;Database=Q_ONLINE;User Id=sa;Password=satpqi#12.1.2564;Encrypt=false';

router.get('/getTreatmentType', async function (req, res, next) {
  try {
    console.log('req :', req.query);

    let search = req.query.search ? req.query.search : '';
    let pagesize = req.query.pagesize ? req.query.pagesize : 10;
    let currentpage = req.query.currentpage ? req.query.currentpage : 1;

    await sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      request.query('SELECT * FROM [Q_ONLINE].[dbo].[treatment_type]', function (err, response) {
        if (response) {
          if (response.recordset) {
            var query = response.recordset;

            if (search) {
              query = query.filter((a) => a.treatment_type_name.includes(search));
            }

            res.send(help.pagination(parseInt(pagesize), parseInt(currentpage), query));
          } else {
            res.send({ statusCode: 200, taskStatus: false, message: 'Unsuccess' });
          }
        } else {
          res.send({ statusCode: 200, taskStatus: false, message: 'Unsuccess' });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/create', function (req, res) {
  try {
    console.log('req :', req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
