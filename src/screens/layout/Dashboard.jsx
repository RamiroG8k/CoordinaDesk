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
            <Sidebar status={bar[0]} className="shadow-md absolute sm:relative p-2 dark:bg-gray-700" />

            <div className="w-screen h-screen">
                <Navbar className="h-14 sm:h-20 bg-white dark:bg-gray-700"
                    toggleSidebar={sidebarShifter} />

                <div className="flex flex-col w-full">
                    <div className="max-w-screen-lg mx-auto p-10 w-full overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Dashboard;
