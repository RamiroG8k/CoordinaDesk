// Common
import { useEffect, useState } from 'react';
// Components
import { Switch, Modal } from 'components/shared';
// Data | Services
import { apiInstance } from 'services';
// Others
import { toast } from 'react-toastify';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { CgDanger } from 'react-icons/cg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Questions = ({ selected, onCreate, onRefresh, onUpdate }) => {
    const { _id: category } = selected ?? {};
    const [confirm, setConfirm] = useState({ display: false, question: null });
    const [loading, setLoading] = useState(false);
    const [activeFaqs, setActiveFaqs] = useState([]);
    const [inactiveFaqs, setInactiveFaqs] = useState([]);

    useEffect(() => {
        if (category) {
            fetchQuestionsById(category);
        }
    }, [category, onRefresh]);

    const fetchQuestionsById = async (id) => {
        await apiInstance.get(`/faq/category/${id}`)
            .then(({ data }) => {
                setActiveFaqs(sortByPosition(data.filter(f => f.isActive)) ?? []);
                setInactiveFaqs(sortByPosition(data.filter(f => !f.isActive)) ?? []);
            }).catch(console.log);
    };

    const sortByPosition = (array) => {
        return array.sort((a, b) => {
            return a.order > b.order ? 1 : -1;
        });
    };

    const deleteById = async (id) => {
        setLoading(true);
        await apiInstance.delete(`/faq/${id}`)
            .then(() => {
                toast.success(`Se ha eliminado la pregunta`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                fetchQuestionsById(category);
            }).catch(console.log);
        await setLoading(false);
        await setConfirm({ display: false, category: null });
    };

    const statusHandler = async (body) => {
        body.category = selected._id;
        await apiInstance.put(`/faq/${body._id}`, { ...body, isActive: !body.isActive })
            .then(({ data }) => {
                fetchQuestionsById(category);
                toast.success('Pregunta modificada satisfactoriamente', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(console.log);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(activeFaqs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        items.map((e, index) => e.position = index + 1);
        
        reorderItem(result.draggableId, (result.destination.index));
        setActiveFaqs(items);
    };

    const reorderItem = async (id, position) => {
        await apiInstance.patch(`/faq/${id}/reorder/${position}`)
            .then(({ data }) => {
                console.log(data);
                fetchQuestionsById(category);
            }).catch(console.log);
    };

    return (
        <>
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
                                <h5 className="text-lg leading-5">Estas a punto de eliminar la pregunta: </h5>
                                <p className="leading-6 font-medium">
                                    {confirm.question?.question}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                        <button disabled={loading} onClick={() => deleteById(confirm.question._id)}
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
            <div className="flex relative w-full">
                <h1 className="text-3xl sm:text-5xl text-center font-bold text-gray-400 w-full">Preguntas</h1>
            </div>

            <button onClick={() => onCreate(true)}
                className={`flex items-center btn border-2 border-dashed dark:border-gray-800 rounded-xl group overflow-hidden`}>
                <p className="p-2 text-center w-full">Nueva pregunta</p>
            </button>

            <div className="space-y-2">
                <h4 className="ml-2 font-semibold text-2xl dark:text-gray-300">Activas</h4>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="faqs">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2">
                                {(activeFaqs.length > 0) && activeFaqs.map((item, i) => {
                                    const { _id, question, answer, ...other } = item;
                                    return other.isActive ? (
                                        <Draggable key={_id} draggableId={_id} index={i}>
                                            {(provided) => (<>
                                                <div key={_id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                    className="flex justify-between items-center btn bg-blue-100 dark:bg-gray-600 rounded-xl group overflow-hidden">
                                                    <p className="px-3 py-2">
                                                        {question}
                                                    </p>
                                                    <div className="flex items-center gap-1">
                                                        {(selected.category !== 'CHATBOT') &&
                                                            <div className="flex items-center h-full">
                                                                <label htmlFor="" className="hidden group-hover:block text-xs">
                                                                    {other.isActive ? 'Deshabilitar' : 'Habilitar'}
                                                                </label>
                                                                <Switch value={item.isActive} onChange={() => statusHandler(item)}
                                                                    className="hidden group-hover:flex p-2" title="Habilitar" />
                                                            </div>}
                                                        <button type="button" title="Editar" onClick={() => onUpdate(item)}
                                                            className="hidden group-hover:block p-2 text-2xl">
                                                            <HiPencilAlt />
                                                        </button>
                                                        <button type="button" title="Eliminar" onClick={() => setConfirm({ display: true, question: item })}
                                                            className="hidden group-hover:block p-2 text-2xl">
                                                            <HiTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </>)}
                                        </Draggable>) : null;
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="ml-2 font-semibold text-2xl dark:text-gray-300">Inactivas</h4>
                {(inactiveFaqs.length > 0) && inactiveFaqs.map((item) => {
                    const { _id, question, answer, ...other } = item;
                    return (!other.isActive) ? (
                        <div key={_id}
                            className="flex justify-between items-center btn bg-blue-100 dark:bg-gray-600 rounded-xl group overflow-hidden opacity-60">
                            <p className="px-3 py-2">
                                {question}
                            </p>
                            <div className="flex items-center gap-1">
                                {(selected.category !== 'CHATBOT') &&
                                    <div className="flex items-center h-full">
                                        <label htmlFor="" className="hidden group-hover:block text-xs">
                                            {other.isActive ? 'Deshabilitar' : 'Habilitar'}
                                        </label>
                                        <Switch value={item.isActive} onChange={() => statusHandler(item)}
                                            className="hidden group-hover:flex p-2" title="Habilitar" />
                                    </div>}
                                <button type="button" title="Editar" onClick={() => onUpdate(item)}
                                    className="hidden group-hover:block p-2 text-2xl">
                                    <HiPencilAlt />
                                </button>
                                <button type="button" title="Eliminar" onClick={() => setConfirm({ display: true, question: item })}
                                    className="hidden group-hover:block p-2 text-2xl">
                                    <HiTrash />
                                </button>
                            </div>
                        </div>) : null;
                })}
            </div>
        </>
    );
};

export default Questions;
