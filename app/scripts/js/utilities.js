$('#initDate').ready(function () {
    setTimeout(function () {
        const options = { locale: 'es', format: 'YYYY-MM-DD HH:mm' };
        $('#initDate').datetimepicker(options);
        $('#endDate').datetimepicker(options);
    }, 2000);
});
function encrypt(text) {
    return (btoa(text));
}

function decrypt(text) {
    return (atob(text));
}