// Common
import { useEffect, useState } from 'react';
// Components
import { Datatable } from 'components/shared';
// Services
import { apiInstance } from 'services';

const Users = () => {
    const [data, setData] = useState();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (page, limit) => {
        await apiInstance.get('/user/all/pageable', { params: { page, limit } })
            .then(({ data }) => {
                setData({
                    // ...data,
                    rows: userParser(data.content),
                    total: data.totalElements,
                    current: data.page,
                    last: data.pages,
                });
            }).catch(console.log);
    };

    const userParser = (data = []) => {
        return data.map((user) => (
            {
                // id: user.id,
                nombre: user.name,
                email: user.email,
                rol: user.role,
                tickets: user.ticketsCount,
                activo: user.isActive,
            }
        ));
    };

    return (
        <section className="space-y-6">
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center" >
                <h1 className="text-5xl font-bold text-gray-400 mb-8">Users</h1>
                {data && <Datatable data={data} columns={Object.keys(data.rows[0])}
                    onUpdate={(page, limit) => fetchUsers(page, limit)} />}
            </div>
        </section>
    );
};

export default Users;
