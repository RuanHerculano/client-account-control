angular.module('client-account-control', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.otherwise({ redirectTo: '/home'});

	$routeProvider.when('/home', {
		templateUrl: 'partials/home/home.html',
		controller: 'HomeController'
	});

	$routeProvider.when('/corporate_entities', {
		templateUrl: 'partials/corporate-entities/index.html',
		controller: 'CorporateEntitiesController'
	});

	$routeProvider.when('/corporate_entities/new', {
		templateUrl: 'partials/corporate-entities/new.html',
		controller: 'CorporateEntityController'
	});

	$routeProvider.when('/corporate_entities/edit/:corporateEntityId', {
		templateUrl: 'partials/individual-entities/new.html',
		controller: 'CorporateEntityController'
	});

	$routeProvider.when('/individual_entities', {
		templateUrl: 'partials/individual-entities/index.html',
		controller: 'IndividualEntitiesController'
	});

	$routeProvider.when('/individual_entities/new', {
		templateUrl: 'partials/individual-entities/new.html',
		controller: 'IndividualEntityController'
	});

	$routeProvider.when('/individual_entities/edit/:individualEntityId', {
		templateUrl: 'partials/individual-entities/new.html',
		controller: 'IndividualEntityController'
	});
});
