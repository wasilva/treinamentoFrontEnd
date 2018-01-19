angular.module('primeiraApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider)
  {
    $stateProvider
      .state('dashboard', {
        url: "/dashboard",
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        templateUrl: "dashboard/dashboard.html"
      })
      .state('billingCycle', {
        url: "/billingCycles",
        templateUrl: "billingCycle/tabs.html"
      })

    $urlRouterProvider.otherwise('/dashboard')
  }])