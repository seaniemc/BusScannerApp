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
          console.log('entry: ' + JSON.stringify(entry.doc));
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

  function saveUser(firstname, lastName, email, password) {

  };

}]);

app.service("PuchDBListener", ["$rootScope", function($rootScope) {











  localDB.changes({
    //continuous looking for changes
    continuous: true,
    //when change it calls the call back
    onChange: function(change) {
      //if the change is not a delete, then we tell rootscope there is a change coming 
      if (!change.deleted) {
        $rootScope.$apply(function() {
          //get the change based on the id
          localDB.get(change.id, function(err, doc) {
            $rootScope.$apply(function() {
              if (err) {
                console.log(err);
              }
              //if its not an error broadcast the change
              $rootScope.$broadcast('add', doc);
            })
          });
        })
      } else {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('delete', change.id);
        });
      }
    }
  })
  return true;
}]);