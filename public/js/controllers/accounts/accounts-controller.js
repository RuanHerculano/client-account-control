angular.module('client-account-control').controller('AccountsController', function($scope, $http) {
  $scope.accounts = [];
  $scope.message = '';
  var url = 'http://localhost:3000/accounts';
  var responseExtension = '.json';

  var promise = $http.get(url + responseExtension);
  promise.then(function(response) {
    $scope.accounts = response.data;
    $scope.message = 'Lista de Contas carregada com sucesso.'
  }).catch(function(error) {
    $scope.message = 'Erro ao carregar lista de Contas.';
  });

  function destroy(account) {
    $http({
      method: 'DELETE',
      url: url + '/' + account.id + responseExtension,
    })
    .success(function(response) {
      var accountIndex = $scope.accounts.indexOf(account);
      $scope.accounts.splice(accountIndex, 1);
      $scope.message = 'Conta' + account.name +' foi removida com sucesso!';
    })
    .error(function(error) {
      $scope.message = 'Não foi possível remover Pessoa Jurídica portadora do CNPJ ' + account.cnpj;
    });
  };

  $scope.destroy = function(account) {
    destroy(account);
  };
});
