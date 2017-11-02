angular.module('client-account-control')
    .controller('FinancialContributionController', function ($scope, $http, $routeParams, $timeout) {
        $scope.financialContribution = {};
        $scope.origins = [];
        $scope.message = '';
        var url = 'http://localhost:3000/financial_contributions';
        var responseExtension = '.json';

        if ($routeParams.financialContributionId) {
            show();
        }

        $scope.loadAccounts = function () {
            $http.get("http://localhost:3000/accounts" + responseExtension)
                .then(function (response) {
                    $scope.origins = response.data;
                    $scope.message = 'Lista de Contas carregada com sucesso.'
                }).catch(function (error) {
                    $scope.message = 'Erro ao carregar lista de Contas.';
                });
        };

        function update() {
            $http({
                method: 'PUT',
                url: url + '/' + $scope.financialContribution.id + responseExtension,
                data: $scope.financialContribution,
            })
                .success(function (response) {
                    $scope.financialContribution = {};
                    $scope.message = 'Pessoa Jurídica Atualizada com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar Pessoa Jurídica';
                });
        };

        function create() {
            console.log('Olha ai o que estou mandando');
            console.log($scope.financialContribution);
            $http({
                method: 'POST',
                url: url + responseExtension,
                data: $scope.financialContribution,
            })
                .success(function (response) {
                    $scope.financialContribution = {};
                    $scope.message = 'Pessoa Jurídica cadastrada com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar Pessoa Jurídica';
                });
        };

        function show() {
            $http.get(url + '/' + $routeParams.financialContributionId + responseExtension)
                .success(function (response) {
                    $scope.financialContribution = response;
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
                if ($scope.financialContribution.id) {
                    update();
                } else {
                    create();
                }
            }
            notReloadPageForm();
        };
    });