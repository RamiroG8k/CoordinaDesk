import { useState } from 'react';
import { CgArrowsExchangeAltV, CgCheck } from 'react-icons/cg';
import { Listbox, Transition } from '@headlessui/react';

const Select = ({ array, item = '', onChange }) => {
    const [selected, setSelected] = useState(array[0]);

    const handleChange = (value) => {
        onChange(value);
        setSelected(value);
    };
    
    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="relative">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-xl shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{`${selected} ${item}`}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <CgArrowsExchangeAltV />
                    </span>
                </Listbox.Button>
                <Transition as="div" leave="transition ease-in duration-100"
                    leaveFrom="opacity-100" leaveTo="opacity-0" >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {array.map((limit, i) => (
                            <Listbox.Option key={i} className={({ active }) =>
                                `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4`}
                                value={limit}>
                                {({ selected, active }) => (
                                    <>
                                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                                            {limit}
                                        </span>
                                        {selected ? (
                                            <span className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                                                <CgCheck />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
};

export default Select;
