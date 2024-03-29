// Common
import { useState } from 'react';
// Others
import { Link, useHistory } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { IoIosArrowUp, IoIosArrowForward } from 'react-icons/io';
import { CgLogOut } from 'react-icons/cg';
// Data
import { SidebarSections, apiInstance } from 'services';
import { removeCredentials } from 'utils';
// Assets
import LogoLarge from 'assets/images/Logo-Large.png';
import LogoLargeDark from 'assets/images/Logo-Large-Dark.png';
import LogoSquare from 'assets/images/Logo-Square.png';


const Sidebar = ({ status, className, visible, toggleView }) => {
    const [hover, setHover] = useState(false);
    const history = useHistory();

    const logOut = async () => {
        await apiInstance.post('/auth/logout')
            .then(() => {
                removeCredentials();
                history.push('/login');
            });
    };

    return (
        <nav onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            className={`${className} flex flex-col ${status === 'min' ? 'w-20 hover:w-52' : 'w-64'} bg-white h-full transition-width duration-500 justify-between gap-2`}>

            <section className="flex justify-center items-center w-full h-16">
                <Link to="/" target="_blank" rel="noopener noreferrer" className="flex w-full h-full p-3 bg-blue-50 dark:bg-gray-800 rounded-2xl">
                    {(status === 'min' && !hover) && <img className="h-full w-auto" alt="logo" src={LogoSquare} />}
                    {(status === 'max' || hover) &&
                        <div>
                            <img className="dark:hidden h-auto w-auto" alt="logo" src={LogoLarge} />
                            <img className="hidden dark:block h-auto w-auto" alt="logo" src={LogoLargeDark} />
                        </div>
                    }
                </Link>
                <button onClick={toggleView}
                    className="flex sm:hidden w-1/5 justify-center items-center text-2xl text-gray-600 dark:text-gray-900 h-full" >
                    <IoIosArrowForward className={`${visible ? '' : 'transform rotate-180'}`} />
                </button>
            </section>

            <section className="flex flex-col h-full bg-gray-50 rounded-2xl p-2 dark:bg-gray-800 space-y-2">
                {SidebarSections.map(({ title, icon, type, path, ...rest }, i) => {
                    const actualRole = JSON.parse(localStorage.getItem('user'))?.role;
                    return rest.roles.includes(actualRole) ?
                        (<Disclosure key={i}>
                            {({ open }) => <>
                                <Disclosure.Button as="div" className="flex p-2 h-12 text-sm font-medium text-left text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-gray-700 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600 focus:outline-none transition">
                                    <Link to={() => type === 'link' ? path : '#'}
                                        className={`flex items-center ${(status === 'max' || hover) ? 'justify-between' : 'justify-center'} h-full w-full`}>
                                        <div className={`${(status === 'max' || hover) ? 'ml-2' : ''} flex items-center gap-3`}>
                                            <p className="text-xl">{icon}</p>
                                            {(status === 'max' || hover) && <p className="text-md leading-4">{title}</p>}
                                        </div>
                                        {(type === 'sub' && (status === 'max' || hover)) &&
                                            <IoIosArrowUp className={`${open ? '' : 'transform rotate-180'} w-5 h-5 mr-2`} />}
                                    </Link>
                                </Disclosure.Button>

                                {rest.children && rest.children.map(({ title, type, path, ...other }, j) => {
                                    return other.roles?.includes(actualRole) || !other.roles ?
                                        (<Disclosure.Panel key={j} className="text-sm">
                                            <Link to={() => type === 'link' ? path : '#'}
                                                className="flex items-center w-full h-8 px-6 gap-2 text-gray-800 dark:text-gray-400 hover:font-medium hover:text-md">
                                                {(status === 'max' || hover) && <p className="text-md">{`-  ${title}`}</p>}
                                            </Link>
                                        </Disclosure.Panel>)
                                        : null;
                                })}
                            </>}
                        </Disclosure>) : null
                })}
            </section>

            <section className="flex justify-center items-center w-full h-16 bg-blue-50 dark:bg-gray-800 rounded-2xl">
                {/* {(status === 'min' && !hover) && <a href="https://github.com/RamiroG8k" target="_blank" rel="noreferrer"
                    className="font-normal text-3xl p-3">
                    <IoLogoGithub />
                </a>}

                {(status === 'max' || hover) && <div className="uppercase font-light dark:text-gray-400 text-center text-xs">
                    <p>Powered by</p>
                    <a href="https://github.com/RamiroG8k" target="_blank" rel="noreferrer"
                        className="font-normal bg-blue-200 dark:bg-gray-600 px-1 rounded-sm">Brand name</a>
                </div>} */}
                {(status === 'min' && !hover) && <a href="https://github.com/RamiroG8k" target="_blank" rel="noreferrer"
                    className="font-normal text-3xl p-3 dark:text-gray-400">
                    <CgLogOut />
                </a>}

                {(status === 'max' || hover) && <div className="uppercase font-light dark:text-gray-400 text-center text-xs">
                    <p>Cerrar sesión</p>
                    <button onClick={() => logOut()} target="_blank" rel="noreferrer"
                        className="font-normal bg-blue-200 dark:bg-gray-600 px-1 rounded-sm uppercase">Salir</button>
                </div>}
            </section>
        </nav>
    )
}

export default Sidebar;
