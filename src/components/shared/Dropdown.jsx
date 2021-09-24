import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoIosArrowDown } from 'react-icons/io';

const Dropdown = ({ component, onEvent }) => {
    
    const handleEvent = ({ target }) => {
        onEvent(target.name);
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button>
                {component}
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                    <p className={active ? 'bg-blue-500 text-white' : 'text-gray-900'}>
                                        <IoIosArrowDown />
                                    </p>
                                    <p>Edit</p>
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                    <p className={active ? 'bg-blue-500 text-white' : 'text-gray-900'}>
                                        <IoIosArrowDown />
                                    </p>
                                    <p>Duplicate</p>
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={handleEvent} name="logout"
                                className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                    <p className={active ? 'bg-blue-500 text-white' : 'text-gray-900'}>
                                        <IoIosArrowDown />
                                    </p>
                                    <p>Log out</p>
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Dropdown;
