import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

const PopoverTool = ({ buttonAs, children, actions, docs, onAction, className }) => {
    const eventHandler = (action, close) => {
        onAction(action);
        close();
    };

    return (
        <Popover as={Fragment} >
            {({ open, close }) => (
                <>
                    <Popover.Button as={buttonAs} className={`${open ? 'text-blue-800' : ''} ${className}`}>
                        {children}
                    </Popover.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                        <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 -translate-y-72   left-1/2 sm:px-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                    {actions && actions.map((item) => (
                                        <button key={item.name} onClick={() => eventHandler(item.action, close)}
                                            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
                                            <div className="flex items-center justify-center bg-blue-100 rounded-xl flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                                <p className="text-lg sm:text-xl">
                                                    {item.icon}
                                                </p>
                                            </div>
                                            <div className="ml-4 text-left">
                                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="text-left px-6 py-4 bg-gray-50">
                                    <span className="text-sm font-medium text-gray-900">
                                        {docs?.title ?? 'Documentation'}
                                    </span>
                                    <span className="block text-sm text-gray-500">
                                        {docs?.description ?? 'Start integrating products and tools'}
                                    </span>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default PopoverTool;
