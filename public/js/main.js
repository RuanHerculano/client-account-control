angular.module('client-account-control', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider.otherwise({ redirectTo: '/home' });

		$routeProvider.when('/home', {
			templateUrl: 'partials/home/home.html',
			controller: 'HomeController'
		});

		$routeProvider.when('/financial_contributions', {
			templateUrl: 'partials/financial-contributions/index.html',
			controller: 'FinancialContributionsController'
		});

		$routeProvider.when('/financial_contributions/new', {
			templateUrl: 'partials/financial-contributions/new.html',
			controller: 'FinancialContributionController'
		});

		$routeProvider.when('/financial_transactions', {
			templateUrl: 'partials/financial-transactions/index.html',
			controller: 'FinancialTransactionsController'
		});

		$routeProvider.when('/financial_transactions/new', {
			templateUrl: 'partials/financial-transactions/new.html',
			controller: 'FinancialTransactionController'
		});

		$routeProvider.when('/accounts', {
			templateUrl: 'partials/accounts/index.html',
			controller: 'AccountsController'
		});

		$routeProvider.when('/accounts/edit/:accountId', {
			templateUrl: 'partials/accounts/new.html',
			controller: 'AccountController'
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
			templateUrl: 'partials/corporate-entities/new.html',
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
