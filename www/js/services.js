var app = angular.module('busscanner.services', []);

app.service("UserService", ["$rootScope", function($rootScope) {
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
    db.allDocs({
      include_docs: true,
      descending: true
    }, function(err, doc) {
      console.log('Checking users on remote db...');

      doc.rows.forEach(function(entry) {
        if (element.email === user.email && element.password === user.password) {
          vm.loggedIn = true;
          localDb.put(entry);
          // break;
        }
      });

      $timeout(function() {
        $rootScope.$apply();
      });

    }).catch(function(err) {
      console.log('err: ' + err);
          var alertPopup =  $ionicPopup.alert({
            title: 'Unsuccessfully logged in.',
            template: 'Try Again'
        });
        alertPopup.then(function(res) {
            $state.go('tab.dash');
        });
    }).then(function(response){
       $ionicPopup.confirm({
            title: 'Successfully logged in.',
            template: ''
        });
    });

    $timeout(function() {
      $rootScope.$apply();
    });
  }

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