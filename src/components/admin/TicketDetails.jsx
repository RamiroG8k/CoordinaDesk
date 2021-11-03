// Common
import { useEffect, useState } from 'react';
// Components
import { Select } from 'components/shared';
// Others
import { apiInstance } from 'services';
import { firstCapitalized, toDate } from 'utils';
import { ticketPriority, ticketStatus } from 'utils/data';
import { toast } from 'react-toastify';
import ScrollableFeed from 'react-scrollable-feed';

const TicketDetails = ({ id, onUpdate, close, disabled = false }) => {
    const [info, setInfo] = useState(null);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState('');
    const [deactivate, setDeactivate] = useState(false);

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

    const reasingUser = async (user) => {
        await apiInstance.patch(`/ticket/id/${id}/reasign-user/${user}`)
            .then(({ data }) => {
                onUpdate();
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const ticketUpdate = async () => {
        const user = JSON.parse(localStorage.getItem('user'))._id;
        await apiInstance.post(`ticket/id/${id}/user/${user}/answer`, { data })
            .then(({ data }) => {
                setData('');
                fetchTicketDetails(id);
                toast.success('Respuesta asignada correctamente', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
                onUpdate();
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const deactivateManually = async () => {
        await apiInstance.patch(`/ticket/deactivate/id/${id}`)
            .then(({ data }) => {
                close();
                toast.success('Ticket deshabilitado correctamente', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
                onUpdate();
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const priorityHandler = async (priority) => {
        await apiInstance.patch(`/ticket/id/${id}/change-priority`, { priority })
            .then(({ data }) => {
                onUpdate();
                fetchTicketDetails(id);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    return (
        <section className="flex flex-col justify-between h-auto px-6 py-4 bg-gray-50 dark:bg-gray-700 overflow-scroll">
            {info && <>
                <div className="flex gap-6 flex-col sm:flex-row w-full h-full">
                    <div className="w-full sm:w-2/3 mt-2 ml-2">
                        <h6 className="text-lg font-medium mb-2">{firstCapitalized(info.title)}</h6>
                        <div className="w-full h-auto max-h-96">
                            <ScrollableFeed className="mb-2">
                                <p className="text-gray-600 dark:text-gray-900">{info.description}</p>
                                {(info.ticketContent.length > 0) && <>

                                    <div className="border w-full rounded-full dark:border-gray-800 my-2" />

                                    <div className="flex flex-col gap-2">
                                        {info.ticketContent.map((e, i) => {
                                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                                            return (
                                                <div key={e.created_at}
                                                    className={`${e.isUser ? 'text-right' : ''} w-full text-sm leading-4 overflow-y-scroll`}>
                                                    <p className="font-semibold">{e.username}</p>

                                                    <div className={`flex ${e.isUser ? 'text-right justify-end' : 'text-left'}`}>
                                                        <p className="break-words w-3/4">{e.data}</p>
                                                    </div>

                                                    <span className="text-xs text-gray-500">
                                                        {new Date(e.created_at).toLocaleDateString('es-MX', options)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>}
                                <div className="border w-full rounded-full dark:border-gray-800 my-2" />
                            </ScrollableFeed>
                        </div>
                        <div className="w-full h-1/3">
                            <label htmlFor="answer" className="text-gray-500 text-sm ml-2 mb-1">Agregar una respuesta</label>
                            <div className="flex">
                                <textarea id="answer" rows={2} value={data} disabled={disabled || info.status === 'FINAL_RESOLVE'}
                                    onChange={({ target: { value } }) => setData(value)} maxLength={1000}
                                    className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-600" />
                                <div className="flex flex-col gap-2 w-auto px-2">
                                    <button onClick={() => ticketUpdate()} disabled={!data || disabled || info.status === 'FINAL_RESOLVE'}
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
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 space-y-4">
                        <div>
                            <label className="text-sm ml-2">Estado</label>
                            <Select array={[ticketStatus[1], ticketStatus[2], ticketStatus[4]]} labels defaultValue={info.status} disabled={disabled || info.status === 'FINAL_RESOLVE'}
                                buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                                dropdownStyle="bg-white dark:bg-gray-600 dark:text-gray-400 z-20"
                                activeStyle="bg-blue-100 dark:bg-gray-800"
                                onChange={({ value }) => updateStatus(value)} />
                        </div>
                        <div>
                            <label className="text-sm ml-2">Responsable</label>
                            {(users.length > 0) && <Select array={users} labels defaultValue={info.user} disabled={disabled || info.status === 'FINAL_RESOLVE'}
                                buttonStyle="w-full rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500"
                                dropdownStyle="bg-white dark:bg-gray-800 text-gray-500 z-20"
                                onChange={({ value }) => reasingUser(value)}
                            />}
                        </div>
                        <div>
                            <label className="text-sm ml-2">Alumno</label>
                            <div className="flex flex-col w-full px-3 py-2 gap-1 rounded-xl bg-blue-100 dark:bg-gray-800 text-gray-500 text-xs">
                                <p><strong className="font-medium">Nombre: </strong>{info.name}</p>
                                <p><strong className="font-medium">Código: </strong>{info.udgId}</p>
                                {info.phone && <p><strong className="font-medium">Teléfono: </strong>{info.phone}</p>}
                                <p><strong className="font-medium">Email: </strong>{info.email}</p>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm ml-2">Prioridad</label>
                            <div className="w-full h-8 rounded-xl overflow-hidden text-xs grid grid-cols-3 font-medium">
                                {ticketPriority.map((button) => {
                                    const bg = button.color === 'green' ? 'bg-green-400' : button.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400';
                                    return (
                                        <button key={button.priority} disabled={disabled || info.status === 'FINAL_RESOLVE'}
                                            onClick={() => priorityHandler(button.priority)}
                                            className={`${(info.priority !== button.priority) && 'opacity-40'} flex justify-center items-center ${bg} w-full col-span-1 h-full p-1`}>
                                            {button.label}
                                        </button>
                                    );
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                <div className="flex flex-col sm:flex-row justify-between w-full py-2 text-xs dark:text-gray-400">
                    <div>
                        <p>Creado el: {firstCapitalized(toDate(info.createdAt))}</p>
                        <p>Modificado: {firstCapitalized(toDate(info.updatedAt))}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                        {deactivate && <>
                            <p className="text-base dark:text-white">Seguro?</p>
                            <button onClick={() => setDeactivate(false)}
                                className="btn outline-none border-2 border-gray-300 bg-gray-100 px-2 py-1 transition-all">
                                <p className="text-sm">Cancelar</p>
                            </button>
                        </>}
                        <button onClick={() => deactivate ? deactivateManually() : setDeactivate(true)}
                            disabled={disabled || info.status === 'FINAL_RESOLVE'}
                            className="btn outline-none border-2 border-red-400 px-2 py-1 hover:bg-red-300 transition-all">
                            <p className="text-sm hover:text-white">Deshabilitar</p>
                        </button>
                    </div>
                </div>
            </>}
        </section>
    );
};

export default TicketDetails;
