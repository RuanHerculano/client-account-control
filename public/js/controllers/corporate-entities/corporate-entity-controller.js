angular.module('client-account-control')
    .controller('CorporateEntityController', function ($scope, $http, $routeParams, $timeout) {
        $scope.corporateEntity = {};
        $scope.message = '';
        var url = 'http://localhost:3000/corporate_entities';
        var responseExtension = '.json';

        if ($routeParams.corporateEntityId) {
			show();
		}

        function update() {
            $http({
                method: 'PUT',
                url: url + '/' + $scope.corporateEntity.id + responseExtension,
                data: $scope.corporateEntity,
            })
                .success(function (response) {
                    $scope.corporateEntity = {};
                    $scope.message = 'Pessoa Jurídica Atualizada com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar Pessoa Jurídica';
                });
        };

        function create() {
            $http({
                method: 'POST',
                url: url + responseExtension,
                data: $scope.corporateEntity,
            })
                .success(function (response) {
                    $scope.corporateEntity = {};
                    $scope.message = 'Pessoa Jurídica cadastrada com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar Pessoa Jurídica';
                });
        };

        function show() {
			$http.get(url + '/' + $routeParams.corporateEntityId + responseExtension)
				.success(function (response) {
					$scope.corporateEntityId = response;
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
                if ($scope.corporateEntity.id) {
                    update();
                } else {
                    create();
                }
            }
            notReloadPageForm();
        };
    });
