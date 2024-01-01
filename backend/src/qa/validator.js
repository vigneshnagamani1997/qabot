const { validationResult } = require('express-validator');
const controller = require('../../controller');

const validate = {
    result: (req, res, validate)=>{
        const validationResultObj = validationResult(req);
        if(validationResultObj.isEmpty()) {
            return true;
        } else {
            controller.invalid(res,validationResultObj); 
            return false;
        }
    },
    getInput: {
        ques: {
            in: ['body'],
            isString: true,
            notEmpty: true,
            errorMessage: 'Invalid question',
            isLength: {
                options: { min: 3 },
                errorMessage: 'question should be at least 3 chars',
              },
        }      
    },
    suggestion: {
        ques: {
            in: ['body'],
            isString: true,
            notEmpty: true,
            errorMessage: 'Invalid question',
            isLength: {
                options: { min: 3 },
                errorMessage: 'question should be at least 3 chars',
              },
        },
        suggestion: {
            in: ['body'],
            isString: true,
            notEmpty: true,
            errorMessage: 'Invalid suggestion',
            isLength: {
                options: { min: 3 },
                errorMessage: 'suggestion should be at least 3 chars',
              },
        }      
    },
}
module.exports = validate;