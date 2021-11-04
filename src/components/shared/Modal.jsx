// Common
import { Fragment, useRef } from 'react';
// Components
import { Dialog, Transition } from '@headlessui/react';
// Others
import { CgClose } from 'react-icons/cg';

const Modal = ({ onClose, visible, type = 1, size = 'sm', title, children }) => {
    const cancelButtonRef = useRef(null);

    const getMaxWidth = (size) => {
        switch (size) {
            case 'sm': return 'max-w-sm';
            case 'md': return 'max-w-md';
            case 'lg': return 'max-w-lg';
            case 'xl': return 'max-w-xl';
            case '2xl': return 'max-w-2xl';
            case '3xl': return 'max-w-3xl';
            case '4xl': return 'max-w-4xl';
            case '5xl': return 'max-w-5xl';
            default: return 'max-w-sm';
        }
    };

    return (
        <Transition.Root show={visible} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose}>
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

                        <div className={`overflow-visible w-full sm:align-middle ${getMaxWidth(size)} bg-white dark:bg-gray-800 inline-block align-bottom rounded-3xl text-left shadow-xl transform transition-all sm:my-8`}>
                            <div className="p-4 sm:p-6 pb-0 sm:pb-0">
                                <div className="flex items-center justify-between text-center sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900 dark:text-gray-400">
                                        {title}
                                    </Dialog.Title>
                                    <button onClick={() => onClose(false)} className="p-2">
                                        <p>
                                            <CgClose />
                                        </p>
                                    </button>
                                </div>
                            </div>
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
