/**
 * Created by HUANGCH7 on 4/26/2016.
 */

var app = angular.module('ngApp',[
    'ngRoute',
    'ngConstants',
    'ngControllers',
    'ngServices'
]);

/*路由配置*/
app.config(['$routeProvider','ACCESS_LEVELS', function ($routeProvider,ACCESS_LEVELS) {
    $routeProvider.
    when('/Login',
        {
            templateUrl: './templates/login.html',
            controller: 'LoginCtrl',
            access_level:ACCESS_LEVELS.public
        }).
    when('/Home',
        {
            templateUrl: './templates/home.html',
            controller: 'HomeCtrl',
            access_level:ACCESS_LEVELS.user
        }).
    otherwise({
        redirectTo: '/Login'
    });
}]);

/*拦截器配置*/
app.config(['$httpProvider',function($httpProvider){
    var interceptor=['$q','$rootScope','Auth',function($q,$rootScope,Auth){
        return {
            'request':function(req){
                req.params=req.params||{};
                if(Auth.isLoggedIn()){
                    req.params.token=Auth.getToken();
                }
                return req;
            },
            'requestError':function(reqErr){
                return reqErr;
            },
            'response':function(resp){
                if(resp.config.url=='/login'){
                    Auth.login(resp.data);
                }
                return resp;
            },
            'responseError':function(rejection){
                switch(rejection.status){
                    case 401:
                        if(rejection.config.url!='/login')
                            $rootScope.$broadcast('auth:loginRequired');
                        break;
                    case 403:
                        $rootScope.$broadcast('auth:forbidden');
                        break;
                    case 404:
                        $rootScope.$broadcast('page:notFound');
                        break;
                    case 500:
                        $rootScope.$broadcast('server:error');
                        break;
                }
                return $q.reject(rejection);
            }
        }
    }];
    $httpProvider.interceptors.push(interceptor);
}]);

app.run(['$rootScope','$location','Auth',function($rootScope,$location,Auth){
    $rootScope.$on('$routeChangeStart',function(evt,next,curr){
        console.log(JSON.stringify(Auth));
        if(!Auth.isAuthorized(next.$$route.access_level)){
            if(Auth.isLoggedIn()){
                $location.path('/Login');
            }
            else{
                $location.path('/Login');
            }
        }
    });
}]);