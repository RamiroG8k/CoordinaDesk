import { ModeSwitcher } from 'components/shared';
import { BiSidebar } from 'react-icons/bi';

const Navbar = ({ className, toggleSidebar, mobileSidebar }) => {
    return (
        <section className={`${className} flex w-full items-center px-4 justify-between`}>
            <div className="left">
                <button onClick={toggleSidebar} className="hidden sm:block h-auto transition hover:bg-blue-100 rounded-full focus:outline-none">
                    <p className="p-2 text-3xl text-gray-500 dark:text-gray-400">
                        <BiSidebar />
                    </p>
                </button>
                <button onClick={mobileSidebar} className="block sm:hidden h-auto transition hover:bg-blue-100 rounded-full">
                    <p className="p-2 text-3xl text-gray-500 dark:text-gray-400">
                        <BiSidebar />
                    </p>
                </button>
            </div>

            <div className="right">
                <ModeSwitcher />
            </div>
        </section>
    )
}

export default Navbar
