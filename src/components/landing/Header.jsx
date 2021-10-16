import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { sections } from 'utils/data';

const LandingNavbar = ({ onCreate }) => {
    return (
        <header className="flex w-full h-16 bg-blue-100 px-8 py-4 justify-between items-center">
            <div className="flex justify-center">
                <img className="block lg:hidden h-6 w-auto" alt="Workflow"
                    src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" />
                <img className="hidden lg:block h-6 w-auto" alt="Workflow"
                    src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" />
            </div>
            <div className="hidden sm:flex gap-6 items-center">
                {sections.map(({ name, goTo }) =>
                    <a href={goTo} key={name}
                        className="font-medium hover:text-blue-800 transition transform hover:scale-105">{name}</a>
                )}
                <button onClick={() => onCreate(true)}
                    className="bg-white hover:scale-105 hover:font-medium transform transition px-3 py-1 rounded-xl">
                    <div className="flex items-center gap-1 text-lg text-gray-700">
                        <p>Crear ticket</p>
                    </div>
                </button>
                <Link to="/login"
                    className="bg-blue-300 hover:scale-105 hover:font-medium transform transition px-3 py-1 rounded-xl">
                    <div className="flex items-center gap-1 text-lg text-gray-700">
                        <p>Login</p>
                        <BiUserCircle />
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default LandingNavbar;
