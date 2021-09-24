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
        behavior: "smooth"
    });
};