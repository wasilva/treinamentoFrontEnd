
(function() {
  angular.module('primeiraApp').controller('DashboardCtrl', [
    '$http',
    DashboardController
])

function DashboardController($http) {
  const vm = this
  vm.getSummary = function() {
    const url = 'http://localhost:3003/api/billingSummary';
    $http.get(url).then(function({credit = 0, debt = 0}) {
      vm.credit = credit
      vm.debt = debt
      vm.total = credit - debt
    })
  }

  vm.getSummary()
}
})()
