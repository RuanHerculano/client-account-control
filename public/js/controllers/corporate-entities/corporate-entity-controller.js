angular.module('client-account-control').controller('CorporateEntityController', function($scope, $http, $routeParams, $timeout) {
  $scope.corporateEntity = {};
  $scope.message = '';
  var url = 'http://localhost:3000/corporate_entities';
  var responseExtension = '.json';

  function update() {
    $http({
        method: 'PUT',
        url: url + '/' + $scope.corporateEntity.id + responseExtension,
        data: $scope.corporateEntity,
    })
    .success(function(response) {
      $scope.corporateEntity = {};
      $scope.message = 'Pessoa Jurídica Atualizada com sucesso!';
    })
    .error(function(error) {
      $scope.message = 'Não foi possível cadastrar o Pessoa Jurídica';
    });
  };

  function create() {
    console.log('valor que está sendo mandado');
    console.log($scope.corporateEntity);
    $http({
        method: 'POST',
        url: url + responseExtension,
        data: $scope.corporateEntity,
    })
    .success(function(response) {
      $scope.corporateEntity = {};
      $scope.message = 'Pessoa Jurídica cadastrada com sucesso!';
    })
    .error(function(error) {
      $scope.message = 'Não foi possível cadastrar Pessoa Jurídica';
    });
  };

  function notReloadPageForm() {
    $timeout(function() {
        $scope.formulary.$submitted = false;
      });
  };

  $scope.submit = function() {
    if ($scope.formulary.$valid) {
      if ($scope.corporateEntity.id) {
        update();
      } else {
        create();
      }
    }
    notReloadPageForm();
  };
});
