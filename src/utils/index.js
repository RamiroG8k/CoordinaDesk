export const isLoggedIn = ()=> {
    return true;
};

export const toggleClasses = (...classes) => {
	return classes.filter(Boolean).join(' ');
}
