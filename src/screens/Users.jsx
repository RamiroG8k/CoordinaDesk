// Common
import { useEffect, useState } from 'react';
// Components
import { Datatable, Modal } from 'components/shared';
import { CreateUser, UserDetails } from 'components/admin';
// Services | Data
import { apiInstance } from 'services';
import { userActions } from 'utils/data';
// Others
import { AiOutlineUserAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Users = () => {
    const [data, setData] = useState();
    const [create, setCreate] = useState(false);
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (page, limit = 10, search) => {
        await apiInstance.get('/user/all/pageable',
            { params: { page, limit, name: search, email: search, role: search } })
            .then(({ data }) => {
                setData({
                    rows: userParser(data.content),
                    columns: Object.keys(userParser(data.content)[0]).slice(1),
                    actions: userActions,
                    pagination: {
                        total: data.totalElements,
                        from: data.page > 1 ? (((data.page - 1) * limit) + 1) : 1,
                        to: (limit * data.page) > data.totalElements ? data.totalElements : (limit * data.page),
                        current: data.page,
                        last: data.pages,
                    }
                });
            }).catch(console.log);
    };

    const userParser = (data = []) => {
        return data.map((user) => (
            {
                _id: user.id,
                nombre: user.name,
                email: user.email,
                rol: user.role,
                tickets: user.ticketsCount,
                status: user.isActive,
            }
        ));
    };

    const handleItemEvent = ({ item, action }) => {
        switch (action) {
            case 'deactivate':
                deleteUser(item._id);
                break;
            case 'details':
                setShow(true);
                setUser(item._id);
                break;
            case 'resend-email':
                reSendEmailUser(item)
                break;
            default:
                break;
        }
    };

    const deleteUser = async (id) => {
        await apiInstance.delete(`/user/${id}`)
            .then(({ data }) => {
                toast.success(`Se ha desactivado el usuario correctamente`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                fetchUsers();
            }).catch(({ response: { data: error } }) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };

    const reSendEmailUser = async ({ _id, email }) => {
        await apiInstance.put('/user/resend-email', { _id, email })
            .then(({ data }) => {
                toast.success(`Se ha enviado un nuevo correo al usuario con el correo: ${email}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(({ response: { data: error } }) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };

    return (
        <section className="space-y-6">
            <Modal visible={create} onClose={setCreate} size="xl" title="Crear usuario">
                <CreateUser close={setCreate} />
            </Modal>
            <Modal visible={show} onClose={setShow}
                size="md" title="Detalles de usuario">
                {user && <UserDetails id={user} />}
            </Modal>
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center" >
                <div className="relative w-full">
                    <h1 className="text-4xl sm:text-5xl text-center font-bold text-gray-400 mb-4 sm:mb-8">Usuarios</h1>
                    <button onClick={() => setCreate(!create)}
                        className="absolute top-0 flex items-center gap-1 btn btn-animated bg-blue-100 dark:bg-gray-600 w-auto px-3 py-2">
                        <p className="text-2xl"><AiOutlineUserAdd /></p>
                        <p className="hidden md:block text-lg">Crear</p>
                    </button>
                </div>
                {data && <Datatable data={data} placeholder="Buscar por nombre, email o rol"
                    popoverTitle="Acciones por usuario" onUpdate={(page, limit) => fetchUsers(page, limit)}
                    onEvent={handleItemEvent} onSearch={(page, limit, search) => fetchUsers(page, limit, search)} />}
            </div>
        </section>
    );
};

export default Users;
