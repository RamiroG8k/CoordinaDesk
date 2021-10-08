// Common
import { useEffect } from 'react';
// Components
import { Select } from 'components/shared';
// Others
import { firstCapitalized } from 'utils';
import { useState } from 'react';
import { apiInstance } from 'services';

const STATUS = [
    { label: 'To do', value: 'ASIGNED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'RESOLVE' },
];

const TicketDetails = ({ id, onUpdate }) => {
    const [info, setInfo] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])
    
    useEffect(() => {
        fetchTicketDetails(id);
    }, [id])

    const fetchTicketDetails = async (id) => {
        await apiInstance.get(`/ticket/id/${id}`)
            .then(({ data }) => {
                setInfo(data);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const fetchUsers = async () => {
        await apiInstance.get('/user/all')
            .then(({ data }) => {
                setUsers(data.map((e) => { return { label: firstCapitalized(e.name), value: e._id } }));
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const updateStatus = async (status) => {
        await apiInstance.patch(`/ticket/id/${id}/change-status`, { status })
            .then(({ data }) => {
                onUpdate();
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const reasingUser = async (id) => {
        await apiInstance.patch(`/ticket/id/${id}/reasign-user/${id}`)
            .then(({ data }) => {
                console.log(data);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    return (
        <section className="flex flex-col justify-between h-96 px-6 py-4 bg-gray-50 dark:bg-gray-700">
            {info && <div className="flex gap-6 flex-col sm:flex-row w-full">
                <div className="w-full sm:w-2/3 mt-2 ml-2">
                    <h6 className="text-xl font-medium mb-2">{firstCapitalized(info.title)}</h6>
                    <p className="text-gray-700">{info.description}</p>
                </div>
                <div className="w-full sm:w-1/3 space-y-6">
                    <div>
                        <label htmlFor="" className="text-sm ml-2">Estado</label>
                        <Select array={STATUS} labels defaultValue={info.status}
                            buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                            dropdownStyle="bg-white dark:bg-gray-600 dark:text-gray-400 z-20"
                            activeStyle="bg-blue-100 dark:bg-gray-800"
                            onChange={({ value }) => updateStatus(value)} />
                    </div>
                    <div>
                        <label htmlFor="" className="text-sm ml-2">Responsable</label>
                        {(users.length > 0) && <Select array={users} labels defaultValue={info.user}
                            buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                            dropdownStyle="bg-white dark:bg-gray-800 text-gray-500 z-20"
                            onChange={({ value }) => reasingUser(value)}
                        />}
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default TicketDetails;
