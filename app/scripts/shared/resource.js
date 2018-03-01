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
        shortUrl: shortUrl,
        getAllUsers: getAllUsers,
        addUser: addUser,
        getQr: getQr,
    };

    function getQr(qrId) {
        let http = {
            method: 'GET',
            url: `${env.api}code/${qrId}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        return ($http(http));
    }

    function addUser(data, token) {
        let http = {
            method: 'POST',
            url: `${env.api}users`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            data: data
        };
        return ($http(http));
    }

    function getAllUsers(token) {
        let http = {
            method: 'GET',
            url: `${env.api}users`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            }
        };
        return ($http(http));
    }
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
            data: data
        };
        return ($http(http));
    }
    /**
     * 
     * @param {*} date 
     * @param {*} init 
     * @param {*} end 
     * @param {*} userId 
     */
    function shortUrl(qrCodeId, initDate, endDate, description, name, token) {
        let http = {
            method: 'POST',
            url: `${env.api}code`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token,
            },
            data: {
                qrCodeId,
                initDate,
                endDate,
                description,
                name
            },
        };
        return ($http(http));
    }
}
