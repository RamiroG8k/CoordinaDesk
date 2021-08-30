import { useState } from 'react'
import { Switch } from '@headlessui/react'

const ModeSwitcher = ({ onSwitch, className }) => {
    const [enabled, setEnabled] = useState(false);

    const handleSwitch = (state) => {
        setEnabled(state);
        onSwitch(state);
    };

    return (
        <Switch.Group>
            <div className={`${className} flex items-center`}>
                <Switch.Label className="mr-4 dark:text-gray-400">Enable {enabled ? 'Light' : 'Dark'} Mode</Switch.Label>
                <Switch checked={enabled} onChange={handleSwitch}
                    className={`${enabled ? 'bg-gray-800' : 'bg-gray-300'
                        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}>
                    <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white dark:bg-gray-500 rounded-full transition-transform`} />
                </Switch>
            </div>
        </Switch.Group>
    )
};

export default ModeSwitcher;