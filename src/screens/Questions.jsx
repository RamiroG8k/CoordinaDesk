// Common
import { useEffect, useState } from 'react';
// Data | Services
import { HiOutlineBookmark, HiOutlineAdjustments } from 'react-icons/hi';
import { apiInstance } from 'services';

const Questions = ({ selected, onCreate }) => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        if (selected) {
            fetchCategories(selected);
        }
    }, [selected]);

    const fetchCategories = async (id) => {
        await apiInstance.get(`/faq/category/${id}`)
            .then(({ data }) => {
                setFaqs(data ?? []);
            }).catch(console.log);
    };

    return (
        <>
            <div className="flex relative w-full">
                <h1 className="text-3xl sm:text-5xl text-center font-bold text-gray-400 w-full">Preguntas</h1>
                <div className="absolute top-2 w-full flex justify-between gap-2">
                    <button onClick={() => onCreate(true)} type="button"
                        className="flex items-center gap-1 btn btn-animated text-lg bg-blue-200 dark:bg-gray-500 w-auto p-3 sm:px-2 sm:py-1">
                        <p><HiOutlineBookmark /></p>
                        <p className="hidden md:block">Crear</p>
                    </button>

                    <button onClick={() => console.log(false)} type="button"
                        className="flex items-center gap-1 btn btn-animated text-lg border-2 dark:border-gray-900 w-auto p-3 sm:px-2 sm:py-1">
                        <p><HiOutlineAdjustments /></p>
                        <p className="hidden md:block">Deshabilitar</p>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <button onClick={() => onCreate(true)}
                    className={`flex items-center btn border-2 border-dashed dark:border-gray-800 rounded-xl group overflow-hidden`}>
                    <p className="p-2 text-center w-full">Nueva pregunta</p>
                </button>
                {(faqs.length > 0) && faqs.map((item) => {
                    const { _id, question, answer, ...other } = item;
                    return other.isActive ? (
                        <button key={_id} onClick={() => console.table(item)}
                            className={`flex items-center btn bg-blue-100 dark:bg-gray-600 rounded-xl group overflow-hidden`}>
                            <p className="p-3">
                                {question}
                            </p>
                        </button>) : null;
                })}
            </div>
        </>
    );
};

export default Questions;
