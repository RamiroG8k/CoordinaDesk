import { Datatable } from 'components/shared';
import { useEffect, useState } from 'react';
import { apiInstance } from 'services';

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        await apiInstance.get('/user/all/pageable')
            .then(({ data }) => {
                setUsers(data.content);
            })
            .catch();
    };

    return (
        <section className="space-y-6">
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center" >
                <h1 className="text-5xl font-bold text-gray-400 mb-8">Users</h1>
                {users &&
                    <Datatable data={{ rows: users }} columns={Object.keys(users[0])} />
                }
            </div>
        </section>
    );
};

export default Users;
