angular
    .module('QRreader')
    .factory('Resource', Resource);

/** functions dependency injector */
Resource.$inject = ['$http', 'env'];

/**
 * @function Resource
 */
function Resource($http, env) {
    return {
        login: login,
        shortUrl: shortUrl
    };
    /**
    * 
    * @param {username, password, app}  
    */
    function login(data) {
        let http = {
            method: 'POST',
            url: `${env.api}authentication/login`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: data,
        };
        return ($http(http));
    }
    function shortUrl(date, init, end) {
        return new Promise(function (resolve) {
            let http = {
                method: 'POST',
                url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyC8Y9m0FzN6fWTzsguUiJ1VQj5ILFLmTRo',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                data: {
                    'longUrl': `https://inncol-node-server.herokuapp.com/qr/${date}`
                },
            };
            $http(http).then(function (data) {
                let httpApi = {
                    method: 'POST',
                    url: 'https://api-inncol.herokuapp.com/api/code',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    data: {
                        "qrCodeId": date,
                        "initDate": init,
                        "endDate": end,
                        "shortenURl": data.data.id,
                        "createdBy": 1
                    }
                };
                $http(httpApi).then(function (api) {
                    resolve(data.data.id);
                });
            });
        });

    }
}
