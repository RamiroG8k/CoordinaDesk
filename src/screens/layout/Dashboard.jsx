// Common
import { useState } from 'react';
// Components
import { Sidebar, Navbar } from 'components';
// Util

const Dashboard = ({ children }) => {
    const [bar, setBar] = useState(['max', 'min']);

    const sidebarShifter = () => {
        bar.unshift(bar[1]);
        bar.pop();
        setBar([...bar]);
    };

    return (
        <section className="flex w-screen h-screen bg-main relative">
            {bar[0] === 'min' && <div className="hidden sm:flex h-full w-20" />}
            <Sidebar status={bar[0]} className={`shadow-md ${bar[0] === 'min' ? 'absolute': 'sm:relative'} p-2 dark:bg-gray-700 z-10`} />

            <div className="w-screen h-screen overflow-y-auto">
                <Navbar className="h-14 sm:h-20 bg-white dark:bg-gray-700 shadow-md sticky top-0"
                    toggleSidebar={sidebarShifter} />

                <div className="flex flex-col w-full">
                    <div className="max-w-screen-lg mx-auto p-10 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Dashboard;
