var app = angular.module('busscanner.controllers', []);

 app.controller('DashCtrl', function($scope) {})

app.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

//the login controller
app.controller('LoginCtrl', function($scope, $state) {
  $scope.formData = {
    "email": "",
    "password": ""
  };
  
  $scope.login = function (form) {
       console.log("LoginCtrl::login");
      if(form.valid){
          
      }else{
          console.log("invalid form");
      }
  };
  
});
