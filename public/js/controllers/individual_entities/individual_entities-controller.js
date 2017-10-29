angular.module('client-account-control').controller('IndividualEntitiesController', function($scope, $http) {
	$scope.individualEntities = [];
	$scope.message = '';
	var url = 'http://localhost:3000/individual_entities';
	var responseExtension = '.json';
	console.log('chega aqui');
	var promise = $http.get(url + responseExtension);
	promise.then(function(response) {
		$scope.individualEntities = response.data;
		$scope.message = 'Lista de livros carregada com sucesso.'
	}).catch(function(error) {
		$scope.message = 'Erro ao carregar lista de livros.';
	});

	function destroy(individualEntity) {
		$http({
		  method: 'DELETE',
		  url: url + '/' + individualEntity.id + responseExtension,
		  data: { id: individualEntity.id },
		  headers: {
		    'Access-Control-Allow-Origin': '*',
		  }
		})
		.success(function(response) {
			var individualEntityIndex = $scope.individualEntities.indexOf(individualEntity);
			$scope.individualEntities.splice(individualEntityIndex, 1);
			$scope.message = 'Livro '+ individualEntity.cpf +' removido com sucesso!';
		})
		.error(function(error) {
			$scope.message = 'Não foi possível remover o livro ' + individualEntity.cpf;
		});
	};

	$scope.destroy = function(individualEntity) {
		destroy(individualEntity);
	};
});
