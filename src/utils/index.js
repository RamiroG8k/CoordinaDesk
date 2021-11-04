import { toast } from 'react-toastify';

export const toClipboard = (customText, value) => {
    navigator.clipboard.writeText(value);

    toast.success(customText, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
    });
};

export const isLoggedIn = () => {
    return (localStorage.getItem('token') ?? false);
};

export const toggleClasses = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const saveCredentials = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};

export const removeCredentials = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

export const shortDate = (date) => {
    date = new Date(date) ?? new Date();
    const dmy = [];

    dmy.push(date.getUTCDate());
    dmy.push((date.getUTCMonth() + 1) < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth());
    dmy.push(date.getUTCFullYear());

    return dmy;
};

export const toDate = (date) => {
    const formated = new Date(date);
    date = formated.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

    return date;
};

export const firstCapitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const prefersDarkMode = () => {
    return localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
};

export const checkOverflow = (el) => {
    const isOverflowing = {
        width: el.clientWidth < el.scrollWidth,
        height: el.clientHeight < el.scrollHeight
    };

    return isOverflowing;
}