angular.module('busscanner.services', []);


factory("PuchDBListener", ["$rootScope", function($rootScope) {
  
  localDB.changes({
    //continuous looking for changes
    continuous: true,
    //when change it calls the call back
    onChange: function(change){
      //if the change is not a delete, then we tell rootscope there is a change coming 
      if(!change.deleted){
        $rootScope.$apply(function(){
          //get the change based on the id
          localDB.get(change.id, function(err, doc){
            $rootScope.$apply(function(){
              if (err){ 
                  console.log(err);
                  }
                  //if its not an error broadcast the change
              $rootScope.$broadcast('add', doc);
            })
          });
        })
      }else{
        $rootScope.$apply(function(){
          $rootScope.$broadcast('delete', change.id);
        });
      }
    }
  })
  
}]);
