// Common
import { useEffect, useState } from 'react';
// Components
import { Select } from 'components/shared';
// Others
import { apiInstance } from 'services';
import { firstCapitalized, toDate } from 'utils';
import { ticketStatus } from 'utils/data';
import { toast } from 'react-toastify';

const TicketDetails = ({ id, onUpdate, close }) => {
    const [info, setInfo] = useState(null);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState('');

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

    const ticketUpdate = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'))._id;
        await apiInstance.post(`ticket/id/${id}/user/${user}/answer`, { data })
            .then(({ data }) => {
                toast.success('Respuesta asignada correctamente', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
                setData('');
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    return (
        <section className="flex flex-col justify-between h-auto px-6 py-4 bg-gray-50 dark:bg-gray-700 overflow-scroll">
            {info && <>
                <div className="flex gap-6 flex-col sm:flex-row w-full h-full">
                    <div className="w-full sm:w-2/3 mt-2 ml-2">
                        <div className="w-full h-auto overflow-scroll">
                            <h6 className="text-lg font-medium mb-2">{firstCapitalized(info.title)}</h6>
                            <p className="text-gray-600 dark:text-gray-900">{info.description}</p>
                            <div className="border w-full rounded-full dark:border-gray-800 my-2" />
                        </div>
                        <div className="w-full h-1/3">
                            <label htmlFor="answer" className="text-gray-500 text-sm ml-2 mb-1">Agregar una respuesta</label>
                            <div className="flex">
                                <textarea id="answer" rows={2} value={data} onChange={({ target: { value } }) => setData(value)}
                                    className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                                <div className="flex flex-col gap-2 w-auto px-2">
                                    <button onClick={() => ticketUpdate()} disabled={!data}
                                        className="btn p-1 bg-blue-400 rounded-lg disabled:opacity-40">
                                        <p className="text-white text-xs">
                                            Guardar
                                        </p>
                                    </button>
                                    <button onClick={() => close()}
                                        className="btn p-1 border-2 border-gray-200 rounded-lg">
                                        <p className="text-xs">
                                            Cancelar
                                        </p>
                                    </button>
                                </div>
                            </div>
                            {/* <input id="answer" type="text" value={data} onChange={({ target: { value } }) => setData(value)}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" /> */}
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 space-y-4">
                        <div>
                            <label className="text-sm ml-2">Estado</label>
                            <Select array={ticketStatus} labels defaultValue={info.status}
                                buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                                dropdownStyle="bg-white dark:bg-gray-600 dark:text-gray-400 z-20"
                                activeStyle="bg-blue-100 dark:bg-gray-800"
                                onChange={({ value }) => updateStatus(value)} />
                        </div>
                        <div>
                            <label className="text-sm ml-2">Responsable</label>
                            {(users.length > 0) && <Select array={users} labels defaultValue={info.user}
                                buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                                dropdownStyle="bg-white dark:bg-gray-800 text-gray-500 z-20"
                                onChange={({ value }) => reasingUser(value)}
                            />}
                        </div>
                        <div>
                            <label className="text-sm ml-2">Alumno</label>
                            <p className="w-full px-3 py-2 rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500 text-sm">
                                {info.name}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm ml-2">Prioridad</label>
                            <div className="w-full h-8 rounded-xl overflow-hidden text-xs grid grid-cols-3 font-medium">
                                <div className={`${info.priority !== 'LOW' && 'opacity-40'}  flex justify-center items-center bg-green-400 w-full col-span-1 h-full p-1`}>BAJA</div>
                                <div className={`${info.priority !== 'MODERATE' && 'opacity-40'}  flex justify-center items-center bg-yellow-400 w-full col-span-1 h-full p-1`}>MEDIA</div>
                                <div className={`${info.priority !== 'HIGH' && 'opacity-40'} flex justify-center items-center bg-red-400 w-full col-span-1 h-full p-1`}>ALTA</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                <div className="w-full px-4 py-2 text-xs dark:text-gray-400">
                    <p>Creado el: {firstCapitalized(toDate(info.createdAt))}</p>
                    <p>Modificado: {firstCapitalized(toDate(info.updatedAt))}</p>
                </div>
            </>}
        </section>
    );
};

export default TicketDetails;
