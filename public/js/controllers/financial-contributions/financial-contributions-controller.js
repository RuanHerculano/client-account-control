angular.module('client-account-control')
    .controller('FinancialContributionsController', function ($scope, $http) {
        $scope.financialContributions = [];
        $scope.financialContribution = {};
        $scope.message = '';
        var url = 'http://localhost:3000/financial_contributions';
        var responseExtension = '.json';

        $http.get(url + responseExtension)
            .then(function (response) {
                $scope.financialContributions = response.data;
                $scope.message = 'Lista carregada com sucesso'
            }).catch(function (error) {
                $scope.message = 'Erro ao carregar lista';
            });

        function reversal(financialContribution) {
            var code = prompt('Digite o código de aporte : ', 'Código');
            if (code === 'Código' || code === null) {
                return;
            }

            $http({
                method: 'PUT',
                url: url + '/' + financialContribution.id + responseExtension,
                data: { code }
            })
                .success(function (response) {
                    var financialContributionIndex = $scope.financialContributions.indexOf(financialContribution);
                    $scope.financialContributions[financialContributionIndex].status = 'reversaled';
                    $scope.message = 'Transação ' + financialContribution.code + ' foi estornada com sucesso!';
                })
                .error(function (error) {
                    if (error.code[0] === 'invalid code') {
                        $scope.message = 'Código inválido';
                    } else {
                        $scope.message = 'Não foi possível estornar este aporte';                    
                    }
                });
        };

        $scope.reversal = function (financialContribution) {
            reversal(financialContribution);
        };
    });
