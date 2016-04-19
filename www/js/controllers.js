var app = angular.module('busscanner.controllers', []);

app.controller('DashCtrl', function($scope) {});

app.controller('SignupCtrl', ['$scope', 'PuchDBListener', "$q", '$state', 'UserService', '$ionicPopup', function($scope, PuchDBListener, $q, $state, UserService, $ionicPopup) {
    //creates an array of empty users
    var timeStamp = String(new Date().getTime());
    // $scope.buscanuser = [];

    // console.log('$scope.firstName: ' + JSON.stringify($scope.firstName));
    // $scope.busscanuser = {

    //     "firstName": $scope.firstName,
    //     "lastName": $scope.busscanuser.lastName,
    //     "email": $scope.busscanuser.email,
    //     "password": $scope.busscanuser.password
    // };


    console.log('in LoginCtrl');

    $scope.signup = function(formData) {
        console.log('signUp:');
        console.log('formData: ' + JSON.stringify(formData));
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

        
        // if (form.isvalid) {
        //     console.log("SignupCtrl::signup");
        // } else {
        //     console.log("invalid form");
        // }

        // if (signupForm.isvalid) {
        //     if ($scope.hasOwnProperty("buscanusers") !== true) {
        //         $scope.buscanusers = [];
        //     }

        //     console.log('form is valid');
        // } else {
        //     console.log('form is invalid');
        // }
        // .then(function(result) {
        //     if (result !== "") {
        //         if ($scope.hasOwnProperty("buscanusers") !== true) {
        //             $scope.buscanusers = [];
        //         }
        //         localDB.post({
        //             form: result
        //         });
        //     } else {
        //         console.log("Action not completed");
        //     }
        // });



    // $scope.$on("add", function(event, buscanusers) {
        // $scope.busscanuser.push(buscanusers);
    // });

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