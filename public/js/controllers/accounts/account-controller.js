angular.module('client-account-control')
    .controller('AccountController', function ($scope, $http, $routeParams, $timeout) {
        $scope.account = {};
        $scope.message = '';
        var url = 'http://localhost:3000/accounts';
        var responseExtension = '.json';

        if ($routeParams.accountId) {
			show();
		}

        function update() {
            $http({
                method: 'PUT',
                url: url + '/' + $scope.account.id + responseExtension,
                data: $scope.account,
            })
                .success(function (response) {
                    $scope.account = {};
                    $scope.message = 'Conta Atualizada com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar Conta';
                });
        };

        function create() {
            $http({
                method: 'POST',
                url: url + responseExtension,
                data: $scope.account,
            })
                .success(function (response) {
                    $scope.account = {};
                    $scope.message = 'Conta cadastrada com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar Conta';
                });
        };

        function show() {
			$http.get(url + '/' + $routeParams.accountId + responseExtension)
				.success(function (response) {
					$scope.accountId = response;
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
                if ($scope.account.id) {
                    update();
                } else {
                    create();
                }
            }
            notReloadPageForm();
        };
    });
