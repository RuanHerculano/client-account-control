angular.module('client-account-control')
    .controller('AccountController', function ($scope, $http, $routeParams, $timeout) {
        $scope.account = {};
        $scope.corporateEntities = [];
        $scope.individualEntities = [];
        $scope.message = '';
        var url = 'http://localhost:3000/accounts';
        var responseExtension = '.json';

        if ($routeParams.accountId) {
            show();
        }

        $scope.loadCorporateEntities = function () {
            $http.get(url + responseExtension)
                .then(function (response) {
                    $scope.corporateEntities = response.data;
                    $scope.message = 'Lista de Pessoa Jurídica foi carregada com sucesso.'
                }).catch(function (error) {
                    $scope.message = 'Erro ao carregar lista de Pessoa Jurídica.';
                });
        };

        $scope.loadIndividualEntities = function () {
            $http.get(url + responseExtension)
                .then(function (response) {
                    $scope.individualEntities = response.data;
                    $scope.message = 'Lista de Pessoa Física carregada com sucesso.'
                }).catch(function (error) {
                    $scope.message = 'Erro ao carregar lista de Pessoa Física.';
                });
        };

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
                    $scope.account = response;
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
