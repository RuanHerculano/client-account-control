angular.module('client-account-control')
.controller('FinancialTransactionController', function ($scope, $http, $routeParams, $timeout) {
    $scope.financialTransaction = {};
    $scope.origins = [];
    $scope.destinations = [];
    $scope.message = '';
    var url = 'http://localhost:3000/financial_transactions';
    var responseExtension = '.json';

    if ($routeParams.financialTransactionId) {
        show();
    }

    $scope.loadAccounts = function () {
        $http.get("http://localhost:3000/accounts" + responseExtension)
        .then(function (response) {
            $scope.origins = response.data;
            $scope.destinations = response.data;
            $scope.message = 'Lista carregada com sucesso'
        }).catch(function (error) {
            $scope.message = 'Erro ao carregar lista';
        });
    };

    function update() {
        $http({
            method: 'PUT',
            url: url + '/' + $scope.financialTransaction.id + responseExtension,
            data: $scope.financialTransaction,
        })
            .success(function (response) {
                $scope.financialTransaction = {};
                $scope.message = 'Atualizado com sucesso';
            })
            .error(function (error) {
                $scope.message = 'Não foi possível atualizar';
            });
    };

    function create() {
        $http({
            method: 'POST',
            url: url + responseExtension,
            data: $scope.financialTransaction,
        })
            .success(function (response) {
                $scope.financialTransaction = {};
                $scope.message = 'Cadastrado com sucesso';
            })
            .error(function (error) {
                $scope.message = 'Não foi possível cadastrar';
            });
    };

    function show() {
        $http.get(url + '/' + $routeParams.financialTransactionId + responseExtension)
            .success(function (response) {
                $scope.financialTransaction = response;
                $scope.message = 'Registro obtido com sucesso';
            })
            .error(function (error) {
                $scope.message = 'Não foi possível obter este registro';
            });
    };

    function notReloadPageForm() {
        $timeout(function () {
            $scope.formulary.$submitted = false;
        });
    };

    $scope.submit = function () {
        if ($scope.formulary.$valid) {
            if ($scope.financialTransaction.id) {
                update();
            } else {
                create();
            }
        }
        notReloadPageForm();
    };
});
