// Common
import { Link } from 'react-router-dom';
// Assets
import LogoLarge from 'assets/images/Logo-Large.png';
import LogoLargeDark from 'assets/images/Logo-Large-Dark.png';
import LogoSquare from 'assets/images/Logo-Square.png';
// Others
import { BiUserCircle } from 'react-icons/bi';
import { sections } from 'utils/data';

const LandingNavbar = ({ onCreate, className }) => {
    return (
        <header className={`${className} bg-opacity-10 backdrop-filter backdrop-blur-md flex w-full h-16 px-8 py-4 justify-between items-center`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="flex justify-center" href="#" >
                <img className="block lg:hidden h-14 w-14" alt="logo"src={LogoSquare} />
                <div className="hidden lg:block">
                    <img className="dark:hidden h-10 w-auto" alt="logo" src={LogoLarge} />
                    <img className="dark:block h-10 w-auto" alt="logo" src={LogoLargeDark} />
                </div>
            </a>
            <div className="hidden sm:flex gap-6 items-center">
                {sections.map(({ name, goTo }) =>
                    <a href={goTo} key={name}
                        className="dark:text-gray-500 font-medium hover:text-blue-800 transition transform hover:scale-105">{name}</a>
                )}
                <button onClick={() => onCreate(true)}
                    className="bg-gray-100 dark:bg-gray-700 hover:scale-105 hover:font-medium transform transition px-3 py-1 rounded-xl">
                    <div className="flex items-center gap-1 text-lg text-gray-700 dark:text-gray-400">
                        <p>Crear ticket</p>
                    </div>
                </button>
                <Link to="/login"
                    className="bg-blue-200 dark:bg-blue-900 hover:scale-105 hover:font-medium transform transition px-3 py-1 rounded-xl">
                    <div className="flex items-center gap-1 text-lg text-gray-700 dark:text-white">
                        <p>Login</p>
                        <BiUserCircle />
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default LandingNavbar;
