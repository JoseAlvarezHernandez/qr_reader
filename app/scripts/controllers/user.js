angular
  .module('QRreader')
  .controller('UserController', UserController);

UserController.$inject = ['$window', 'Resource'];

function UserController($window, Resource) {
  const uc = this;
  uc.isLogged = localStorage.getItem('isLogged') == null ? true : localStorage.getItem('isLogged');//false
  if (uc.isLogged == true || uc.isLogged == 'true') {

    uc.generate = generate;
    uc.qrText = '';
    uc.name = localStorage.getItem('name') == null ? 'Usuario nuevo' : localStorage.getItem('name');
    function generate() {
      uc.generated = true;
      let initDate = $('#initDateValue').val();
      let endDate = $('#endDateValue').val();
      let today = new Date().getTime();
      Resource.shortUrl(today, initDate, endDate).then(function (data) {
        uc.qrText = data.id;
      });

    }
  }
}