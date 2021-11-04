// Common
import { Fragment } from 'react';
// Components
import { Disclosure, Transition } from '@headlessui/react';
// Others
import { GrFormDown } from 'react-icons/gr';

const CustomDisclosure = ({ title, question, answer, description, color, className }) => {

    return (
        <Disclosure>
            {({ open }) => (<>
                <Disclosure.Button as="button" className={`${className} flex items-center gap-4 w-full transition sm:text-lg font-medium text-left focus:outline-none
                            ${color ? `text-${color}-900 bg-${color}-100 dark:bg-${color}-600 hover:bg-${color}-200` : 'border-b dark:border-gray-600'}`}>

                    <div className={`${open ? 'transform rotate-180' : ''} w-5 h-5 ${color ? `text-${color}-500` : 'dark:text-gray-300'}`}>
                        <GrFormDown />
                    </div>
                    <span className="dark:text-gray-300">{question || title}</span>
                </Disclosure.Button>

                <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="transform opacity-0" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200 " leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0">
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 dark:text-gray-500 w-full">
                        {answer || description}
                    </Disclosure.Panel>
                </Transition>
            </>)
            }
        </Disclosure>
    )
}

export default CustomDisclosure;
