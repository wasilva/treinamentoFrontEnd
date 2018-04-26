(function () {
    angular.module('wasinfoErp').controller('ClienteCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        '$scope',
        '$filter',
        
        ClienteController
    ])

    function ClienteController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/clientes'

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function (response) {

                vm.cliente = { tipocliente: [{}] }
                vm.clientes = response.data
                console.log(vm.cliente)
                $http.get(`${url}/count`).then(function (response) {
                    vm.pages = Math.ceil(response.data.value / 10)
                    tabs.show(vm, { tabList: true, tabCreate: true, tabAddress: true, tabDadosPessoais: true, tabDadosComplementares: true, tabDadosAdministrativos: true })
                })
            })
        }

        // Grava os registros no banco
        vm.create = function () {
            $http.post(url, vm.cliente).then(function (response) {
                cliente
            
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (response) {
                msgs.addError(response.data.errors)
            })
        }

        //Altera os registros
        vm.update = function () {
            const updateUrl = `${url}/${vm.cliente._id}`
            $http.put(updateUrl, vm.cliente).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (data) {
                msgs.addError(data.errors)
            })
        }

        // Exibe a aba editar
        vm.showTabUpdate = function (cliente) {
            // console.log(  funcionario)
            vm.cliente = cliente
            tabs.show(vm, { tabUpdate: true, tabAddress: true, tabDadosPessoais: true, tabDadosComplementares: true, tabDadosAdministrativos: true })
        }

        // Exibe a aba excluir
        vm.showTabDelete = function (cliente) {
            vm.cliente = cliente
            tabs.show(vm, { tabDelete: true, tabAddress: true, tabDadosPessoais: true, tabDadosComplementares: true, tabDadosAdministrativos: true })
        }

        //Deleta os registros
        vm.delete = function () {
            const deleteUrl = `${url}/${vm.cliente._id}`
            $http.delete(deleteUrl, vm.cliente).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (data) {
                msgs.addError(data.errors)
            })
        }

        vm.refresh()
    }
})()