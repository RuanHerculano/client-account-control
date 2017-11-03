angular.module('client-account-control')
	.controller('IndividualEntityController', function ($scope, $http, $routeParams, $timeout) {
		$scope.individualEntity = {};
		$scope.message = '';
		var url = 'http://localhost:3000/individual_entities';
		var responseExtension = '.json';

		if ($routeParams.individualEntityId) {
			show();
		}

		$scope.validateCPF = function () {
			var cpf = $scope.individualEntity.cpf.toString();
			console.log(cpf);			
			cpf = cpf.replace(/[^\d]+/g, '');
			if (cpf == '') return false;
			
			if (cpf.length != 11 ||
				cpf == "00000000000" ||
				cpf == "11111111111" ||
				cpf == "22222222222" ||
				cpf == "33333333333" ||
				cpf == "44444444444" ||
				cpf == "55555555555" ||
				cpf == "66666666666" ||
				cpf == "77777777777" ||
				cpf == "88888888888" ||
				cpf == "99999999999")
				return false;
			
			var add = 0;
			console.log('chega aqui');
			for (i = 0; i < 9; i++)
				add += parseInt(cpf.charAt(i)) * (10 - i);
			rev = 11 - (add % 11);
			if (rev == 10 || rev == 11)
				rev = 0;
			if (rev != parseInt(cpf.charAt(9)))
				return false;
			
				add = 0;
			for (i = 0; i < 10; i++)
				add += parseInt(cpf.charAt(i)) * (11 - i);
			rev = 11 - (add % 11);
			if (rev == 10 || rev == 11)
				rev = 0;
			if (rev != parseInt(cpf.charAt(10)))
				return false;
			return true;
		};

		function update() {
			$http({
				method: 'PUT',
				url: url + '/' + $scope.individualEntity.id + responseExtension,
				data: $scope.individualEntity,
			})
				.success(function (response) {
					$scope.individualEntity = {};
					$scope.message = 'Pessoa Física Atualizada com sucesso!';
				})
				.error(function (error) {
					$scope.message = 'Não foi possível cadastrar o Pessoa Física';
				});
		};

		function create() {
			$http({
				method: 'POST',
				url: url + responseExtension,
				data: $scope.individualEntity,
			})
				.success(function (response) {
					$scope.individualEntity = {};
					$scope.message = 'Pessoa Física cadastrada com sucesso!';
				})
				.error(function (error) {
					$scope.message = 'Não foi possível cadastrar Pessoa Física';
				});
		};

		function show() {
			$http.get(url + '/' + $routeParams.individualEntityId + responseExtension)
				.success(function (response) {
					$scope.individualEntity = response;
					$scope.message = 'Pessoa Física obtida com sucesso';
				})
				.error(function (error) {
					$scope.message = 'Não foi possível obter a Pessoa Física';
				});
		};

		function notReloadPageForm() {
			$timeout(function () {
				$scope.formulary.$submitted = false;
			});
		};

		$scope.submit = function () {
			if ($scope.formulary.$valid) {
				if ($scope.individualEntity.id) {
					update();
				} else {
					create();
				}
			}

		};
	});
