angular.module('client-account-control').controller('IndividualEntityController', function($scope, $http, $routeParams, $timeout) {
	$scope.individualEntity = {};
	$scope.message = '';
	var url = 'http://localhost:3000/individual_entities';
	var responseExtension = '.json';

	function update() {
		$http({
		    method: 'PUT',
		    url: url + '/' + $scope.individualEntity.id + responseExtension,
		    data: $scope.individualEntity,
		  	headers: headers
		})
		.success(function(response) {
			$scope.individualEntity = {};
			$scope.message = 'Pessoa Física Atualizada com sucesso!';
		})
		.error(function(error) {
			$scope.message = 'Não foi possível cadastrar o Pessoa Física';
		});
	};

	function create() {
		$http({
		    method: 'POST',
		    url: url + responseExtension,
		    data: $scope.individualEntity,
		})
		.success(function(response) {
			$scope.individualEntity = {};
			$scope.message = 'Pessoa Física cadastrada com sucesso!';
		})
		.error(function(error) {
			$scope.message = 'Não foi possível cadastrar Pessoa Física';
		});
	};

	function show() {
		$http.get(url + '/' + $routeParams.individualEntityId + responseExtension)
		.success(function(response) {
			$scope.individualEntity = response;
			$scope.message = 'Pessoa Física obtida com sucesso';
		})
		.error(function(error) {
			$scope.message = 'Não foi possível obter a Pessoa Física';
		});
	};

	if($routeParams.individualEntityId) {
		show();
	}

	function notReloadPageForm() {
		$timeout(function() {
	      $scope.formulary.$submitted = false;
	    });
	};

	$scope.submit = function() {
		if ($scope.formulary.$valid) {
			if ($scope.individualEntity.id) {
				update();
			} else {
				create();
			}
		}
		notReloadPageForm();
	};
});
