import { defaultDirection } from '../constants/defaultValues';

export const mapOrder = (array, order, key) => {
    array.sort((a, b) => {
        const A = a[key]; const
            B = b[key];
        if (order.indexOf(`${A }`) > order.indexOf(`${B }`)) {
            return 1;
        }
        return -1;
    });
    return array;
};

export const getDateWithFormat = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${ dd}`;
    }
    if (mm < 10) {
        mm = `0${ mm}`;
    }
    return `${dd }.${ mm }.${ yyyy}`;
};

export const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours() }:${ now.getMinutes()}`;
};

export const getDirection = () => {
    let direction = defaultDirection;
    if (localStorage.getItem('direction')) {
        const localValue = localStorage.getItem('direction');
        if (localValue === 'rtl' || localValue === 'ltr') {
            direction = localValue;
        }
    }
    return {
        direction,
        isRtl: direction === 'rtl',
    };
};

export const setDirection = localValue => {
    let direction = 'ltr';
    if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
    }
    localStorage.setItem('direction', direction);
};

export const getHost = postfix => {
    let host = `https://${window.location.host}/${postfix}`;
    if (host.indexOf('3000') !== -1) {
        host = host.replace('3000', '3001').replace('https', 'http');
    }
    return host;
};

export const sumQuantities = orders => orders.reduce((total, order) => total + order.quantity, 0);
