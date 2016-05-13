angular.module('iqApp', ['ngRoute', 'ngMaterial', 'underscore', 'jm.i18next', 'iq.controllers', 'iq.services', 'iq.cache'])

.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'views/home.html',
				controller : 'HomeCtrl' 
			}).when('/front/:mode', {
				templateUrl : 'views/front.html',
				controller : 'FrontCtrl'
      }).when('/qnr/:mode', {
        templateUrl : 'views/qnr.html',
        controller : 'QnrCtrl'
      /*  
			}).when('/recipie/:id', {
				templateUrl : 'views/recipie.html',
				controller : 'RecipieCtrl'
      */  
			}).otherwise({
				redirectTo : '/home'
			});
		}
	])
.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('light-green')
		.accentPalette('brown')
    .warnPalette('red');
	})
.run(function($rootScope, $location) {

	  //Share App
  	$rootScope.share = function () {   
  		window.analytics.trackEvent('Setting', 'App Share');    
  		window.plugins.socialsharing.share('Reasoing Refresher - Keep testing your IQ', 'Reasoning Refresher', null, 'https://play.google.com/store/apps/details?id=com.smart.droid.reasoning');
  	}

  	//Rate US
  	$rootScope.rateus = function () {        
      window.analytics.trackEvent('Setting', 'Rate Us');    
		  var url = "market://details?id=com.smart.droid.reasoning";
      window.open(url,"_system");		
  	};  

  	//Feedback
  	$rootScope.feedback = function () {        
      window.analytics.trackEvent('Setting', 'Feedback');    
  		//FIXME - Collect version from app 
  		window.plugin.email.open({
			 to:      ['smartdroidies@gmail.com'],
			 subject: 'Feedback on Reasoning Refresher',
			 body:    '',
			 isHtml:  true
		  });
  	};

    /*
  	//Recipies
  	$rootScope.recipie = function (piruvu) {        
  	    var newpath = "/recipies/" + piruvu;
	    $location.path(newpath); 
  	};  

  	//Go Back
  	$rootScope.back = function () {        
  		window.history.back();
  	};  
    */

});



/*
//ng-i18next - use i18next with Angularjs
angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
    $i18nextProvider.options = {
        lng: 'ta',
        useCookie: false,
        useLocalStorage: false,
        fallbackLng: 'en',
        resGetPath: 'locales/__lng__/__ns__.json',
        defaultLoadingValue: '' // ng-i18next option, *NOT* directly supported by i18next
    };
}]);
*/