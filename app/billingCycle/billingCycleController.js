(function(){
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
      '$http',
      'msgs',
      'tabs',
      BillingCycleController
  ])

  function BillingCycleController($http, msgs, tabs){
      const vm = this
      const url = 'http://localhost:3003/api/billingCycles'

      vm.refresh = function(){
          $http.get(url).then(function(response){
              vm.billingCycle = {credits: [{}], debts: [{}]}
              vm.billingCycles = response.data
              tabs.show(vm, {tabList: true, tabCreate: true})
          })
      }

      vm.create = function(){
        $http.post(url, vm.billingCycle).then(function(response){
            vm.refresh()
            msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function(response){
            msgs.addError(response.data.errors)
        })
      }

    //Altera os registros
    vm.update = function() {
        const updateUrl = `${url}/${vm.billingCycle._id}`
        $http.put(updateUrl, vm.billingCycle).then(function(response) {
          vm.refresh()
          msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function(data) {
           msgs.addError(data.errors)
        })
      }

      vm.showTabUpdate = function(billingCycle) {
        vm.billingCycle = billingCycle
        tabs.show(vm, {tabUpdate: true})
      }
    
      vm.showTabDelete = function(billingCycle) {
        vm.billingCycle = billingCycle
        tabs.show(vm, {tabDelete: true})
      }

    //Deleta os registros
      vm.delete = function() {
        const deleteUrl = `${url}/${vm.billingCycle._id}`
        $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
          vm.refresh()
          msgs.addSuccess('Operação realizada com sucesso!')
        }).catch(function(data) {
           msgs.addError(data.errors)
        })
      }
    
      // Adicionar Crédito
      vm.addCredit = function(index) {
        vm.billingCycle.credits.splice(index + 1, 0, {name: null, value: null})
      }
    
      // Clonar Crédito
      vm.cloneCredit = function(index, {name, value}) {
        vm.billingCycle.credits.splice(index + 1, 0, {name, value})
        initCreditsAndDebts()
      }
    
      // Deletar Crédito
      vm.deleteCredit = function(index) {
        vm.billingCycle.credits.splice(index, 1)
        initCreditsAndDebts()
      }

      // Adicionar Débito
      vm.addDebt = function(index) {
        vm.billingCycle.debts.splice(index + 1, 0, {})
      }
    
       // Clonar Débito
       vm.cloneDebt = function(index, {name, value, status}) {
        vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
        initCreditsAndDebts()
      }
    
       // Deletar Débito
       vm.deleteDebt = function(index) {
        vm.billingCycle.debts.splice(index, 1)
        initCreditsAndDebts()
      }

      vm.refresh()
  }
})()


