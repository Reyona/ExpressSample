/**
 * Created by Reyona on 2016/4/8.
 */

var UserDao=function(){
    var mongoose=require('mongoose');
    var Schema=mongoose.Schema;
    var UserSchema=new Schema({
        name:{type:String,unique:true},
        password:{type:String,unique:false}
    });
    var UserModel=mongoose.model('users',UserSchema);
    var db;

    this.connect=function(){
        mongoose.connect('mongodb://localhost:27017/first',function(err){
            if(err){
                console.log(err);
            }
        });

        db=mongoose.connection;
        db.on('error',function callback(err){
            console.log("Database connection failed. Error: "+err);
        });
        db.once('open',function callback(){
            console.log("Database connection successful.");
        });
    };

    this.disconnect=function(){
        db.close();
        console.log('Database connection is closed!');
    };

    this.login=function(userName,password,callback){//if exsit return true
        return UserModel.find({name:userName,password:password},function(err,result){
            if(err){
                console.log(err);
                callback(null);
            }
            //callback(result.length>0);
            callback(result);
        });
    };

    this.findAll=function(callback){
        return UserModel.find({},function(err,result){
            if(err){
                console.log(err);
            }
            callback(result);
        });
    };

    this.insert=function(newUsers,callback){
        UserModel.create(newUsers,function(err){
            if(err){
                console.log(err);
                callback(false);
            } else {
                console.log('Insert: '+JSON.stringify(newUsers));
                callback(true);
            }
        });
    };

    this.remove=function(criteria,callback){
        UserModel.remove(criteria,function(err){
            if(err){
                console.log(err);
                callback(false);
            } else {
                console.log('Remove: '+JSON.stringify(criteria));
                callback(true);
            }
        });
    };

    this.update=function(criteria,update,callback){
        var options={upsert:true};    /*若criteria搜索结果为空，则插入一条新记录*/
        UserModel.update(criteria,update,options,function(err){
            if(err){
                console.log(err);
                callback(false);
            } else {
                console.log('Update: '+JSON.stringify(update));
                callback(true);
            }
        });
    };



};

module.exports=UserDao;



