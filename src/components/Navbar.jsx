import { ModeSwitcher } from 'components/shared';
import { BiSidebar } from 'react-icons/bi';

const Navbar = ({ className, toggleSidebar }) => {
    return (
        <section className={`${className} flex w-full items-center px-4`}>

            <div className="flex w-full items-center justify-between">
                <button onClick={toggleSidebar} className="h-auto transition hover:bg-blue-100 rounded-full">
                    <p className="p-2 text-3xl text-gray-500 dark:text-gray-400">
                        <BiSidebar/>
                    </p>
                </button>

                <ModeSwitcher/>
            </div>

        </section>
    )
}

export default Navbar
