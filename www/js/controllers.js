var app = angular.module('busscanner.controllers', []);

 app.controller('DashCtrl', function($scope) {})

app.controller('SignupCtrl', function($scope, PuchDBListener, $state) {
    //creates an array of empty users
    $scope.users[];
    
    $scope.on("add", function(event, users) {
        $scope.users.push(user);
    });
    
    
    
    $scope.formData = {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": ""
        };

        $scope.signup = function () {
            console.log("SignupCtrl::signup");
            //TODO
        };
});

//the login controller
app.controller('LoginCtrl', function($scope, $state) {
  $scope.formData = {
    "email": "",
    "password": ""
  };
  
  $scope.login = function (form) {
       
      if(form.isvalid){
          console.log("LoginCtrl::login");
      }
      else{
          console.log("invalid form");
      }
  };
  
});
