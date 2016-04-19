var app = angular.module('busscanner.services', []);

app.service("UserService", ["$rootScope", '$timeout', '$q', function($rootScope, $timeout, $q) {
  var vm = this;
  vm.login = login;

  var localDb = new PouchDB('user');
  var remote = new PouchDB('https://ismilvenesserstionedgall:4924f4c5398da1cbde46bcbdcb8da58bcf16a628@seaniemc.cloudant.com/bus-scan-users');
  var opts = {
    since: 'now',
    live: true
  };
  var db = remote;
  vm.loggedIn = false;
  vm.saveUser = saveUser;

  function login(user) {
    return $q(function(resolve, reject) {
      db.allDocs({
        include_docs: true,
        descending: true
      }, function(err, doc) {
        console.log('Checking users on remote db...');

        doc.rows.forEach(function(entry) {
          if(!loggedIn){
             console.log('entry: ' + JSON.stringify(entry.doc));
          }
         
          if (entry.doc.email === user.email && entry.doc.password === user.password) {
            vm.loggedIn = true;
            console.log('1: vm.loggedIn: ' + vm.loggedIn);
            user._id = Date.now().toString();
            // remove all other users
            localDb.put(user);
            // break;
          }
        });

        if (vm.loggedIn) {


          resolve('logged in');
        } else {

          reject('incorrect details');
        }

        $timeout(function() {
          $rootScope.$apply();
        });

      }).catch(function(err) {
        console.log('err: ' + err);
      });

      $timeout(function() {
        $rootScope.$apply();
      });

    }, 1000)
  };

  function saveUser(formData) {
    return $q(function(resolve, reject) {
      formData._id = Date.now().toString;
      
      var newUser = {};
      newUser.firstName = formData.firstName;
      newUser.lastName = formData.lastName;
      newUser.email = formData.email;
      newUser.password = formData.password;
      newUser._id = Date.now().toString();
      
      console.log('saveUser::formData: ' + JSON.stringify(formData));
      console.log('newUser::formData: ' + JSON.stringify(newUser));
      
      db.put(newUser).then(function(response){
         resolve('signed up');
      }).catch(function(err){
        reject('incorrect details');
      });

    }, 1000)
  };

}]);

