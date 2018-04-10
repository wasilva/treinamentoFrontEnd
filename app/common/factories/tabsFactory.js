angular.module('wasinfoErp').factory('tabs', [ function() {

   function show(owner, {
      tabList = false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false,
      tabAddress = false,
      tabDadosPessoais = false,
      tabDadosComplementares = false,
      tabDadosAdministrativos = false
   }) {
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
      owner.tabAddress = tabAddress
      owner.tabDadosPessoais = tabDadosPessoais
      owner.tabDadosComplementares = tabDadosComplementares
      owner.tabDadosAdministrativos = tabDadosAdministrativos
   }

   return { show }
}])
