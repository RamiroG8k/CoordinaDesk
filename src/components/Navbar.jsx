// Common
import { useHistory } from 'react-router-dom';
// Components
import { Dropdown, ModeSwitcher } from 'components/shared';
// Data | Services
import { apiInstance } from 'services';
// Others
import { firstCapitalized, removeCredentials } from 'utils';
import { BiSidebar, BiUserCircle } from 'react-icons/bi';

const Navbar = ({ className, toggleSidebar, mobileSidebar }) => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleAction = (action) => {
        switch (action) {
            case 'logout':
                logOut();
                break;

            default:
                logOut();
                break;
        }
    };

    const logOut = async () => {
        await apiInstance.post('/auth/logout')
            .then(() => {
                removeCredentials();
                history.push('/login');
            });
    };

    const ActionsUser = () => {
        return (
            <div className="user flex gap-2 items-center bg-blue-50 dark:bg-gray-800 rounded-full transform hover:scale-105 transition">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-blue-100 dark:bg-gray-900 flex justify-center items-center">
                    <p className="text-white dark:text-gray-500 text-2xl sm:text-4xl"><BiUserCircle /></p>
                </div>
                <p className="hidden sm:block text-sm sm:text-lg font-semibold text-gray-600 dark:text-gray-400 pr-3">{firstCapitalized(user?.name.split(' ')[0])}</p>
            </div>
        );
    };

    return (
        <section className={`${className} flex w-full items-center px-4 justify-between`}>
            <div className="left flex gap-2">
                <button onClick={toggleSidebar} className="hidden sm:block h-auto transition hover:bg-blue-100  rounded-full focus:outline-none">
                    <p className="p-2 text-3xl text-gray-500 dark:text-gray-400">
                        <BiSidebar />
                    </p>
                </button>
                <button onClick={mobileSidebar} className="block sm:hidden h-auto transition hover:bg-blue-100 rounded-full">
                    <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                        <BiSidebar />
                    </p>
                </button>
            </div>

            <div className="right flex items-center gap-5 mr-2">
                <ModeSwitcher />

                <Dropdown component={ActionsUser} onEvent={handleAction} />
            </div>
        </section>
    )
}

export default Navbar
