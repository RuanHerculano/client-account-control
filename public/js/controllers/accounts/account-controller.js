angular.module('client-account-control')
    .controller('AccountController', function ($scope, $http, $routeParams, $timeout) {
        $scope.account = {};
        $scope.corporateEntities = [];
        $scope.individualEntities = [];
        $scope.accounts = [];
        $scope.message = '';
        var url = 'http://localhost:3000/accounts';
        var responseExtension = '.json';

        if ($routeParams.accountId) {
            show();
        }

        $scope.teste = function (id) {
            var select = document.getElementById(id);
            var length = select.options.length;
            select.options[0].selected = 'selected';
        };

        $scope.loadAccounts = function () {
            $http.get(url + responseExtension)
            .then(function (response) {
                $scope.accounts = filterAccounts(response.data);
                $scope.message = 'Lista carregada com sucesso'
            }).catch(function (error) {
                $scope.message = 'Erro ao carregar lista';
            });
        };

        $scope.loadCorporateEntities = function () {
            $http.get('http://localhost:3000/corporate_entities' + responseExtension)
                .then(function (response) {
                    $scope.corporateEntities = response.data;
                    $scope.message = 'Lista carregada com sucesso'
                }).catch(function (error) {
                    $scope.message = 'Erro ao carregar lista';
                });
        };

        $scope.loadIndividualEntities = function () {
            $http.get('http://localhost:3000/individual_entities' + responseExtension)
                .then(function (response) {
                    $scope.individualEntities = response.data;
                    $scope.message = 'Lista carregada com sucesso.'
                }).catch(function (error) {
                    $scope.message = 'Erro ao carregar lista';
                });
        };

        $scope.submit = function () {
            if ($scope.formulary.$valid) {
                if ($scope.account.id) {
                    update();
                } else {
                    create();
                }
            }
            notReloadPageForm();
        };

        function filterAccounts(data) {
            data.forEach(function(element, index) {
                if (angular.equals(element, $scope.account)) {
                    data.splice(index, 1);
                }
            });

            return data;
        };

        function update() {
            cleanData();
            $http({
                method: 'PUT',
                url: url + '/' + $scope.account.id + responseExtension,
                data: $scope.account,
            })
                .success(function (response) {
                    $scope.account = {};
                    $scope.message = 'Atualizado com sucesso';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível atualizar';
                });
        };

        function cleanData() {
            if ($scope.account.corporate_entity_id == "")  {
                $scope.account.corporate_entity_id = null;
            }
            if ($scope.account.individual_entity_id == "")  {
                $scope.account.individual_entity_id = null;
            }
            if ($scope.account.account_id == "")  {
                $scope.account.account_id = null;
            }
        };

        function create() {
            $http({
                method: 'POST',
                url: url + responseExtension,
                data: $scope.account,
            })
                .success(function (response) {
                    $scope.account = {};
                    $scope.message = 'Cadastrado com sucesso';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar';
                });
        };

        function show() {
            $http.get(url + '/' + $routeParams.accountId + responseExtension)
                .success(function (response) {
                    $scope.account = response;
                    $scope.message = 'Registro obtido com sucesso';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível obter registro';
                });
        };

        function notReloadPageForm() {
            $timeout(function () {
                $scope.formulary.$submitted = false;
            });
        };
    });
