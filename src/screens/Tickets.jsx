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

const Tickets = () => {
    const [tickets, setTickets] = useState();
    const [filteredTickets, setFilteredTickets] = useState();
    const [users, setUsers] = useState();
    const [details, setDetails] = useState({ data: null, visible: false });
    // const { todo, inProgress, done } = tickets ?? { todo: [], inProgress: [], done: [] };
    const { todo, inProgress, done } = filteredTickets ?? { todo: [], inProgress: [], done: [] };

    const droppables = [
        { id: 'todo', title: 'Por hacer', array: todo },
        { id: 'inProgress', title: 'En progreso', array: inProgress },
        { id: 'done', title: 'Terminado', array: done },
    ];

    useEffect(() => {
        fetchTickets();
        fetchUsers();
    }, []);

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

    const fetchTickets = async (user) => {
        await apiInstance.get('/ticket/dashboard', { params: { user } })
            .then(({ data }) => {
                setTickets(data);
                setFilteredTickets(data);
            }).catch();
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

    const filterByPriority = (lvl) => {
        if (ticketPriority.filter((e) => e.priority === lvl).length > 0) {
            setFilteredTickets(
                {
                    todo: tickets.todo.filter(e => e.priority === lvl),
                    inProgress: tickets.inProgress.filter(e => e.priority === lvl),
                    done: tickets.done.filter(e => e.priority === lvl),
                }
            );
            return;
        }
        setFilteredTickets({ ...tickets });
    };

    return (
        <>
            <Modal visible={details.visible} onClose={(show) => setDetails({ ...details, visible: show })}
                size="2xl" title={`Detalles de ticket (${details.data?._id})`}>
                {details.data && <TicketDetails id={details.data._id} onUpdate={() => fetchTickets()}
                    close={() => setDetails({ ...details, visible: false })} />}
            </Modal>
            <section className="flex flex-col sm:grid grid-cols-3 gap-6">
                <div className="flex flex-wrap gap-4 col-span-3 bg-white dark:bg-gray-700 rounded-2xl p-4">
                    <div className="sm:w-1/4">
                        <label htmlFor="" className="text-sm ml-2 dark:text-gray-400">Usuario</label>
                        {users && <Select labels array={[{ label: 'Todos', value: null }, ...users]} onChange={({ value }) => fetchTickets(value)}
                            activeStyle="bg-blue-100 dark:bg-gray-800" parentStyle="z-10"
                            buttonStyle="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-800 dark:text-gray-500 capitalize"
                            dropdownStyle="bg-white dark:bg-gray-700 dark:text-gray-500" />}
                    </div>
                    <div className="sm:w-1/4">
                        <label htmlFor="" className="text-sm ml-2 dark:text-gray-400">Prioridad</label>
                        <Select array={['TODAS', 'LOW', 'MODERATE', 'HIGH']} onChange={(value) => filterByPriority(value)}
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
                                        {array.map((item, i) =>
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
                                                                <p>ID: {item._id ?? '-'}</p>
                                                                <p>Usuario: {item.user?.name ?? 'Esperando asignacion'}</p>
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
