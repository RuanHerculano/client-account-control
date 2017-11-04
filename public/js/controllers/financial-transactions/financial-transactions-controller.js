angular.module('client-account-control')
    .controller('FinancialTransactionsController', function ($scope, $http) {
        $scope.financialTransactions = [];
		$scope.message = '';
		var url = 'http://localhost:3000/financial_transactions';
		var responseExtension = '.json';

		$http.get(url + responseExtension)
			.then(function (response) {
				$scope.financialTransactions = response.data;
				$scope.message = 'Lista carregada com sucesso'
			}).catch(function (error) {
				$scope.message = 'Erro ao carregar lista';
			});


		function reversal(financialTransaction) {
			$http({
				method: 'PUT',
				url: url + '/' + financialTransaction.id + responseExtension,
			})
				.success(function (response) {
					var financialTransactionIndex = $scope.financialTransactions.indexOf(financialTransaction);
					$scope.financialTransactions[financialTransactionIndex].status = 'reversaled';
					$scope.message = 'Transação ' + financialTransaction.code + ' foi estornada com sucesso!';
				})
				.error(function (error) {
					$scope.message = 'Não foi possível remover Pessoa Jurídica portadora do CNPJ ' + account.cnpj;
				});
		};

		$scope.reversal = function (financialTransaction) {
			reversal(financialTransaction);
		};
	});
