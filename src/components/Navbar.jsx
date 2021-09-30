// Others
import { Dropdown, ModeSwitcher } from 'components/shared';
import { BiSidebar, BiUserCircle, BiSearchAlt } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { apiInstance } from 'services';
import { removeCredentials } from 'utils';

const Navbar = ({ className, toggleSidebar, mobileSidebar }) => {
    const history = useHistory();

    const handleAction = (action) => {
        switch (action) {
            case 'logout':
                removeCredentials();
                logOut();
                break;
        
            default:
                break;
        }
    };

    const logOut = async () => {
        history.push('/login');
        // await apiInstance.get('/auth/logout')
        //     .then(() => {

        //     })
        //     .catch(error => {

        //     })
    };
    
    const ActionsUser = () => {
        return (
            <div className="user flex gap-2 items-center bg-blue-50 dark:bg-gray-800 rounded-full transform hover:scale-105 transition">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-blue-100 dark:bg-gray-900 flex justify-center items-center">
                    <p className="text-white dark:text-gray-500 text-2xl sm:text-4xl"><BiUserCircle /></p>
                </div>
                <p className="hidden sm:block text-sm sm:text-lg font-semibold text-gray-600 dark:text-gray-400 pr-3">Username</p>
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
                <button className="h-auto transition hover:bg-blue-100 dark:hover:bg-red-200 rounded-full">
                    <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                        <BiSearchAlt />
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
