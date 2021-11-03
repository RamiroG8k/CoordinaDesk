import { useState } from 'react';
import { Switch } from '@headlessui/react';

const Switcher = ({ className, title, value, onChange }) => {
    const [enabled, setEnabled] = useState(value);

    const changeHandler = () => {
        setEnabled(!enabled);
        onChange(!enabled);
    };

    return (
        <Switch.Group as="div" className={className} title={title}>
            <Switch checked={enabled} onChange={changeHandler}
                className={`${enabled ? 'bg-green-400' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}>
                <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white dark:bg-gray-500 rounded-full transition-transform`} />
            </Switch>
        </Switch.Group>
    );
};

export default Switcher;
