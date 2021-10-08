// Common
import { useEffect } from 'react';
// Components
import { Select } from 'components/shared';
// Others
import { firstCapitalized } from 'utils';
import { useState } from 'react';
import { apiInstance } from 'services';
import { IoMdReturnLeft } from 'react-icons/io';

const STATUS = [

    { label: 'To do', value: 'ASIGNED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'RESOLVE' },

    // ASIGNED: 'ASIGNED',
    // IN_PROGRESS: 'IN_PROGRESS',
    // WAITING_RESPONSE: 'WAITING_RESPONSE',
    // RESOLVE: 'RESOLVE',
    // FINAL_RESOLVE: 'FINAL_RESOLVE',
    // CLOSED_DUE_TO_INACTIVITY: 'CLOSED_DUE_TO_INACTIVITY'
];

const TicketDetails = ({ details, onUpdate }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();    
    }, [])

    const fetchUsers = async () => {
        await apiInstance.get('/user/all')
            .then(({ data }) => {
                setUsers(data.map((e) => { return { label: firstCapitalized(e.name), value: e._id } }));
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
        };
        
        const updateStatus = async (status) => {
            await apiInstance.patch(`/ticket/id/${details._id}/change-status`, { status })
                .then(({ data }) => {
                    onUpdate();
                    // fetchData
                    // Notif
                    // Close Modal
                    // Fetch
                }).catch(({ response: { data: error } }) => {
                    console.log(error);
                });
        };
        
        const reasingUser = async (id) => {
            await apiInstance.patch(`/ticket/id/${details._id}/reasign-user/${id}`)
                .then(({ data }) => {
                    // fetchData
                    // Notif
                    // Close Modal
                    // Fetch
                }).catch(({ response: { data: error } }) => {
                    console.log(error);
                });
        
    };

    return (
        <section className="flex flex-col justify-between h-96 px-6 py-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex gap-6 flex-col sm:flex-row w-full">
                <div className="w-full sm:w-2/3">
                    <h6 className="text-xl font-medium">{firstCapitalized(details.title)}</h6>
                </div>
                <div className="w-full sm:w-1/3 space-y-6">
                    <div className="group">
                        <label htmlFor="" className="text-sm ml-2">Estado</label>
                        <Select array={STATUS} labels defaultValue={details.status}
                            buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                            dropdownStyle="bg-white dark:bg-gray-600 dark:text-gray-400 z-20"
                            activeStyle="bg-blue-100 dark:bg-gray-800"
                            onChange={({ value }) => updateStatus(value)} />
                    </div>

                    <div className="group">
                        <label htmlFor="" className="text-sm ml-2">Responsable</label>
                        {(users.length > 0) && <Select array={users} labels defaultValue={details.user._id}
                            buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                            dropdownStyle="bg-white dark:bg-gray-800 text-gray-500 z-20"
                            onChange={({ value }) => reasingUser(value)}
                        />}
                    </div>
                </div>

                {/* <pre>{JSON.stringify(details.data, null, 4)}</pre> */}
            </div>
            {/* <button className="btn px-4 py-2 sm:w-auto self-end bg-blue-100 dark:bg-gray-900">
                <p className="dark:text-gray-400">
                    Aplicar
                </p>
            </button> */}
        </section>
    );
};

export default TicketDetails;
