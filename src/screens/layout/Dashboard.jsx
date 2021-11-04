// Common
import { useState } from 'react';
// Components
import { Sidebar, Navbar } from 'components';

const Dashboard = ({ children }) => {
    const [bar, setBar] = useState(['max', 'min']);
    const [shown, setShown] = useState(false);

    const sidebarShifter = () => {
        bar.unshift(bar[1]);
        bar.pop();
        setBar([...bar]);

        setShown(!shown);
    };

    const classHandler = () => {
        const mobile = 'hidden sm:flex';
        return shown ? mobile : 'absolute transition ease-in-out';
    };

    const mobileHandler = () => {
        setBar(['max', 'min']);
        setShown(!shown);
    };

    return (
        <section className="flex w-screen h-screen bg-main relative">
            {bar[0] === 'min' && <div className="hidden sm:flex h-full w-20" />}

            <Sidebar status={bar[0]} visible={shown} toggleView={mobileHandler}
                className={`${classHandler()} ${bar[0] === 'min' ? 'absolute' : 'sm:relative'} p-2 dark:bg-gray-700 z-30 shadow-md`} />

            <div className="w-screen h-screen overflow-y-auto">
                <Navbar toggleSidebar={sidebarShifter} mobileSidebar={mobileHandler}
                    className="z-20 h-14 sm:h-20 bg-white dark:bg-gray-700 shadow-md sticky top-0" />

                <div className="flex flex-col w-full transition-width duration-500">
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Dashboard;
