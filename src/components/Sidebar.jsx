import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { IoIosArrowUp, IoLogoGithub } from 'react-icons/io';
import { SidebarSections } from 'services';

const Sidebar = ({ status, className }) => {
    const [hover, setHover] = useState(false);

    return (
        <nav onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className={`${className} flex flex-col ${status === 'min' ? 'w-20 hover:w-64' : 'w-64'} bg-white h-full transition-width duration-500 justify-between gap-2`}>
            <section className="flex justify-center items-center w-full h-16 bg-blue-50 dark:bg-gray-800 rounded-2xl p-3">
                {(status === 'min' && !hover) && <img className="h-full w-auto" alt="Workflow"
                    src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" />}
                {(status === 'max' || hover) && <img className="h-full w-auto" alt="Workflow"
                    src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" />}
            </section>

            <section className="flex flex-col h-full bg-gray-50 rounded-2xl p-2 dark:bg-gray-800 space-y-2">
                {SidebarSections.map(({ title, icon, type, ...rest }, i) => {
                    return (
                        <Disclosure key={i}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button as="div" className="flex p-2 h-12 text-sm font-medium text-left text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-gray-700 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600 focus:outline-none transition">
                                        <button onClick={() => type === 'link' ? console.log(rest.path) : null}
                                            className={`flex items-center ${(status === 'max' || hover) ? 'justify-between' : 'justify-center'} h-full w-full`}>
                                            <div className={`${(status === 'max' || hover) ? 'ml-2' : ''} flex gap-3`}>
                                                <p className="text-xl">{icon}</p>
                                                {(status === 'max' || hover) && <p className="text-md">{title}</p>}
                                            </div>
                                            {(type === 'sub' && (status === 'max' || hover)) &&
                                                <IoIosArrowUp className={`${open ? '' : 'transform rotate-180'} w-5 h-5 mr-2`} />}
                                        </button>
                                    </Disclosure.Button>

                                    {rest.children && rest.children.map(({ title, path, ...other }, j) => {
                                        return (
                                            <Disclosure.Panel key={j} className="text-sm">
                                                <button onClick={() => other.type === 'link' ? console.log(path) : null}
                                                    className="flex items-center w-full h-8 px-6 gap-2 text-gray-800 dark:text-gray-400 hover:font-medium hover:text-md">
                                                    {(status === 'max' || hover) && <p className="text-md">{`-  ${title}`}</p>}
                                                </button>
                                            </Disclosure.Panel>
                                        );
                                    })}
                                </>
                            )}
                        </Disclosure>
                    );
                })}

            </section>

            <section className="flex justify-center items-center w-full h-16 bg-blue-50 dark:bg-gray-800 rounded-2xl">
                {(status === 'min' && !hover) && <a href="https://github.com/RamiroG8k" target="_blank" rel="noreferrer"
                    className="font-normal text-3xl p-3">
                    <IoLogoGithub />
                </a>}

                {(status === 'max' || hover) && <div className="uppercase font-light dark:text-gray-400 text-center text-xs">
                    <p>Powered by</p>
                    <a href="https://github.com/RamiroG8k" target="_blank" rel="noreferrer"
                        className="font-normal bg-blue-200 dark:bg-gray-600 px-1 rounded-sm">RamiroG8k</a>
                </div>}
            </section>
        </nav>
    )
}

export default Sidebar;
