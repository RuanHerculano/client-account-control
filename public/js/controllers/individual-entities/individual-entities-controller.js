angular.module('client-account-control')
	.controller('IndividualEntitiesController', function ($scope, $http) {
		$scope.individualEntities = [];
		$scope.message = '';
		var url = 'http://localhost:3000/individual_entities';
		var responseExtension = '.json';

		$http.get(url + responseExtension)
			.then(function (response) {
				$scope.individualEntities = response.data;
				$scope.message = 'Lista de Pessoa Física carregada com sucesso.'
			}).catch(function (error) {
				$scope.message = 'Erro ao carregar lista de Pessoa Física.';
			});

		function destroy(individualEntity) {
			$http({
				method: 'DELETE',
				url: url + '/' + individualEntity.id + responseExtension,
				data: { id: individualEntity.id },
			})
				.success(function (response) {
					var individualEntityIndex = $scope.individualEntities.indexOf(individualEntity);
					$scope.individualEntities.splice(individualEntityIndex, 1);
					$scope.message = 'Pessoa Física portadora do CPF ' + individualEntity.cpf + ' foi removida com sucesso!';
				})
				.error(function (error) {
					$scope.message = 'Não foi possível remover Pessoa Física portadora do CPF ' + individualEntity.cpf;
				});
		};

		$scope.destroy = function (individualEntity) {
			destroy(individualEntity);
		};
	});
