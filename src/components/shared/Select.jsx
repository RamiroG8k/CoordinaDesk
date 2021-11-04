import { useState, Fragment, useEffect } from 'react';
import { CgArrowsExchangeAltV, CgCheck } from 'react-icons/cg';
import { Listbox, Transition } from '@headlessui/react';

const Select = ({ array, item = '', labels = false, defaultValue, onChange, disabled = false,
    buttonStyle, dropdownStyle, activeStyle, parentStyle }) => {

    const [selected, setSelected] = useState();

    useEffect(() => {
        setSelected(labels ?
            (array.filter((item => item.value === defaultValue))[0] ?? null) :
            (defaultValue ?? null));
    }, []);

    const handleChange = (value) => {
        const rawValue = labels ? array.filter((item => item.value === value))[0] : value;
        
        setSelected(rawValue);
        onChange(rawValue);
    };
    
    return (
        <Listbox disabled={disabled} value={labels ? selected?.value : selected} onChange={handleChange}>
            <div className={`${parentStyle} relative`}>
                <Listbox.Button className={`${buttonStyle} relative w-full py-2 pl-3 pr-10 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm`}>
                    <span className="block truncate">
                        {`${selected ? (labels ? selected?.label : selected) : 'Seleccionar'} ${item}`}
                        {/* {`${labels ? (selected?.label ?? 'Seleccionar') : (selected ?? 'Seleccionar')} ${item}`} */}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <CgArrowsExchangeAltV />
                    </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100"
                    leaveFrom="opacity-100" leaveTo="opacity-0" >
                    <Listbox.Options className={`${dropdownStyle} absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                        {array.map((e, i) => (
                            <Listbox.Option key={i} className={({ active }) =>
                                `${active ? `${activeStyle}` : 'text-gray-900'} cursor-pointer select-none relative py-2 pl-10 pr-4`}
                                value={labels ? e?.value : e}>
                                {({ selected, active }) => (
                                    <>
                                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                                            {labels ? e?.label : e}
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
