(function(){
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    BillingCycleController
  ])
  
    function BillingCycleController($http, msgs) {
      const vm = this
  
      vm.create = function() {
        const url = 'http://localhost:3000/api/billingCycles'
        $http.post(url, vm.billingCycle).then(function(response) {
          vm.billingCycle = {}
          msgs.addSuccess('Operação realizada com sucesso!!')
        }).then(function(data) {
          msgs.addError(data.errors)
        })
      }
    }
})()