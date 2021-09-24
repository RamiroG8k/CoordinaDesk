import { useState, useEffect } from 'react';
import { apiInstance } from 'services';

const Tickets = () => {
    const [{ todo, inProgress, done }, setTickets] = useState({ todo: [], inProgress: [], done: [] });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        await apiInstance.get('/ticket/dashboard')
            .then(({ data }) => {
                setTickets(data);
            })
            .catch();
    };

    return (
        <section className="flex flex-col sm:grid grid-cols-3 gap-6">
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-3xl sm:rounded-4xl p-4" >
                <h2 className="text-4xl font-bold text-gray-400 text-center">To do</h2>
                <div className="flex flex-col space-y-3 mt-6">
                    {todo.map(({ status, title }, i) => {
                    return (
                        <div key={i} className="relative h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-600" >
                            <p className="text-sm dark:text-gray-500">{title}</p>
                            <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{status}</span>
                        </div>
                    );
                })}
                </div>
            </div>
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-3xl sm:rounded-4xl p-4" >
                <h2 className="text-4xl font-bold text-gray-400 text-center">In progress</h2>
                <div className="flex flex-col space-y-3 mt-6">
                    {inProgress.map(({ status, title }, i) => {
                        return (
                            <div key={i} className="relative h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 border" >
                                <p className="text-sm">{title}</p>
                                <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{status}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-3xl sm:rounded-4xl p-4" >
                <h2 className="text-4xl font-bold text-gray-400 text-center">Done</h2>
                <div className="flex flex-col space-y-3 mt-6">
                    {done.map(({ status, title }, i) => {
                        return (
                            <div key={i} className="relative h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 border" >
                                <p className="text-sm">{title}</p>
                                <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{status}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Tickets;
