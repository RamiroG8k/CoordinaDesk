// Common
import { useState, useEffect } from 'react';
// Compontens
import { Modal } from 'components/shared';
// Others
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Data
import { apiInstance } from 'services';

const Tickets = () => {
    const [tickets, setTickets] = useState();
    const [details, setDetails] = useState({ data: null, visible: false });
    const { todo, inProgress, done } = tickets ?? { todo: [], inProgress: [], done: [] };

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        await apiInstance.get('/ticket/dashboard')
            .then(({ data }) => {
                setTickets(data);
            })
            .catch();
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        let status = '';
        switch (result.destination.droppableId) {
            case 'todo':
                status = 'ASIGNED';
                // Get from where
                // Find and remove from there
                // setTickets({ ...tickets, todo: [...tickets.todo, { _id: result.destination.droppableId} ] })
                break;
            case 'inProgress':
                status = 'IN_PROGRESS';
                break;
            case 'done':
                status = 'RESOLVE';
                break;

            default: break;
        };

        // const [reorderedItem] = tickets.splice(result.source.index, 1);
        // tickets.splice(result.destination.index, 0, reorderedItem);
        // tickets.map((e, index) => e.position = index + 1);

        changeStatus(result.draggableId, status);
    };

    const changeStatus = async (id, status) => {
        await apiInstance.patch(`/ticket/id/${id}/change-status`, { status })
            .then(({ data }) => {
                console.log(data);
                fetchTickets();
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            })
    };

    return (
        <>
            <Modal visible={details.visible} toggle={(show) => setDetails({ ...details, visible: show })}
                size="xl" title="Detalles de ticket">
                <div className="px-6 py-4 text-xs">
                    <pre>{JSON.stringify(details.data, null, 4)}</pre>
                </div>
            </Modal>
            <section className="flex flex-col sm:grid grid-cols-3 gap-6">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-3xl sm:rounded-4xl p-4" >
                                <h2 className="text-4xl font-bold text-gray-400 text-center">To do</h2>
                                <div {...provided.droppableProps} ref={provided.innerRef}
                                    className="flex flex-col space-y-3 mt-6">
                                    {todo.map((item, i) => {
                                        return (
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={i}>
                                                {(provided) => (
                                                    <div onClick={() => setDetails({ data: item, visible: true })}
                                                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className="relative flex items-center h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-600" >
                                                        <div className={`h-2/3 mr-2 w-0 border border-${item.priority === 'HIGH' ? 'red' : 'green'}-300`} />
                                                        <div className="h-full w-full">
                                                            <p className="text-sm dark:text-gray-500">{item.title}</p>
                                                            <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{item.status} </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="inProgress">
                        {(provided) => (
                            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-3xl sm:rounded-4xl p-4" >
                                <h2 className="text-4xl font-bold text-gray-400 text-center">In progress</h2>
                                <div  {...provided.droppableProps} ref={provided.innerRef}
                                    className="flex flex-col space-y-3 mt-6">
                                    {inProgress.map((item, i) => {
                                        return (
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={i}>
                                                {(provided) => (
                                                    <div onClick={() => setDetails({ data: item, visible: true })}
                                                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className="relative flex items-center h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-600" >
                                                        <div className={`h-2/3 mr-2 w-0 border border-${item.priority === 'HIGH' ? 'red' : 'green'}-300`} />
                                                        <div className="h-full w-full">
                                                            <p className="text-sm dark:text-gray-500">{item.title}</p>
                                                            <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{item.status} </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="done">
                        {(provided) => (
                            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-3xl sm:rounded-4xl p-4" >
                                <h2 className="text-4xl font-bold text-gray-400 text-center">Done</h2>

                                <div {...provided.droppableProps} ref={provided.innerRef}
                                    className="flex flex-col space-y-3 mt-6">
                                    {done.map((item, i) => {
                                        return (
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={i}>
                                                {(provided) => (
                                                    <div onClick={() => setDetails({ data: item, visible: true })}
                                                        {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className="relative flex items-center h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-600" >
                                                        <div className={`h-2/3 mr-2 w-0 border border-${item.priority === 'HIGH' ? 'red' : 'green'}-300`} />
                                                        <div className="h-full w-full">
                                                            <p className="text-sm dark:text-gray-500">{item.title}</p>
                                                            <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{item.status} </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </section>
        </>
    );
};

export default Tickets;
