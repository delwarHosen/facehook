export const getDateDifferenceFromNow = (fromDate) => {
    let difference = new Date().getTime() - new Date(fromDate).getTime();

    difference = difference / 1000;
    let hourDifference = Math.floor(difference / 3600);
    difference -= hourDifference * 3600;

    let minDifference = Math.floor(difference / 60);
    difference -= minDifference * 60

    let message;

    if (hourDifference > 0) {
        message = `${hourDifference} hour`;
    }

    if (minDifference > 0) {
        message = message ? `${message} ${minDifference} minutes` : `${minDifference} minutes`
    }

    if (difference) {
        message = message ? `${message} ${Math.round(difference)} seconds` : `${Math.round(difference)} seconds`
    }

    return message
}