// Common
import { useEffect, useState } from 'react';
// Data | Services
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { apiInstance } from 'services';
import { toast } from 'react-toastify';
import { Switch } from 'components/shared';

const Questions = ({ selected, onCreate, onRefresh, onUpdate }) => {
    const { _id: category } = selected ?? {};
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        if (category) {
            fetchQuestionsById(category);
        }
    }, [category, onRefresh]);

    const fetchQuestionsById = async (id) => {
        await apiInstance.get(`/faq/category/${id}`)
            .then(({ data }) => {
                setFaqs(data ?? []);
            }).catch(console.log);
    };

    const handleDelete = (item) => {
        console.table(item);
        const del = window.confirm(`Esta a punto de eliminar la pregunta: ${item.question}`);
        if (del === true) {
            deleteById(item._id);
        }
    };

    const deleteById = async (id) => {
        await apiInstance.delete(`/faq/${id}`)
            .then(() => {
                toast.success(`Se ha eliminado la pregunta`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                fetchQuestionsById(category);
            }).catch(console.log);
    };

    const statusHandler = async (body) => {
        await apiInstance.put(`/faq/${body._id}`, { ...body, isActive: !body.isActive })
            .then(({ data }) => {
                fetchQuestionsById(category);
                toast.success('Pregunta modificada satisfactoriamente', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(console.log);
    };

    return (
        <>
            <div className="flex relative w-full">
                <h1 className="text-3xl sm:text-5xl text-center font-bold text-gray-400 w-full">Preguntas</h1>
            </div>

            <button onClick={() => onCreate(true)}
                className={`flex items-center btn border-2 border-dashed dark:border-gray-800 rounded-xl group overflow-hidden`}>
                <p className="p-2 text-center w-full">Nueva pregunta</p>
            </button>

            <div className="flex flex-col gap-2">
                <h4 className="ml-2 font-semibold text-2xl dark:text-gray-300">Activas</h4>
                {(faqs.length > 0) && faqs.map((item) => {
                    const { _id, question, answer, ...other } = item;
                    return other.isActive ? (
                        <div key={_id}
                            className="flex justify-between items-center btn bg-blue-100 dark:bg-gray-600 rounded-xl group overflow-hidden">
                            <p className="p-3">
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
                                <button type="button" title="Eliminar" onClick={() => handleDelete(item)}
                                    className="hidden group-hover:block p-2 text-2xl">
                                    <HiTrash />
                                </button>
                            </div>
                        </div>) : null;
                })}
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="ml-2 font-semibold text-2xl dark:text-gray-300">Inactivas</h4>
                {(faqs.length > 0) && faqs.map((item) => {
                    const { _id, question, answer, ...other } = item;
                    return (!other.isActive) ? (
                        <div key={_id}
                            className="flex justify-between items-center btn bg-blue-100 dark:bg-gray-600 rounded-xl group overflow-hidden opacity-60">
                            <p className="p-3">
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
                                <button type="button" title="Eliminar" onClick={() => handleDelete(item)}
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
