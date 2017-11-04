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
    });
