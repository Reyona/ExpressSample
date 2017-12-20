/**
 * Created by HUANGCH7 on 4/26/2016.
 */
var express = require('express');
var router = express.Router();
var UserDao=require('../dao/UserDao');
var userDao=new UserDao();

/* Login */
router.post('/', function (req, res, next) {
    var token;
    console.log('Receive: '+req.body.userName+req.body.password);
    userDao.connect();
    userDao.login(req.body.userName,req.body.password,function(result){
        userDao.disconnect();
        if(result.length==0) {
            console.log('Login:'+result);
            token='';
        }
        else {
            console.log('Login:'+JSON.stringify(result));
            token=result[0]._id;
        }
        console.log('Send:    '+token);
        res.send(token);
    });
});

module.exports = router;
