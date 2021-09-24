import React, { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { GrFormDown } from 'react-icons/gr';

const CustomDisclosure = ({ title, description, color = 'blue' }) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className={`flex justify-between w-full p-4 transition sm:text-lg font-medium text-left text-${color}-900 bg-${color}-50 rounded-2xl hover:bg-${color}-100 focus:outline-none focus-visible:ring focus-visible:ring-${color}-500 focus-visible:ring-opacity-75`}>
                        <span>{title}</span>
                        <GrFormDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-${color}-500`} />
                    </Disclosure.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="transform opacity-0" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-300 " leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0">
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
