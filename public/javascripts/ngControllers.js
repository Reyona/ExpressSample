/**
 * Created by HUANGCH7 on 3/17/2016.
 */

var ngControllers = angular.module('ngControllers',[]);
ngControllers.controller('LoginCtrl',['$scope','$http','$location',LoginCtrl]);
ngControllers.controller('HomeCtrl',['$scope',HomeCtrl]);

function LoginCtrl($scope,$http,$location){
    $scope.greeting='Good morning!';
    $scope.userName='Cherry';
    $scope.password='123';

    $scope.SayHi1=function(){
        var request1={
            method:'POST',
            url:'/hi',
            timeout:10000,
            data:{
                say:'Say Hi to Node111'
            }
        };
        return $http(request1).success(function(data,status,headers){
            alert('Send:  '+request1.data.say+'\nReceive:   '+data);
            return data;
        });
    };

    $scope.SayHi2=function(){
        var request2={
            method:'GET',
            url:'/hi/hi',
            timeout:10000
        };
        return $http(request2).success(function(data,status,headers){
            alert(data.message);
            return data;
        });
    };

    $scope.login=function(){
        var loginRequest={
            method:'POST',
            url:'/login',
            timeout:10000,
            data:{
                userName:$scope.userName,
                password:$scope.password
            }
        };
        return $http(loginRequest).success(function(data,status,headers){
            alert('Send:  '+loginRequest.data.userName+loginRequest.data.password+'\nReceive:   '+data);
            if(data===''){
                alert('ID not exist or password incorrect!');
            }
            else{
                alert('Login Successfully!');
                $location.path('/Home');
            }
            return data;
        });
    };

}

function HomeCtrl($scope){

}