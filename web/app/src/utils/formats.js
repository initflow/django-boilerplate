import moment from 'moment';
import utils from '~/utils';

export const formatNumerWithSpaces = (number) => {
    // const initialCharacter = numbro.languageData().delimiters.thousands;
    // const resultCharacter = ' ';
    // const replacer = new RegExp(initialCharacter, 'g');
    // return formattedNumber.replace(replacer, resultCharacter);
};

export const formatDuration = (duration) => {
    const momentDuration = moment.duration(duration);
    const hours = momentDuration.hours();
    const minutes = momentDuration.minutes();
    let result = '';

    if (hours > 0) {
        result += `${hours} ${utils.common.getDeclension(hours, ['час', 'часа', 'часов'])}`;
    }
    if (minutes > 0) {
        result += ` ${minutes} ${utils.common.getDeclension(minutes, ['минута', 'минуты', 'минут'])}`;
    }
    return result;
};

export const formatDatesRange = (dateFrom, dateTo) => {
    moment.locale('ru');
    if (dateFrom === null || dateTo === null) {
        return '';
    }
    let dateFromFormatted = moment(dateFrom).utcOffset(3).format('DD MMMM YYYY');
    const dateToFormatted = moment(dateTo).utcOffset(3).format('DD MMMM YYYY');
    if (dateFromFormatted === dateToFormatted) {
        return dateFromFormatted;
    }
    if (moment(dateFrom).utcOffset(3).format('YYYY') === moment(dateTo).utcOffset(3).format('YYYY')) {
        dateFromFormatted = moment(dateFrom).utcOffset(3).format('DD MMMM');
    }
    return `${dateFromFormatted} ‑ ${dateToFormatted}`;
};

export const formatTimesRange = (timeFrom, timeTo) => {
    if (timeFrom === null || timeTo === null) {
        return '';
    }
    const timeFromFormatted = moment(timeFrom).utcOffset(3).format('HH:mm');
    const timeToFormatted = moment(timeTo).utcOffset(3).format('HH:mm');

    if (timeFromFormatted === timeToFormatted) {
        return timeFromFormatted;
    } else {
        return `${timeFromFormatted} ‑ ${timeToFormatted}`;
    }
};

export default {
    // formatNumerWithSpaces,
    formatDuration,
    formatDatesRange,
    formatTimesRange,
};
