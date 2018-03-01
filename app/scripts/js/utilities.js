
let loaderModal = null;
function loader() {
    if (loaderModal == null) {
        loaderModal = bootbox.dialog({
            message: '<div class=scol-md-12 text-center"><img id="animation" src="images/loader.gif"></img></div>',
            closeButton: false,
        });
        $(loaderModal).addClass('modal-loader');
    }
}
function closeLoader() {
    if (loaderModal !== null) {
        loaderModal.modal('hide');
        loaderModal = null;
    }
}

function setCalendars() {
    const options = { locale: 'es', format: 'YYYY-MM-DD HH:mm' };
    $('#initDate').datetimepicker(options);
    $('#endDate').datetimepicker(options);
}
let form = null;
function addUserForm(callback, user) {
    if (form === null) {
        form = bootbox.dialog({
            title: 'Usuario',
            message: `<form id="formUser">
                            <div class="form-group">
                                <label class="text-label">Nombre</label>
                                <input id="name" type="text" class="modal-input" name="name" />
                            </div>
                            <div class="form-group">
                                <label class="text-label">Correo electronico</label>
                                <input id="email" type="email" class="modal-input" name="email" />
                            </div>
                            <div class="form-group">
                                <label class="text-label">Contraseña</label>
                                <input id="password" type="password" class="modal-input" name="password" />
                            </div>
                            <div class="form-group">
                                <label class="text-label">Telefono</label>
                                <input id="phone" type="number" class="modal-input" name="phone" />
                                <input id="homePage" type="hidden" name="homePage" value="#!" />
                            </div>
                        </form>`,
            buttons: {
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger',
                    callback: function () {

                        return true;
                    }
                },
                success: {
                    label: 'guardar',
                    className: 'btn-success',
                    callback: function () {
                        let form = $('#formUser').serialize().FormtoObject();
                        callback(form);
                        return false;
                    }
                },
            }
        });
    }
}

function closeForm() {
    if (form !== null) {
        form.modal('hide');
    }
}

String.prototype.FormtoObject = function () {
    let obj = {};
    let keys = this.split('&');
    keys.forEach((value) => {
        let elem = value.split('=');
        obj[elem[0]] = decodeURIComponent(elem[1]).replace(/\+/img, ' ');
    });
    return obj;
}