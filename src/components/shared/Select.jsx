import { useState, Fragment, useEffect } from 'react';
import { CgArrowsExchangeAltV, CgCheck } from 'react-icons/cg';
import { Listbox, Transition } from '@headlessui/react';

const Select = ({ array, item = '', labels = false, multiple = false, defaultValue, onChange, disabled = false,
    buttonStyle, dropdownStyle, activeStyle, parentStyle }) => {

    const [selected, setSelected] = useState(multiple ? [] : null);
    const [label, setLabel] = useState('Seleccionar');

    useEffect(() => {
        setSelected(labels ?
            (array.filter((item => item.value === defaultValue))[0] ?? (multiple ? [] : null)) :
            (defaultValue ?? (multiple ? [] : null)));
    }, []);

    useEffect(() => {
        labelHandler();
        setLabel((value) => (selected?.length > 0) ? value : 'Seleccionar')
    }, [selected])

    const handleChange = (value) => {
        let rawValue;

        if (multiple) {
            // Handle if is in selected Array > Both objects and values
            const isInside = selected.filter((item) => {
                return (labels ? (item.value === value) : (item === value));
            }).length > 0;

            if (isInside) {
                // Toggle if found in array
                console.log('FOUND');
                rawValue = labels ? selected.filter((item => item.value !== value)) :
                    selected.filter((item => item !== value));
            } else {
                // Handle if it is not in selected Array > Both objects and values
                console.log('NEW ITEM');
                const aux = labels ? array.filter((item => item.value === value))[0] :
                    array.filter((item => item === value))[0];
                // Push if not
                rawValue = [...selected, aux];
            }
        } else {
            rawValue = labels ? array.filter((item => item.value === value))[0] : value;
        }

        setSelected(rawValue);
        onChange(rawValue);
    };

    const labelHandler = () => {
        if ((multiple && (selected?.length > 0)) || (!multiple && selected)) {
            let label;

            if (multiple) {
                label = (selected.length > 1) ? `${(selected.length)} Seleccionados` : (labels ? selected[0].label : selected[0]);
                setLabel(label);
            } else {
                label = labels ? (selected.label) : selected;
                setLabel(label);
            }
        }
    };

    return (
        <Listbox disabled={disabled} value={labels ? selected?.value : selected} onChange={handleChange}>
            <div className={`${parentStyle} relative`}>
                <Listbox.Button className={`${buttonStyle} relative w-full py-2 pl-3 pr-10 text-left rounded-xl cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm`}>
                    <span className="block">
                        {label} {item}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <CgArrowsExchangeAltV />
                    </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100"
                    leaveFrom="opacity-100" leaveTo="opacity-0" >
                    <Listbox.Options className={`${dropdownStyle} absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                        {array.map((e, i) => {
                            const isActive = multiple ? selected?.includes(e) : e === selected;
                            return (
                                <Listbox.Option key={i} value={labels ? e?.value : e} className={({ active }) => `${(active || isActive) ? `${activeStyle}` : 'text-gray-900'}
                                cursor-pointer select-none relative py-2 pl-10 pr-4`}>
                                    <>
                                        <span className={`${isActive ? 'font-medium' : 'font-normal'} block`}>
                                            {labels ? e?.label : e}
                                        </span>
                                        {isActive ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <CgCheck />
                                            </span>
                                        ) : null}
                                    </>
                                </Listbox.Option>
                            );
                        })}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
};

export default Select;
