export const isLoggedIn = () => {
    return (sessionStorage.getItem('token') ?? false);
};

export const toggleClasses = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const saveCredentials = ({ token, user }) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
};

export const removeCredentials = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
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

export const firstCapitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const prefersDarkMode = () => {
    return localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
};