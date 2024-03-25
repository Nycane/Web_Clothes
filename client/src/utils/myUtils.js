import moment from 'moment';
//scroll in to view
export function scrollViewToPoint(scrollIntoViewRef) {
    if (scrollIntoViewRef && scrollIntoViewRef.current) {
        scrollIntoViewRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center',
        });
    }
}
//delay time
export function delay(delay) {
    return new Promise((res,rej) => setTimeout(res, delay));
}
// formatter date
export function formatDate(date) {
    return moment(date).format('MMMM D, YYYY');
}

// formatter price
export const formatPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
// get latest token
export const getLatestToken = () => {
    const { user } = JSON.parse(localStorage.getItem('persist:root'));
    const token = JSON.parse(user);
    return token.info;
};

export const saveDataInSession = (key, data) => {
    return sessionStorage.setItem(key, JSON.stringify(data));
};

export const getDataInSession = (key) => {
    return sessionStorage.getItem(key);
};
export const objectIsEmpty = (object) => {
    if (Object.keys(object).length === 0) return true;
    return false;
};
export const arrayIsEmpty = (array) => {
    if (array.length === 0) return true;
    return false;
};
