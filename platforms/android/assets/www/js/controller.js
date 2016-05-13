angular.module('iq.controllers', [])

//Home Controller
.controller('HomeCtrl', function($scope, $location, $rootScope) {

  //Show Home Page
  $scope.displayView = function () {    
    //$scope.displayCategories();
  }; 


  //Method to take to casual questionnaire
  $scope.casual = function () {        
    var casual = "/front/casual";
    $location.path(casual); 
  }  

  //Show Home
  $scope.displayView();

})

//Front Controller
.controller('FrontCtrl', function($scope, $routeParams, $location) {

  $scope.frontView = function(mode) {
    console.log("Displaying Front Screen for Mode : " + mode);
    $scope.mode = mode;
  }

  $scope.start = function() {
    var pathQnr = "/qnr/" + $scope.mode;
    $location.path(pathQnr); 
  } 

  var mode =  $routeParams.mode;
  $scope.frontView(mode);

})


//Questionnaire Controller
.controller('QnrCtrl', function($scope, $routeParams, $location, Questionnaire) {

  $scope.question = function(mode) {
    console.log("Collect Questions for selected mode");
    var qustions = Questionnaire.getCasualQuestions();
    $scope.mode = mode;
  }

  var mode =  $routeParams.mode;
  $scope.question(mode);

}); 
