// Common
import { Fragment } from 'react';
// Components
import { Disclosure, Transition } from '@headlessui/react';
// Others
import { GrFormDown } from 'react-icons/gr';

const CustomDisclosure = ({ opened, title, description, color }) => {
    return (
        <Disclosure>
            {({ open, close }) => (
                <>
                    <Disclosure.Button
                        className={`flex items-center gap-4 w-full p-3 transition sm:text-lg font-medium text-left focus:outline-none
                            ${color ? `text-${color}-900 bg-${color}-100 hover:bg-${color}-200` : 'border-b'}`}>
                        <GrFormDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-${color}-500`} />
                        <span>{title}</span>
                    </Disclosure.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="transform opacity-0" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-200 " leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0">
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 w-full">
                            {description}
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}

export default CustomDisclosure;
