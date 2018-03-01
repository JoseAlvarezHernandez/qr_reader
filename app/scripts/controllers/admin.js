angular
    .module('QRreader')
    .controller('AdminController', AdminController);

AdminController.$inject = ['$window', 'Resource', '$scope'];

function AdminController($window, Resource, $scope) {
    const uc = this;
    uc.isLogged = localStorage.getItem('isLogged') == null ? false : localStorage.getItem('isLogged');
    if (uc.isLogged == true || uc.isLogged == 'true') {
        //variables
        uc.qrText = 'google.com';
        uc.name = localStorage.getItem('name') == null ? '' : localStorage.getItem('name');
        setCalendars();
        //functions
        uc.generate = generate;
        uc.users = users;
        //
        function users() {
            $window.location.href = '#!/users';
        }
        function generate() {
            let initDate = $('#initDateValue').val();
            let endDate = $('#endDateValue').val();
            if (initDate === '' && endDate === '') {
                bootbox.alert('Debes seleccionar el rango de fechas.');
            } else {
                loader();
                let today = new Date().getTime();
                Resource.shortUrl(today, initDate, endDate, uc.description, uc.qr.name, localStorage.getItem('bearer')).then(function (data) {
                    if (data.status === 200) {
                        uc.qrText = data.data.url;
                        uc.generated = true;
                    }
                    closeLoader();
                });
            }
        }
    } else {
        $window.location.href = '#!/login';
    }
}