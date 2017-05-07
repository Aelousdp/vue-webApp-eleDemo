function getTime (timeMs) {
    let date = new Date(timeMs);
    return {
        dateStr: `${date.getFullYear()}-${isSingleNum(date.getMonth())}-${isSingleNum(date.getDate())}`,
        timeStr: `${date.getHours()}:${date.getMinutes()}`
    };
}

function isSingleNum (num) {
    return ('' + num).split('').length === 1 ? '0' + num : num;
}

export {getTime};
