angular.module('wasinfoErp').constant('consts', {
  appName: 'WASINFO System - ERP',
  version: '1.0',
  owner: 'WASINFO',
  year: '2017',
  site: 'http://wasinfo.com.br',
  apiUrl: 'http://localhost:3003/api',
  userKey: '_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
  $rootScope.consts = consts
}])
