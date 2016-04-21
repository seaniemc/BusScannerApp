var app = angular.module('busscanner.controllers', []);

app.controller('DashCtrl', function($scope) {
    $scope.destinations = [
        {name:"Galway"},
        {name:"Sligo"},
        {name:"Dublin"},
        {name:"Limerick"},
        {name:"Cork"},
        {name:"Belfast"},
        {name:"Kilkenny"}
    ];
});

app.controller('SignupCtrl', ['$scope', "$q", '$state', 'UserService', '$ionicPopup', function($scope, $q, $state, UserService, $ionicPopup) {
    //creates an array of empty users
    var timeStamp = String(new Date().getTime());


    console.log('in SignupCtrl');

    $scope.signup = function(formData) {
        console.log('signUp:');
        console.log('formData: ' + JSON.stringify(formData));
        //passes the formData ie(firstName, lastName, email, password) UserService
        var promise = UserService.saveUser(formData);

        promise.then(function(data) {
            console.log('success: ' + data);
            var alertPopup = $ionicPopup.alert({
                title: 'Successfully signed up',
                template: ''
            });

            alertPopup.then(function(res) {
                $state.go('tab.dash');
            });
            
            UserService.login(formData);    // auto login
        }, function(data) {
            console.log('failure: ' + data);
            $ionicPopup.alert({
                title: 'Signup Unsuccessful',
                template: 'Try Again'
            });
        });
    }
              
}]);

//the login controller
app.controller('LoginCtrl', function($scope, $state, UserService, $ionicPopup) {
    //var vm = this;
    //vm.login = login;
    console.log('in LoginCtrl');

    $scope.userLogin = function(formData) {
        console.log('login:');
        console.log('formData: ' + JSON.stringify(formData));
        var promise = UserService.login(formData);

        promise.then(function(data) {
            console.log('success: ' + data);
            var alertPopup = $ionicPopup.alert({
                title: 'Successfully logged in',
                template: ''
            });

            alertPopup.then(function(res) {
                $state.go('tab.dash');
            });
        }, function(data) {
            console.log('failure: ' + data);
            $ionicPopup.alert({
                title: 'Login Unsuccessful',
                template: 'Try Again'
            });
        });
    }

    //function login(formData) {
    //    console.log('login:');
    //    console.log('formData: ' + JSON.stringify(formData));
    //   UserService.login(formData);
    //}

});