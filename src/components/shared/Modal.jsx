import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ toggle, visible, type = 1, confirm = false, size = 1 }) => {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={visible} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={toggle}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">

                        <Dialog.Overlay className="fixed inset-0 bg-gray-300 dark:bg-gray-600 dark:bg-opacity-30 bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

                        <div className="inline-block align-bottom rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-800 sm:mx-0 sm:h-10 sm:w-10">
                                        <p className="dark:text-white">!</p>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">
                                            Deactivate account
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to deactivate your account? All of your data will be permanently removed.
                                                This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                                {confirm && <button type="button" onClick={() => toggle(false)}
                                    className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red-600 dark:bg-red-800  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto" >
                                    <p className="text-white text-base sm:text-sm font-medium">Confirm</p>
                                </button>}
                                <button type="button" onClick={() => toggle(false)} ref={cancelButtonRef}
                                    className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto" >
                                    <p className="text-gray-700 dark:text-white text-base sm:text-sm font-medium">Close</p>
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;