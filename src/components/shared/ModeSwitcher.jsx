import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ModeSwitcher = () => {
    const [enabled, setEnabled] = useState(false);
    const htmlClasses = document.getElementsByTagName('html')[0].classList;

    const toggleMode = () => {
        setEnabled(!enabled);
        htmlClasses.contains('scheme-dark') ?
            htmlClasses.remove('scheme-dark') :
            htmlClasses.add('scheme-dark');
    };

    return (
        <Switch.Group as="div" className="flex relative">
            <Switch checked={enabled} onChange={toggleMode}
                className={`${enabled ? 'bg-gray-800' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}>
                <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white dark:bg-gray-500 rounded-full transition-transform`} />
            </Switch>

            {enabled ? <span className="absolute top-1 left-1 text-gray-400"><FiMoon /></span> :
                <span className="absolute top-1 right-1 text-white"><FiSun /></span>}
        </Switch.Group>
    );
};

export default ModeSwitcher;