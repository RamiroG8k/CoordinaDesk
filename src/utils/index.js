export const isLoggedIn = () => {
    return true;
};

export const toggleClasses = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const saveCredentials = ({ token, user }) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
};