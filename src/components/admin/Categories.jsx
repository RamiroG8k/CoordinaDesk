// Common
import { useEffect, useState } from 'react';
// Data | Services
import { apiInstance } from 'services';
// Others
import { HiOutlineDotsVertical, HiOutlineBookmark, HiOutlineAdjustments } from 'react-icons/hi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Categories = ({ onActive }) => {
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                setCategories(data);
            }).catch(console.log);
    };

    const handleActive = (item) => {
        onActive(item);
        setActive(item._id);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        console.log(result);
    };

    return (
        <>
            <div className="flex relative w-full">
                <h1 className="text-3xl sm:text-5xl text-center font-bold text-gray-400 w-full">Categorias</h1>
                <div className="absolute top-2 w-full flex justify-between gap-2">
                    <button onClick={() => console.log(false)} type="button"
                        className="flex items-center gap-1 btn btn-animated text-lg bg-blue-200 dark:bg-gray-500 w-auto p-3 sm:px-2 sm:py-1">
                        <p><HiOutlineBookmark /></p>
                        <p className="hidden md:block">Crear</p>
                    </button>

                    <button onClick={() => setDisabled((v) => !v)} type="button"
                        className="flex items-center gap-1 btn btn-animated text-lg border-2 dark:border-gray-900 w-auto p-3 sm:px-2 sm:py-1">
                        <p><HiOutlineAdjustments /></p>
                        <p className="hidden md:block">Deshabilitar</p>
                    </button>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Droppable droppableId="active">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}
                                className={`${disabled ? 'sm:w-1/2' : 'w-full'} flex flex-col gap-2 bg-blue-100 dark:bg-gray-800 rounded-2xl p-2`}>
                                <h4 className="ml-2 font-semibold text-xl dark:text-gray-300">Activas</h4>
                                <div className="flex flex-wrap gap-x-3 gap-y-2">
                                    {categories.map((item, i) => {
                                        const { _id, category, ...other } = item;
                                        return (other.isActive) ?
                                            <Draggable key={_id} draggableId={_id} index={i}>
                                                {(provided) => (
                                                    <div key={_id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                        className={`${active === _id && 'border-blue-400 dark:border-blue-400 text-blue-500 dark:text-blue-300'}
                                                        flex items-center btn btn-animated w-auto bg-white dark:bg-gray-600 border dark:border-gray-900 rounded-xl group overflow-hidden`}>
                                                        <p className="p-2 text-sm" onClick={() => handleActive(item)}>
                                                            {category}
                                                        </p>
                                                        <button type="button" className="hidden group-hover:block p-1 transition-all">
                                                            <HiOutlineDotsVertical />
                                                        </button>
                                                    </div>)}
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
                                    className="flex flex-col gap-4 border-4 border-dashed sm:w-1/2 rounded-xl">
                                    <h4 className="ml-2 font-semibold text-xl dark:text-gray-300">Inactivas</h4>
                                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                                        {categories.map(({ _id, category, ...other }, i) => {
                                            return (!other.isActive) ?
                                                <Draggable key={_id} draggableId={_id} index={i}>
                                                    {(provided) => (
                                                        <div key={_id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                                            className="flex items-center cursor-move btn btn-animated w-auto bg-white dark:bg-gray-600 border dark:border-gray-900 rounded-xl group overflow-hidden opacity-60">
                                                            <p className="p-2 text-sm">
                                                                {category}
                                                            </p>
                                                            <button type="button" className="hidden group-hover:block p-1 transition-all">
                                                                <HiOutlineDotsVertical />
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
