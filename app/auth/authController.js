(function ()
{
    angular.module('wasinfoErp').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($location, msgs, auth)
    {
        const vm = this

        vm.loginMode = true
        vm.user = { email: 'contato.wasilva@hotmail.com', password: 'WASinf@1985', name: 'William Alves da Silva', confirm_password: 'WASinf@1985' };

        vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.login = () =>
        {
            auth.login(vm.user)
                .then((resp) => $location.path('/'))
                .catch((err) => msgs.addError(err))
                ;
        }

        vm.signup = () =>
        {
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.getUser = () => auth.getUser()

        vm.logout = () =>
        {
            auth.logout(() => $location.path('/'))
        }
    }

})()