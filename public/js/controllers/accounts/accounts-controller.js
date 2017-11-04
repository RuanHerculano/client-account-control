angular.module('client-account-control')
    .controller('AccountsController', function ($scope, $http) {
        $scope.accounts = [];
        $scope.message = '';
        var url = 'http://localhost:3000/accounts';
        var responseExtension = '.json';

        $http.get(url + responseExtension)
            .then(function (response) {
                $scope.accounts = response.data;
                $scope.message = 'Lista carregada com sucesso.'
            }).catch(function (error) {
                $scope.message = 'Erro ao carregar lista';
            });

        function destroy(account) {
            $http({
                method: 'DELETE',
                url: url + '/' + account.id + responseExtension,
            })
                .success(function (response) {
                    var accountIndex = $scope.accounts.indexOf(account);
                    $scope.accounts.splice(accountIndex, 1);
                    $scope.message = 'Registro removido com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível remover este Registro';
                });
        };

        $scope.destroy = function (account) {
            destroy(account);
        };
    });
