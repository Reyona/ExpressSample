/**
 * Created by HUANGCH7 on 3/18/2016.
 */
var express = require('express');
var router = express.Router();

/* Say hi */
router.post('/', function (req, res, next) {
    console.log('Receive: '+req.body.say);
    console.log('Send:    '+'Hi Angular111');
    res.send('Hi Angular111');
});

router.get('/hi', function (req, res, next) {
    console.log('Hi Angular222');
    res.send({message:'Hi Angular222'});
});

module.exports = router;
