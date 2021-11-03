// Common
import { useEffect, useState } from 'react';
// Data | Services
import { apiInstance } from 'services';
// Others
import { HiOutlineBookmark, HiOutlineAdjustments, HiPencilAlt, HiTrash } from 'react-icons/hi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { errorMessages } from 'utils/data';
import { Modal } from 'components/shared';
import { RiQuestionLine } from 'react-icons/ri';

const Categories = ({ onActive, onCreate, onRefresh, onUpdate }) => {
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [disabled, setDisabled] = useState(true);
    const [info, setInfo] = useState(false);
    const [training, setTraining] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [onRefresh]);

    const fetchCategories = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                setCategories(data);
                if (!active) {
                    setActive(data[0]._id);
                    onActive(data[0]);
                }
            }).catch(console.log);
    };

    const handleActive = (item) => {
        onActive(item);
        setActive(item._id);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const item = categories.filter(e => e._id === result.draggableId)[0];
        if (item.category !== 'CHATBOT') {
            updateStatus({ ...item, isActive: (!item.isActive) });
        }
    };

    const updateStatus = async (body) => {
        const { __v, category, ...other } = body;
        await apiInstance.put(`/category/${body._id}`, other)
            .then(({ data }) => {
                fetchCategories();
            }).catch(console.log);
    };

    const handleDelete = (item) => {
        const del = window.confirm(`Esta a punto de eliminar la categoria: ${item.category}`);
        if (del === true) {
            deleteById(item._id);
        }
    };

    const deleteById = async (id) => {
        await apiInstance.delete(`/category/${id}`)
            .then(() => {
                toast.success(`Se ha eliminado la categoria`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                fetchCategories();
            }).catch(({ response: { data: error } }) => {
                const { customText } = errorMessages.find((e) => e.message === error.message);

                toast.error(customText, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };

    const trainNlp = async () => {
        await apiInstance.post('/nlp/train')
            .then(({ data }) => {
                setTraining(true);
            }).catch(console.log)
    };

    return (
        <>
            <Modal visible={info} onClose={setInfo} size="md" title="Informacion chatot">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4 space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Categoria <span className="font-semibold">'CHATBOT'</span></h4>
                        <p className="leading-4 text-sm">Esta categoria solo puede estar en estado 'Inactivo', para pasar desapercivida en la Landing page</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-medium">Preguntas y respuestas en <span className="font-semibold">'CHATBOT'</span></h4>
                        <p className="leading-4 text-sm">No es posible inhabilitar / habilitar las preguntas ya que...</p>
                    </div>
                    <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                    <div className="text-sm space-y-2 mt-2 text-justify">
                        <p className="leading-4">
                            <span className="font-medium">Boton de entrenamiento: </span> Este boton es solo para uso en caso de no ver reflejados los cambios en el chatbot.
                        </p>
                    </div>
                </div>
            </Modal>

            <div className="flex relative w-full">
                <h1 className="text-3xl sm:text-5xl text-center font-bold text-gray-400 w-full">Categorias</h1>
                <div className="absolute top-2 w-full flex justify-between gap-2">
                    <button onClick={() => onCreate(true)} type="button"
                        className="flex items-center gap-1 btn btn-animated text-lg bg-blue-200 dark:bg-gray-500 w-auto p-3 sm:px-2 sm:py-1">
                        <p><HiOutlineBookmark /></p>
                        <p className="hidden md:block">Crear</p>
                    </button>

                    {/* <button onClick={() => setDisabled((v) => !v)} type="button"
                        className="flex items-center gap-1 btn btn-animated text-lg border-2 dark:border-gray-900 w-auto p-3 sm:px-2 sm:py-1">
                        <p><HiOutlineAdjustments /></p>
                        <p className="hidden md:block">Deshabilitar</p>
                    </button> */}
                    <div className="flex items-center">
                        <button onClick={() => setInfo(true)} className="h-auto transition rounded-full">
                            <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                                <RiQuestionLine />
                            </p>
                        </button>
                        <button type="button" onClick={() => trainNlp()} disabled={training}
                            className="flex items-center gap-1 btn btn-animated text-lg border-2 dark:border-gray-900 w-auto p-3 sm:px-2 sm:py-1">
                            <p><HiOutlineAdjustments /></p>
                            <p className="hidden md:block">{training ? 'Entrenando..' : 'Reentrenar'}</p>
                        </button>
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Droppable droppableId="active">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}
                                className={`${disabled ? 'sm:w-1/2' : 'w-full'} flex flex-col gap-2 bg-blue-100 dark:bg-gray-800 rounded-2xl p-2`}>
                                <h4 className="ml-2 font-semibold text-xl dark:text-gray-300">Activas</h4>
                                <div className="flex flex-wrap relative w-full gap-2">
                                    {categories.map((item, i) => {
                                        const { _id, category, ...other } = item;
                                        return (other.isActive) ?
                                            <Draggable key={_id} draggableId={_id} index={i}>
                                                {(provided) => (<>
                                                    <div key={_id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className={`${active === _id && 'border-blue-400 dark:border-blue-400 text-blue-500 dark:text-blue-300'}
                                                        flex items-center w-auto btn btn-animated bg-white dark:bg-gray-600 border dark:border-gray-900 rounded-xl group overflow-hidden`}>
                                                        <p className="p-2 text-sm truncate" onClick={() => handleActive(item)}>
                                                            {category}
                                                        </p>
                                                        <button type="button" title="Editar" onClick={() => onUpdate(item)}
                                                            className="hidden group-hover:block p-1">
                                                            <HiPencilAlt />
                                                        </button>
                                                        <button type="button" title="Eliminar" onClick={() => handleDelete(item)}
                                                            className="hidden group-hover:block p-1">
                                                            <HiTrash />
                                                        </button>
                                                    </div>
                                                </>)}
                                            </Draggable> : null;
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>

                    {disabled &&
                        <Droppable droppableId="inactive">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}
                                    className="flex flex-col gap-4 border-4 border-dashed dark:border-gray-800 sm:w-1/2 rounded-xl">
                                    <h4 className="ml-2 font-semibold text-xl dark:text-gray-300">Inactivas</h4>
                                    <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center">
                                        {categories.map((item, i) => {
                                            const { _id, category, ...other } = item;
                                            return (!other.isActive) ?
                                                <Draggable key={_id} draggableId={_id} index={i}>
                                                    {(provided) => (
                                                        <div key={_id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                            className="flex items-center cursor-move btn btn-animated w-auto bg-white dark:bg-gray-600 border dark:border-gray-900 rounded-xl group overflow-hidden opacity-60">
                                                            <p className="p-2 text-sm truncate" onClick={() => handleActive(item)}>
                                                                {category}
                                                            </p>
                                                            <button type="button" title="Editar" onClick={() => onUpdate(item)}
                                                                className="hidden group-hover:block p-1">
                                                                <HiPencilAlt />
                                                            </button>
                                                            <button type="button" title="Eliminar" onClick={() => handleDelete(item)}
                                                                className="hidden group-hover:block p-1">
                                                                <HiTrash />
                                                            </button>
                                                        </div>)}
                                                </Draggable> : null;
                                        })}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>}
                </div>
            </DragDropContext>
        </>
    );
};

export default Categories;
