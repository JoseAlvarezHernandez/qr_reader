angular
    .module('QRreader')
    .controller('QRController', QRController);

QRController.$inject = ['Resource', '$route'];

function QRController(Resource, $route) {
    const qc = this;
    let qrId = $route.current.params.qrid;
    if (isNaN(qrId)) {
        qc.message = 'El código que intentas accesar no es valido.';
    } else {
        Resource.getQr(qrId).then(function (qr) {
            if (qr.data.length > 0) {
                let name = qr.data[0].name;
                let description = qr.data[0].description;
                let dates = {
                    from: qr.data[0].initDate,
                    to: qr.data[0].endDate
                };
                let isLive = isTimeOn(dates);
                console.log(isLive);
                if (isLive.status === 0) {
                    qc.message = 'Lo sentimos este QR ya no se encuentra activo';
                    qc.description = `Desde hace : ${isLive.diff}`;
                } else if (isLive.status === 1) {
                    qc.message = `Este código QR fue activado para ${name}`
                    qc.description = `Descripción : ${description}`;
                } else if (isLive.status === 2) {
                    qc.message = 'Este QR aún no se encuentra activo';
                    qc.description = `Faltan : ${isLive.diff}`;
                }

            } else {
                qc.message = 'El código que intentas accesar no es valido.';
            }
        });
    }

    function isTimeOn(obj) {
        if (!obj.to || !obj.from) {
            throw new Error('isTimeOn expects an Object { to , from} ');
        } else {
            let rightNow = new Date(),
                init = new Date(obj.from),
                end = new Date(obj.to),
                status, diff;
            init.setHours(init.getHours() + 6);
            end.setHours(end.getHours() + 6);

            rightNow = rightNow.getTime();
            init = init.getTime();
            end = end.getTime();
            if (rightNow >= init && rightNow < end) {
                diff = end - rightNow;
                status = 1;
            } else if (rightNow > init && rightNow > end) {
                diff = rightNow - end;
                status = 0;
            } else if (rightNow < init && rightNow < end) {
                diff = init - rightNow;
                status = 2;
            }
            diff = getTimeDifference(diff);
            return { status, diff };
        }
    }

    function getTimeDifference(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000),
            difference = '';
        if (seconds >= 60) {
            let minutes = Math.floor(seconds / 60);
            seconds = Math.round(seconds % 60);
            if (minutes >= 60) {
                let hours = Math.round(minutes / 60);
                minutes = minutes % 60;
                difference = `${(hours > 9 ? hours : `0${hours}`)}:${(minutes > 9 ? minutes : `0${minutes}`)}:${(seconds > 9 ? seconds : `0${seconds}`)}`
            } else {
                difference = `00:${(minutes > 9 ? minutes : `0${minutes}`)}:${(seconds > 9 ? seconds : `0${seconds}`)}`
            }
        } else {
            difference = (seconds > 9 ? `00:00:${seconds}` : `00:00:0${seconds}`)
        }
        return difference;
    }
}