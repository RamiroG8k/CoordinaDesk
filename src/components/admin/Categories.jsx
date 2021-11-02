// Common
import { useEffect, useState } from 'react';
// Data | Services
import { apiInstance } from 'services';
// Others
import { HiOutlineDotsVertical, HiOutlineBookmark, HiOutlineAdjustments } from 'react-icons/hi';

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

            <div className="flex flex-col sm:flex-row gap-4">
                <div className={`${disabled ? 'sm:w-1/2' : 'w-full' } flex flex-col gap-2 bg-blue-100 dark:bg-gray-800 rounded-2xl p-2`}>
                    <h4 className="ml-2 font-semibold text-xl dark:text-gray-300">Activas</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {categories.map((item) => {
                            const { _id, category, ...other } = item;
                            return other.isActive ? (
                                <div key={_id} onClick={() => handleActive(item)}
                                    className={`${active === _id && 'border-blue-400 dark:border-blue-400 text-blue-500 dark:text-blue-300'}
                                flex items-center btn btn-animated w-auto bg-white dark:bg-gray-600 border dark:border-gray-900 rounded-xl group overflow-hidden`}>
                                    <p className="p-2 cursor-pointer text-sm">
                                        {category}
                                    </p>
                                    <button type="button" className="hidden group-hover:block p-1 transition-all">
                                        <HiOutlineDotsVertical />
                                    </button>
                                </div>) : null;
                        })}
                    </div>
                </div>

                {disabled && <div className="flex flex-col gap-4 border-4 border-dashed sm:w-1/2 rounded-xl">
                    <h4 className="ml-2 font-semibold text-xl dark:text-gray-300">Inactivas</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {categories.map(({ _id, category, ...other }) => {
                            return (!other.isActive) ? (
                                <div key={_id} className="flex items-center btn btn-animated w-auto bg-white dark:bg-gray-600 border dark:border-gray-900 rounded-xl group overflow-hidden opacity-60">
                                    <p className="p-2 cursor-pointer text-sm">
                                        {category}
                                    </p>
                                    <button type="button" className="hidden group-hover:block p-1 transition-all">
                                        <HiOutlineDotsVertical />
                                    </button>
                                </div>) : null;
                        })}
                    </div>
                </div>}
            </div>
        </>
    );
};

export default Categories;
