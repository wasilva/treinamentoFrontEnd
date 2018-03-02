(function ()
{
    angular.module('wasinfoErp').controller('AuthCtrl', [
        '$state',
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($state, $location, msgs, auth)
    {
        const vm = this

        vm.loginMode = true
        vm.user = { email: 'contato.wasilva@hotmail.com', password: 'WASinf@1985', name: 'William Alves da Silva', confirm_password: 'WASinf@1985' };

        vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.login = () =>
        {
            auth.login(vm.user)
                .then((resp) =>
                {
                    $state.go('dashboard');
                })
                .catch((err) => msgs.addError(err))
                ;
        }

        vm.signup = () =>
        {
            auth.signup(vm.user)
                .then((resp) =>
                {
                    $state.go('dashboard');
                })
                .catch((err) => msgs.addError(err))
                ;
        }

        vm.getUser = () => auth.getUser()

        vm.logout = () =>
        {
            auth.logout(() => $location.path('/'))
        }
    }

})()