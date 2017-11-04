angular.module('client-account-control')
    .controller('CorporateEntityController', function ($scope, $http, $routeParams, $timeout) {
        $scope.corporateEntity = {};
        $scope.message = '';
        var url = 'http://localhost:3000/corporate_entities';
        var responseExtension = '.json';

        if ($routeParams.corporateEntityId) {
			show();
		}

        $scope.validateCNPJ = function () {
            var cnpj = $scope.corporateEntity.cnpj.toString();
            cnpj = cnpj.replace(/[^\d]+/g,'');

            if(cnpj == '') return false;

            if (cnpj.length != 14)
                return false;

            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999")
                return false;

            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0,tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                    return false;

            return true;
        };

        function update() {
            $http({
                method: 'PUT',
                url: url + '/' + $scope.corporateEntity.id + responseExtension,
                data: $scope.corporateEntity,
            })
                .success(function (response) {
                    $scope.corporateEntity = {};
                    $scope.message = 'Registro atualizado com sucesso!';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível atualizar registro';
                });
        };

        function create() {
            $http({
                method: 'POST',
                url: url + responseExtension,
                data: $scope.corporateEntity,
            })
                .success(function (response) {
                    $scope.corporateEntity = {};
                    $scope.message = 'Cadastrada com sucesso';
                })
                .error(function (error) {
                    $scope.message = 'Não foi possível cadastrar';
                });
        };

        function show() {
			$http.get(url + '/' + $routeParams.corporateEntityId + responseExtension)
				.success(function (response) {
					$scope.corporateEntity = response;
					$scope.message = 'Registro obtido com sucesso';
				})
				.error(function (error) {
					$scope.message = 'Não foi possível obter este registro';
				});
		};

        function notReloadPageForm() {
            $timeout(function () {
                $scope.formulary.$submitted = false;
            });
        };

        $scope.submit = function () {
            if ($scope.formulary.$valid) {
                if ($scope.corporateEntity.id) {
                    update();
                } else {
                    create();
                }
            }
        };
    });
