// Common
import { useState, useEffect } from 'react';
// Compontens
import { Modal, Select } from 'components/shared';
// Data
import { apiInstance } from 'services';
// Others
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TicketDetails } from 'components/admin';
import { firstCapitalized } from 'utils';
import { ticketPriority } from 'utils/data';
import { RiQuestionLine } from 'react-icons/ri';

const Tickets = () => {
    const [tickets, setTickets] = useState();
    const [filteredTickets, setFilteredTickets] = useState();
    const [users, setUsers] = useState();
    const [details, setDetails] = useState({ data: null, visible: false });
    const [filters, setFilters] = useState({ user: null, priority: null })
    const [modal, setModal] = useState(false);

    const { todo, inProgress, done } = filteredTickets ?? { todo: [], inProgress: [], done: [] };

    const droppables = [
        { id: 'todo', title: 'Por hacer', array: todo },
        { id: 'inProgress', title: 'En progreso', array: inProgress },
        { id: 'done', title: 'Terminado', array: done },
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [filters]);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        let status = '';
        switch (result.destination.droppableId) {
            case 'todo':
                status = 'ASIGNED';
                break;
            case 'inProgress':
                status = 'IN_PROGRESS';
                break;
            case 'done':
                status = 'RESOLVE';
                break;
            default: break;
        };
        changeStatus(result.draggableId, status);
    };

    const fetchTickets = async () => {
        await apiInstance.get('/ticket/dashboard', { params: { user: filters.user } })
            .then(async ({ data }) => {
                setTickets(data);
                setFilteredTickets(data);

                if (filters.priority) {
                    filterByPriority(data, filters.priority);
                }
            }).catch(console.log);
    };

    const fetchUsers = async () => {
        await apiInstance.get('/user/all')
            .then(({ data }) => {
                setUsers(data.map((user) => (
                    {
                        label: user.name,
                        value: user._id
                    }
                )));
            }).catch(console.log);
    };

    const changeStatus = async (id, status) => {
        await apiInstance.patch(`/ticket/id/${id}/change-status`, { status })
            .then(({ data }) => {
                fetchTickets();
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            })
    };

    const getBorderColor = (priority) => {
        switch (priority) {
            case 'LOW': return 'border-green-300';
            case 'MODERATE': return 'border-yellow-300';
            case 'HIGH': return 'border-red-300';
            default: return 'max-w-sm';
        }
    };

    const filterByPriority = (data, lvl) => {
        if (ticketPriority.filter((e) => e.priority === lvl).length > 0) {
            setFilteredTickets(
                {
                    todo: data.todo.filter(e => e.priority === lvl),
                    inProgress: data.inProgress.filter(e => e.priority === lvl),
                    done: data.done.filter(e => e.priority === lvl),
                }
            );
            return;
        }
        setFilteredTickets({ ...data });
    };

    return (
        <>
            <Modal visible={modal} onClose={setModal} size="md" title="Informacion">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4">
                    <h4 className="font-medium text-xl mb-2">Estados del ticket</h4>
                    <ul className="space-y-4">
                        <li className="leading-5">
                            <span className="font-medium">ESPERANDO ASIGNACIÓN: </span>
                            El ticket está esperando a ser asignado
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">ASIGNADO: </span>
                            El ticket se ha asignado
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">EN PROGRESO: </span>El ticket está siendo evaluado
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">ESPERANDO RESPUESTA: </span>
                            Esperamos que nos des una respuesta del ticket
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">RESUELTO: </span>
                            Se ha marcado el ticket como resuelto, se puede volver a abrir si quedan dudas
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">FINALIZADO: </span>
                            El ticket se le ha dado una respuesta final, no se puede volver a abrir
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">CERRADO POR INACTIVIDAD: </span>
                            El ticket se ha cerrado por inactividad
                        </li>
                    </ul>
                    <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                    <div className="text-sm space-y-2 mt-2 text-justify">
                        <p className="leading-4">
                            Si un ticket no es usado, contestado o actualizado por más de 5 días, este se deshabilitará automáticamente.
                        </p>
                        <p className="leading-4">
                            Si un ticket con estatus <span className="font-medium">RESOLVE O FINAL_RESOLVE, </span>llevan más de 2 días sin ningúna modificación, se desactiva automáticamente.
                        </p>
                    </div>
                </div>
            </Modal>

            <Modal visible={details.visible} onClose={(show) => setDetails({ ...details, visible: show })}
                size="5xl" title={`Detalles de ticket (${details.data?._id})`}>
                {details.data && <TicketDetails id={details.data._id} onUpdate={() => fetchTickets()}
                    close={() => setDetails({ ...details, visible: false })} />}
            </Modal>
            <section className="flex flex-col sm:grid grid-cols-3 gap-6">
                <div className="flex justify-between sm:justify-around items-center gap-4 col-span-3 bg-white dark:bg-gray-700 rounded-2xl p-4">
                    <div className="sm:w-1/3">
                        <label htmlFor="" className="text-sm ml-2 dark:text-gray-400">Usuario</label>
                        {users && <Select labels array={[{ label: 'Todos', value: null }, ...users]}
                            onChange={({ value }) => setFilters((filters) => ({ ...filters, user: value }))}
                            activeStyle="bg-blue-100 dark:bg-gray-800" parentStyle="z-10"
                            buttonStyle="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-800 dark:text-gray-500 capitalize"
                            dropdownStyle="bg-white dark:bg-gray-700 dark:text-gray-500" />}
                    </div>
                    <button onClick={() => setModal(true)} className="h-auto transition rounded-full">
                        <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                            <RiQuestionLine />
                        </p>
                    </button>
                    <div className="sm:w-1/3">
                        <label htmlFor="" className="text-sm ml-2 dark:text-gray-400">Prioridad</label>
                        <Select array={['TODAS', 'LOW', 'MODERATE', 'HIGH']}
                            onChange={(value) => setFilters((filters) => ({ ...filters, priority: value }))}
                            activeStyle="bg-blue-100 dark:bg-gray-800" parentStyle="z-10"
                            buttonStyle="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-800 dark:text-gray-500"
                            dropdownStyle="bg-white dark:bg-gray-700 dark:text-gray-500" />
                    </div>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    {droppables.map(({ id, title, array }) =>
                        <Droppable key={id} droppableId={id}>
                            {(provided) => (
                                <div className="flex flex-col bg-white shadow-lg dark:bg-gray-700 w-full sm:h-screen max-h-screen rounded-3xl sm:rounded-4xl p-4" >
                                    <h2 className="text-3xl font-bold text-gray-400 text-center">{title}</h2>
                                    <div {...provided.droppableProps} ref={provided.innerRef}
                                        className="space-y-3 mt-6 h-full bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-y-scroll scrollbar-hide">
                                        {array?.map((item, i) =>
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={i}>
                                                {(provided) => (
                                                    <div onClick={() => setDetails({ data: item, visible: true })}
                                                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className="relative flex items-center h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-900 border dark:border-gray-600" >
                                                        <div className={`h-2/3 mr-2 w-0 border ${getBorderColor(item.priority)}`} />
                                                        <div className="h-full w-full">
                                                            <p className="text-sm dark:text-gray-400">
                                                                {firstCapitalized(item.title).substring(0, 50)}
                                                                {item.title.length > 50 ? '...' : ''}
                                                            </p>
                                                            <div className="absolute right-2 bottom-2 text-blue-300 dark:text-opacity-60 text-xs text-right font-semibold capitalize">
                                                                <p>{item._id ?? '-'}</p>
                                                                <p>{item.user?.name ?? 'Esperando asignacion'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    )}
                </DragDropContext>
            </section>
        </>
    );
};

export default Tickets;
