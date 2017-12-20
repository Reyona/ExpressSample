/**
 * Created by HUANGCH7 on 4/12/2016.
 */

var UserDao=require('./dao/UserDao');
var userDao=new UserDao();
userDao.connect();

userDao.login('cherry6','999',function(result){
    if(result===null) console.log('Login:'+result);
    else console.log('Login:'+JSON.stringify(result));
});

/*var newUsers=[{name:"cherry8",password:"111"},{name:"cherry2",password:"222"}];
userDao.insert(newUsers,function(result){
    console.log('Insert:'+result);
});

var removeCriteria={name:"cherry2"};
userDao.remove(removeCriteria,function(result){
    console.log('Remove:'+result);
});*/

var updateCriteria={name:"cherry8"};
var update={$set:{password:"898"}};
userDao.update(updateCriteria,update,function(result){
    console.log('Update:'+result);
});