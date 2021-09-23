import { useEffect, useState } from 'react';
import { apiInstance } from 'services'; 

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const ramen = '613d2f6ee77af720cb894c22';

        await apiInstance.get(`/user/${ramen}`)
            .then(({ data }) => {
                setUsers(data);
            })
            .catch();
    };

    return (
        <section className="space-y-6">
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10 h-96 flex justify-center items-center" >
                <h1 className="text-5xl font-bold text-gray-400">Users</h1>
                {users ? <pre className="text-xs">{JSON.stringify(users, null, 2)}</pre>
                : <p>Not found</p>
                }
            </div>
        </section>
    )
}

export default Users;
