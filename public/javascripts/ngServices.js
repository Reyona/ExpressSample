/**
 * Created by HUANGCH7 on 4/26/2016.
 */

var ngServices=angular.module('ngServices',['ngCookies']);
ngServices.factory('Auth',['$cookieStore','ACCESS_LEVELS',
    function ($cookieStore,ACCESS_LEVELS){
        var _user=$cookieStore.get('user')||{role:ACCESS_LEVELS.public};

        var setUser=function(user){
            if(!user.role||user.role<0){
                user.role=ACCESS_LEVELS.public;
            }
            _user=user;
            $cookieStore.put('user',_user);
        };

        return{
            setUser:setUser,
            getUser:function(){
                return _user;
            },
            getToken:function(){
                return _user.token?_user.token:'';
            },
            isLoggedIn:function(){
                return _user.token==='';
            },
            isAuthorized:function(lvl){
                alert('_user.role token ='+_user.role);
                if(_user.role==undefined) {
                    return false;
                }
                return _user.role>=lvl;
            },
            login:function(token){
                if(token!=''){
                    _user.role=ACCESS_LEVELS.user;
                    _user.token=token;
                }
            },
            logout:function(){
                $cookieStore.remove('user');
                _user=null;//{role:ACCESS_LEVELS.public}
            }
        }
    }
]);