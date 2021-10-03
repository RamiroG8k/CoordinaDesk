// Common
import { useEffect, useState } from 'react';
// Components
import { Datatable, Modal } from 'components/shared';
// Services
import { apiInstance } from 'services';
// Others
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CreateUser } from 'components/admin';

const Users = () => {
    const [data, setData] = useState();
    const [create, setCreate] = useState(false);

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
            <Modal visible={create} toggle={setCreate} size="xl" title="Crear usuario"
                body={<CreateUser.Body />} actions={<CreateUser.Actions />}>
                {/* <CreateUser>
                    <CreateUser.Body />
                    <CreateUser.Actions />
                </CreateUser> */}
            </Modal>
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center" >
                <div className="relative w-full">
                    <h1 className="text-4xl sm:text-5xl text-center font-bold text-gray-400 mb-4 sm:mb-8">Usuarios</h1>
                    <button onClick={() => setCreate(!create)}
                        className="absolute top-0 flex items-center gap-1 btn btn-animated bg-blue-100 w-auto px-3 py-2">
                        <p className="text-3xl"><AiOutlineUserAdd /></p>
                        <p className="hidden md:block text-xl">Crear</p>
                    </button>
                </div>
                {data && <Datatable data={data} columns={Object.keys(data.rows[0])}
                    onUpdate={(page, limit) => fetchUsers(page, limit)} />}
            </div>
        </section>
    );
};

export default Users;
