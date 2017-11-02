angular.module('client-account-control')
.controller('FinancialContributionsController', function ($scope, $http) {
    $scope.financialContributions = [];
    $scope.message = '';
    var url = 'http://localhost:3000/financial_contributions';
    var responseExtension = '.json';

    $http.get(url + responseExtension)
        .then(function (response) {
            $scope.financialContributions = response.data;
            $scope.message = 'Lista de aportes carregada com sucesso.'
        }).catch(function (error) {
            $scope.message = 'Erro ao carregar lista de transferências.';
        });
});