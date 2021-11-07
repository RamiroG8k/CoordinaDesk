// Common
import { useEffect, useState } from 'react';
// Components
import { Datatable, Modal } from 'components/shared';
import { CreateUser, UserDetails } from 'components/admin';
// Services | Data
import { apiInstance } from 'services';
import { errorMessages, userActions } from 'utils/data';
// Others
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CgDanger } from 'react-icons/cg';
import { toast } from 'react-toastify';

const Users = () => {
    const [data, setData] = useState();
    const [create, setCreate] = useState(false);
    const [confirm, setConfirm] = useState({ display: false, user: null });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);

    const [regsLimit, setRegsLimit] = useState(10);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (page, limit, search) => {
        setRegsLimit(limit);
        await apiInstance.get('/user/all/pageable',
            { params: { page, limit: regsLimit, name: search, email: search, role: search } })
            .then((response) => {
                const { data: res } = response;
                if (response.status === 204) {
                    setData((actual) => ({
                        ...actual,
                        rows: [],
                        columns: [],
                    }));
                    return;
                }
                setData({
                    rows: userParser(res.content),
                    columns: Object.keys(userParser(res.content)[0]).slice(1),
                    actions: userActions,
                    pagination: {
                        total: res.totalElements,
                        from: res.page > 1 ? (((res.page - 1) * limit ?? regsLimit) + 1) : 1,
                        to: (limit ?? regsLimit * res.page) > res.totalElements ? res.totalElements : (limit ?? regsLimit * res.page),
                        current: res.page,
                        last: res.pages,
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
            case 'details':
                setShow(true);
                setUser(item._id);
                break;
            case 'deactivate':
                deactivateUser(item._id);
                break;
            case 'delete':
                setConfirm({ display: true, user: item });
                // deleteUser(item._id);
                break;
            case 'resend-email':
                reSendEmailUser(item)
                break;
            default:
                break;
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        await apiInstance.delete(`/user/${id}/delete`)
            .then(({ data }) => {
                toast.success(`Se ha eliminado el usuario correctamente`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                fetchUsers();
            }).catch(({ response: { data: error } }) => {
                const { customText } = errorMessages.find((e) => e.message === error.message);

                toast.error(customText, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
        await setLoading(false);
        await setConfirm({ display: false, category: null });
    };

    const deactivateUser = async (id) => {
        await apiInstance.delete(`/user/${id}`)
            .then(({ data }) => {
                toast.success(`Se ha desactivado el usuario correctamente`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                fetchUsers();
            }).catch(({ response: { data: error } }) => {
                const { customText } = errorMessages.find((e) => e.message === error.message);

                toast.error(customText, {
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
            <Modal visible={confirm.display} onClose={() => setConfirm({ ...confirm, display: false })} size="md" title="Eliminar categoría">
                <>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4 space-y-4">
                        <div className="flex gap-6">
                            <div className="flex justify-center items-center bg-red-200 rounded-full h-12 w-12">
                                <p className="text-4xl text-red-400">
                                    <CgDanger />
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg leading-5">Estas a punto de eliminar el usuario: </h5>
                                <p className="leading-6 font-medium">
                                    {confirm.user?.nombre}
                                </p>
                                <p>Con el rol: <span className="font-medium">{confirm.user?.rol}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                        <button disabled={loading} onClick={() => deleteUser(confirm.user._id)}
                            className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red-400 dark:bg-red-600  hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:w-auto transition" >
                            {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>}
                            <p className="text-white text-base sm:text-sm font-medium">
                                {loading ? 'Eliminando...' : 'Eliminar'}
                            </p>
                        </button>
                        <button type="button" onClick={() => setConfirm({ ...confirm, display: false })}
                            className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto transition" >
                            <p className="text-gray-700 dark:text-white text-base sm:text-sm font-medium">Cerrar</p>
                        </button>
                    </div>
                </>
            </Modal>
            <Modal visible={create} onClose={setCreate} size="xl" title="Crear usuario">
                <CreateUser close={() => setCreate(false)} onCreate={() => fetchUsers()} />
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
                    popoverTitle="Acciones por usuario" onUpdate={(page, limit, search) => fetchUsers(page, limit, search)}
                    onEvent={handleItemEvent} onSearch={(page, limit, search) => fetchUsers(page, limit, search)} />}
            </div>
        </section>
    );
};

export default Users;
