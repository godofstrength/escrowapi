var express = require('express');
var router = express.Router();


router.get('/api', function(req, res){
 res.status(200).json({
    message:'welcome to escrowapp v1.0'
  })
})

module.exports = router;
