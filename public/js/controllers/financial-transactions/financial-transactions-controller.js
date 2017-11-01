angular.module('client-account-control')
    .controller('FinancialTransactionsController', function ($scope, $http) {
        $scope.financialTransactions = [];
		$scope.message = '';
		var url = 'http://localhost:3000/financial_transactions';
		var responseExtension = '.json';

		$http.get(url + responseExtension)
			.then(function (response) {
				$scope.financialTransactions = response.data;
				$scope.message = 'Lista de transferências carregada com sucesso.'
			}).catch(function (error) {
				$scope.message = 'Erro ao carregar lista de transferências.';
			});
    });