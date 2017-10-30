angular.module('client-account-control')
    .controller('CorporateEntitiesController', function ($scope, $http) {
        $scope.corporateEntities = [];
        $scope.message = '';
        var url = 'http://localhost:3000/corporate_entities';
        var responseExtension = '.json';

        var promise = $http.get(url + responseExtension);
        promise.then(function (response) {
            $scope.corporateEntities = response.data;
            $scope.message = 'Lista de Pessoa Jurídica foi carregada com sucesso.'
        }).catch(function (error) {
            $scope.message = 'Erro ao carregar lista de Pessoa Jurídica.';
        });

        function destroy(corporateEntity) {
            $http({
                method: 'DELETE',
                url: url + '/' + corporateEntity.id + responseExtension,
            })
                .success(function (response) {
                    var corporateEntityIndex = $scope.corporateEntities.indexOf(corporateEntity);
                    $scope.corporateEntities.splice(corporateEntityIndex, 1);
                    $scope.message = 'Pessoa Jurídica portadora do CNPJ ' + corporateEntity.cnpj + ' foi removida com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível remover Pessoa Jurídica portadora do CNPJ ' + corporateEntity.cnpj;
                });
        };

        $scope.destroy = function (corporateEntity) {
            destroy(corporateEntity);
        };
    });
