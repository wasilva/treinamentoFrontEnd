(function () {
    angular.module('wasinfoErp').controller('FuncionarioCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        FuncionarioController
    ])

    function FuncionarioController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/funcionarios'

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function (response) {

                vm.funcionario = { tipocontratacao: [{}], tiposexo: [{}], dadoscomplementar: [{}], dadosadministrativo: [{}] }
                vm.funcionarios = response.data
                console.log(vm.funcionario)
                $http.get(`${url}/count`).then(function (response) {
                    vm.pages = Math.ceil(response.data.value / 10)
                    tabs.show(vm, { tabList: true, tabCreate: true, tabAddress: true, tabDadosPessoais: true, tabDadosComplementar: true, tabDadosAdministrativos: true })
                })
            })
        }

        //Exibe as tabs do cadastro do funcionario
        vm.showTabFunCad = function (funcionario) {
            vm.funcionario = funcionario
            tabs.show(vm, { tabAddress: true, tabDadosPessoais: true })
        }

        
        // Grava os registros no banco
        vm.create = function () {
            $http.post(url, vm.funcionario).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }

        //Altera os registros
        vm.update = function () {
            const updateUrl = `${url}/${vm.funcionario._id}`
            $http.put(updateUrl, vm.funcionario).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (data) {
                msgs.addError(data.errors)
            })
        }

        vm.showTabUpdate = function (funcionario) {
            vm.funcionario = funcionario
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function (funcionario) {
            vm.funcionario = funcionario
            tabs.show(vm, { tabDelete: true })
        }

        //Deleta os registros
        vm.delete = function () {
            const deleteUrl = `${url}/${vm.funcionario._id}`
            $http.delete(deleteUrl, vm.funcionario).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (data) {
                msgs.addError(data.errors)
            })
        }

        vm.refresh()
    }
})()