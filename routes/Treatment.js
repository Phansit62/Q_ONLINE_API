var express = require('express');
var router = express.Router();
var respon = require('../helper/Respon');
var mssql = require('../helper/Connect');

router.get('/getTreatment', async function (req, res) {
  try {
    console.log('req :', req.query);

    let search = req.query.search ? req.query.search : '';
    let pageSize = req.query.pageSize ? req.query.pageSize : 10;
    let currentPage = req.query.currentPage ? req.query.currentPage : 1;

    var request = new mssql.sql.Request();
    request.query('SELECT * FROM [Q_ONLINE].[dbo].[treatment_type]', function (err, response) {
      if (response) {
        if (response.recordset) {
          var query = response.recordset;

          if (search) {
            query = query.filter((a) => a.treatment_type_name.includes(search));
          }

          res.send(respon.pagination(parseInt(pageSize), parseInt(currentPage), query));
        } else {
          res.send({ statusCode: 200, taskStatus: false, message: 'Unsuccess' });
        }
      } else {
        res.send({ statusCode: 200, taskStatus: false, message: 'Unsuccess' });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/createTreatment', function (req, res) {
  try {
    console.log('req :', req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
