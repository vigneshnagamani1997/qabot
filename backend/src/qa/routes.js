const express = require('express');
const controller = require('../../controller');
const router = express.Router();
const connection = require('../../mysql-dbconnecton');
const validate = require('./validator');
const { checkExact, checkSchema  } = require('express-validator');

// Validation middleware using checkSchema
router.post('/suggestedans', checkExact(checkSchema(validate.suggestion)), (req, res) => {
    if(validate.result(req,res, validate.suggestion)) {
        const qry = 'INSERT INTO `qa_serve`( `question`, `answer`, `approved`, `last_updated`) VALUES ("'+ req.body.ques +'", "'+ req.body.suggestion +'", null, "GETDATE()")';
        connection.query(qry, (err, rows, fields) => {
            if (!err) {
                const resObj = {
                    numOfRec: rows.length
                }
                if (rows && rows.length) {
                    resObj['reply'] = 'Thank you for the suggestion will check with our team to approve it..';
                }
                controller.success(res,resObj);
            } else {
                if(err.sqlMessage.includes("Duplicate")) {
                    const resObj = {
                        reply: 'Thank you for the suggestion will check with our team to approve it..'
                    };
                    controller.success(res,resObj);
                } else {
                    controller.error(res,{});
                }
            }
        });        
    }

});

router.post('/getques', checkExact(checkSchema(validate.getInput)), (req, res) => {
    if(validate.result(req,res, validate.getInput)) {
        const qry = 'SELECT * FROM `qa_serve` WHERE `question` = "' + req.body.ques + '" and `approved` is not NULL';
        connection.query(qry, (err, rows, fields) => {
            if (!err) {
                // console.log('The rows is: ', rows);
                // console.log('The fields is: ', fields);
                const resObj = {
                    numOfRec: rows.length
                }
                if (rows && rows.length) {
                    resObj['ans'] = rows[0]['answer'];
                }
                controller.success(res,resObj);
            } else {
                controller.error(res,{});
                console.error(err);
            }
        });        
    }

});


module.exports = router;