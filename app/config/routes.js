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
<<<<<<< HEAD
        url: "/billingCycles?page",
=======
        url: "/billingCycles",
>>>>>>> b6ba0aaab5bfbeffd13a66986ad9d1154f4895e2
        templateUrl: "billingCycle/tabs.html"
      })

    $urlRouterProvider.otherwise('/dashboard')
  }])