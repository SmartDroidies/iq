angular.module('iq.controllers', [])

//Home Controller
.controller('HomeCtrl', function($scope, $location, $rootScope) {

  //Show Home Page
  $scope.displayView = function () {    
    //$scope.displayCategories();
  }; 

  //Show Home Page
  $scope.displayCategories = function () {    

    var promise =  Category.getCategories();
    promise.then (
      function(data) {
        $scope.categories = data.categories;
        //console.log("Data Collected " + JSON.stringify(data));
      },
      function(error) {
        //FIXME - Display Error
        console.log('No Categories Found.');
      });
  }; 

  //Method to take to recipie listing
  $scope.recipie = function (piruvu) {        
    //console.log("Display listing for : " + piruvu);
    var newpath = "/recipies/" + piruvu;
    //console.log("New Path to Navigate : " + newpath);
    $location.path(newpath); 
  }  

  //Show Home
  $scope.displayView();


})
