
export const utilService={
    makeId,
    getDate,
    getDateForInput
}

 function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function getDate() {
    const date = new Date()
    const minutes =
        date.getMinutes() > 9
            ? date.getMinutes()
            : `0${date.getMinutes()}`;
    const seconds =
        date.getSeconds() > 9
            ? date.getSeconds()
            : `0${date.getSeconds()}`;
    const currDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    const time = `${date.getHours()}:${minutes}`;
    const res = `${currDate} |  ${time}  `
    return res
}

function getDateForInput() {
    const date = new Date()
    const minutes =
        date.getMinutes() > 9
            ? date.getMinutes()
            : `0${date.getMinutes()}`;
    const seconds =
        date.getSeconds() > 9
            ? date.getSeconds()
            : `0${date.getSeconds()}`;
    // const currDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    const currDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T`
    const time = `${date.getHours()}:${minutes}`;
    const res = `${currDate}${time}  `
    return res
}