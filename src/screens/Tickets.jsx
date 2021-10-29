// Common
import { useState, useEffect } from 'react';
// Compontens
import { Modal } from 'components/shared';
// Data
import { apiInstance } from 'services';
// Others
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TicketDetails } from 'components/admin';
import { firstCapitalized } from 'utils';

const Tickets = () => {
    const [tickets, setTickets] = useState();
    const [details, setDetails] = useState({ data: null, visible: false });
    const { todo, inProgress, done } = tickets ?? { todo: [], inProgress: [], done: [] };

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        // setDetails({ ...details, visible: false });
        await apiInstance.get('/ticket/dashboard')
            .then(({ data }) => {
                setTickets(data);
            }).catch();
    };

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

    return (
        <>
            <Modal visible={details.visible} onClose={(show) => setDetails({ ...details, visible: show })}
                size="2xl" title={`Detalles de ticket (${details.data?._id})`}>
                {details.data && <TicketDetails id={details.data._id} onUpdate={() => fetchTickets()}
                    close={() => setDetails({ ...details, visible: false })} />}
            </Modal>
            <section className="flex flex-col sm:grid grid-cols-3 gap-6">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div className="flex flex-col bg-white shadow-lg dark:bg-gray-700 w-full sm:h-screen max-h-screen rounded-3xl sm:rounded-4xl p-4" >
                                <h2 className="text-4xl font-bold text-gray-400 text-center">To do</h2>
                                <div {...provided.droppableProps} ref={provided.innerRef}
                                    className="space-y-3 mt-6 h-full bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-y-scroll scrollbar-hide">
                                    {todo.map((item, i) => {
                                        return (
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={i}>
                                                {(provided) => (
                                                    <div onClick={() => setDetails({ data: item, visible: true })}
                                                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className="relative flex items-center h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-900 border dark:border-gray-600" >
                                                        <div className={`h-2/3 mr-2 w-0 border ${getBorderColor(item.priority)}`} />
                                                        <div className="h-full w-full">
                                                            <p className="text-sm dark:text-gray-500">
                                                                {firstCapitalized(item.title).substring(0, 50)}
                                                                {item.title.length > 50 ? '...' : ''}
                                                            </p>
                                                            <div className="absolute right-2 bottom-2 text-blue-300 text-xs text-right font-semibold capitalize">
                                                                <p>ID: {item._id ?? '-'}</p>
                                                                <p>Usuario: {item.user?.name ?? 'Esperando asignacion'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="inProgress">
                        {(provided) => (
                            <div className="flex flex-col bg-white shadow-lg dark:bg-gray-700 w-full sm:h-screen rounded-3xl sm:rounded-4xl p-4" >
                                <h2 className="text-4xl font-bold text-gray-400 text-center">In progress</h2>
                                <div  {...provided.droppableProps} ref={provided.innerRef}
                                    className="space-y-3 mt-6 h-full bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-y-scroll scrollbar-hide">
                                    {inProgress.map((item, i) => {
                                        return (
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={i}>
                                                {(provided) => (
                                                    <div onClick={() => setDetails({ data: item, visible: true })}
                                                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className="relative flex items-center h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-900 border dark:border-gray-600" >
                                                        <div className={`h-2/3 mr-2 w-0 border border-${(item.priority === 'HIGH') ? 'red' : (item.priority === 'MODERATE') ? 'yellow' : 'green'}-300`} />
                                                        <div className="h-full w-full">
                                                            <p className="text-sm dark:text-gray-500">{firstCapitalized(item.title)}</p>
                                                            <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{firstCapitalized(item.user.name)} </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="done">
                        {(provided) => (
                            <div className="flex flex-col bg-white shadow-lg dark:bg-gray-700 w-full sm:h-screen rounded-3xl sm:rounded-4xl p-4" >
                                <h2 className="text-4xl font-bold text-gray-400 text-center">Done</h2>
                                <div {...provided.droppableProps} ref={provided.innerRef}
                                    className="space-y-3 mt-6 h-full bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-y-scroll scrollbar-hide">
                                    {done.map((item, i) => {
                                        const disabled = (item.status === 'FINAL_RESOLVE');
                                        return (
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={i}>
                                                {(provided) => (
                                                    <div onClick={() => disabled ? null : setDetails({ data: item, visible: true })} disabled={disabled}
                                                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className="relative flex items-center h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-900 border dark:border-gray-600" >
                                                        <div className={`h-2/3 mr-2 w-0 border border-${(item.priority === 'HIGH') ? 'red' : (item.priority === 'MODERATE') ? 'yellow' : 'green'}-300`} />
                                                        <div className="h-full w-full">
                                                            <p className="text-sm dark:text-gray-500">{firstCapitalized(item.title)}</p>
                                                            <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{firstCapitalized(item.user.name)} </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </section>
        </>
    );
};

export default Tickets;
