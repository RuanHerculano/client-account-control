angular.module('client-account-control', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.otherwise({ redirectTo: 'individual_entities'});

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
