angular.module('client-account-control')
	.controller('IndividualEntitiesController', function ($scope, $http) {
		$scope.individualEntities = [];
		$scope.message = '';
		var url = 'http://localhost:3000/individual_entities';
		var responseExtension = '.json';

		$http.get(url + responseExtension)
			.then(function (response) {
				$scope.individualEntities = response.data;
				$scope.message = 'Lista carregada com sucesso.'
			}).catch(function (error) {
				$scope.message = 'Erro ao carregar lista';
			});
	});
