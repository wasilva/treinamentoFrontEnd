(function ()
{

    angular.module('wasinfoErp').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ])

    function AuthFactory($http, consts)
    {

        let user = null

        function getUser()
        {
            if (!user) {
                user = JSON.parse(localStorage.getItem(consts.userKey))
                $http.defaults.headers.common.Authorization = user ? user.token : null
            }
            return user
        }

        function signup(user)
        {
            return submit('signup', user)
        }

        function login(user)
        {
            return submit('login', user)
        }

        function submit(url, user)
        {
            return new Promise((resolve, reject) =>
            {
                $http
                    .post(`${consts.apiUrl}/${url}`, user, { headers: { 'Content-Type': 'application/json' } })
                    .then(resp =>
                    {
                        localStorage.setItem(consts.userKey, JSON.stringify(resp.data))
                        $http.defaults.headers.common.Authorization = resp.data.token
                        resolve(resp.data);
                    })
                    .catch((resp) => reject(resp.data.errors))
                    ;
            });
        }

        function logout(callback)
        {
            user = null
            localStorage.removeItem(consts.userKey)
            $http.defaults.headers.common.Authorization = ''
            if (callback) callback(null)
        }

        function validateToken(token, callback)
        {
            if (token) {
                $http.post(`${consts.apiUrl}/validateToken`, { token })
                    .then(resp =>
                    {
                        if (!resp.data.valid) {
                            logout()
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }
                        if (callback) callback(null, resp.data.valid)
                    }).catch(function (resp)
                    {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token inválido.')
            }
        }

        return { signup, login, logout, getUser, validateToken }
    }

})()