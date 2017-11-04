angular.module('client-account-control')
    .controller('CorporateEntitiesController', function ($scope, $http) {
        $scope.corporateEntities = [];
        $scope.message = '';
        var url = 'http://localhost:3000/corporate_entities';
        var responseExtension = '.json';

        $http.get(url + responseExtension)
            .then(function (response) {
                $scope.corporateEntities = response.data;
                $scope.message = 'Lista carregada com sucesso'
            }).catch(function (error) {
                $scope.message = 'Erro ao carregar lista';
            });
    });
