// Common
import { useState, useEffect } from 'react';
// Others
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Data
import { apiInstance } from 'services';

const Tickets = () => {
    const [tickets, setTickets] = useState();
    const { todo, inProgress, done } = tickets ?? { todo: [], inProgress: [], done: [] };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        await apiInstance.get('/ticket/dashboard')
            .then(({ data }) => {
                setTickets(data);
            })
            .catch();
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        console.log(result);
        // const [reorderedItem] = tickets.splice(result.source.index, 1);
        // tickets.splice(result.destination.index, 0, reorderedItem);
        // tickets.map((e, index) => e.position = index + 1);

    };

    return (
        <section className="flex flex-col sm:grid grid-cols-3 gap-6">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-3xl sm:rounded-4xl p-4" >
                            <h2 className="text-4xl font-bold text-gray-400 text-center">To do</h2>
                            <div {...provided.droppableProps} ref={provided.innerRef}
                                className="flex flex-col space-y-3 mt-6">
                                {todo.map(({ status, title }, i) => {
                                    return (
                                        <Draggable key={title} draggableId={title} index={i}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className="relative h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-600" >
                                                    <p className="text-sm dark:text-gray-500">{title}</p>
                                                    <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{status}</span>
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
                                {inProgress.map(({ status, title }, i) => {
                                    return (
                                        <Draggable key={title} draggableId={title} index={i}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className="relative h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 border" >
                                                    <p className="text-sm">{title}</p>
                                                    <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{status}</span>
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
                                {done.map(({ status, title }, i) => {
                                    return (
                                        <Draggable key={title} draggableId={title} index={i}>
                                            {(provided) => (
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className="relative h-16 sm:h-20 w-full p-2 rounded-2xl bg-gray-50 border" >
                                                    <p className="text-sm">{title}</p>
                                                    <span className="absolute right-2 bottom-2 text-blue-300 text-xs font-semibold" >{status}</span>
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
    );
};

export default Tickets;
