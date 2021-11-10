// Common
import { useEffect, useState } from 'react';
// Components
import { Modal } from 'components/shared';
// Services | Data
import { apiInstance } from 'services';
import { errorMessages } from 'utils/data';
// Others
import { toast } from 'react-toastify';
import { HiPencilAlt, HiTrash } from 'react-icons/hi';
import { CgDanger } from 'react-icons/cg';
import { RiQuestionLine } from 'react-icons/ri';

const HighClassifications = () => {
    const [selected, setSelected] = useState();
    const [info, setInfo] = useState(false);
    const [loading, setLoading] = useState();
    const [confirm, setConfirm] = useState({ display: false, priority: null });
    const [classifications, setClassifications] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        fetchClassifications();
    }, []);

    const fetchClassifications = async () => {
        await apiInstance.get('/ticket/high-priority-classification')
            .then(({ data }) => {
                setClassifications(data);
            }).catch(console.log)
    };

    const create = async () => {
        setLoading(true);
        await apiInstance.post('/ticket/high-priority-classification', { keyword })
            .then(({ data }) => {
                toast.success(`Se ha creado la prioridad correctamente`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                clear();
                fetchClassifications();
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
        await setLoading(false);
    };

    const updateById = async (id) => {
        setLoading(true);
        await apiInstance.put(`/ticket/high-priority-classification/${id}`, { _id: id, keyword })
            .then(({ data }) => {
                toast.success(`Se ha modificado la prioridad correctamente`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                clear();
                fetchClassifications();
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
        await setLoading(false);
    };

    const deleteById = async (id) => {
        setLoading(true);
        await apiInstance.delete(`/ticket/high-priority-classification/${id}`)
            .then(({ data }) => {
                toast.success(`Se ha eliminado la prioridad correctamente`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                clear();
                fetchClassifications();
                setConfirm({ display: false, priority: null })
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
        await setLoading(false);
    };

    const handleUpdate = (item) => {
        setSelected(item._id);
        setKeyword(item.keyword);
    };

    const clear = () => {
        setKeyword('');
        setSelected(null);
    };

    return (
        <>
            <Modal visible={info} onClose={setInfo} size="md" title="Informacion Clasificaciones">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4 space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Clasificaciones prioritarias</h4>
                        <p className="leading-4 text-sm">Las clasificaciones de alta prioridad son aquellas con las que hay mayor probabilidad que un ticket, al momento de su creación, sea clasificado con una prioridad alta(HIGH) y por ende este sea asignado a un usuario con rol COORDINATOR</p>
                    </div>
                    <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                    <div className="text-sm space-y-2 mt-2 text-justify">
                        <p className="leading-4">
                            <span className="font-medium">Esta información solo está disponible para un usuario con rol COORDINATOR</span>
                        </p>
                    </div>
                </div>
            </Modal>
            <Modal visible={confirm.display} onClose={() => setConfirm({ ...confirm, display: false })} size="md" title="Eliminar prioridad">
                <>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4 space-y-4">
                        <div className="flex gap-6">
                            <div className="flex justify-center items-center bg-red-200 rounded-full h-12 w-12">
                                <p className="text-4xl text-red-400">
                                    <CgDanger />
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg leading-5">Estas a punto de eliminar la prioridad: </h5>
                                <p className="leading-6 font-medium">
                                    {confirm.priority?.keyword}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                        <button disabled={loading} onClick={() => deleteById(confirm.priority._id)}
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
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center space-y-4" >
                <div className="relative w-full">
                    <h1 className="text-4xl sm:text-5xl text-center font-bold text-gray-400 mb-4">Clasificaciones Prioritarias</h1>
                    <button onClick={() => setInfo(true)} className="absolute right-0 top-0 h-auto transition hover:bg-blue-100 rounded-full">
                        <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                            <RiQuestionLine />
                        </p>
                    </button>
                </div>
                <div className="w-full">
                    <label htmlFor="keyword" className="dark:text-gray-500 text-sm ml-2 mb-1">Palabra clave</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex input p-0 sm:w-2/3 rounded-xl overflow-hidden">
                            <input value={keyword} onChange={({ target: { value } }) => setKeyword(value)}
                                id="keyword" name="keyword" type="text" autoComplete="off" maxLength={200}
                                className="w-full bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400 px-4 py-2 focus:outline-none" />
                            {keyword && <button type="button" onClick={() => clear()}
                                className="py-2 px-4 bg-blue-100 bg-opacity-60 dark:bg-gray-700">
                                x
                            </button>}
                        </div>
                        <button onClick={() => selected ? updateById(selected) : create()} disabled={!keyword}
                            className="btn btn-animated bg-blue-100 dark:bg-gray-600 px-3 py-2 sm:w-1/3 disabled:opacity-60">
                            <p className="flex justify-center items-center dark:text-white">
                                {loading ? <>
                                    <svg className="absolute left-1/4 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {selected ? 'Modificando...' : 'Creando...'}
                                </> : <>
                                    {selected ? 'Modificar' : 'Crear'} prioridad
                                </>}
                            </p>
                        </button>
                    </div>
                    {/* {!keyword && <span className="hidden sm:block ml-2 text-xs text-red-400">Este campo es requerido</span>} */}
                </div>
                <div className="w-full">
                    <h3 className="font-semibold text-2xl ml-2 mb-2">Clasificaciones</h3>
                    {/* Listing */}
                    <div className="sm:grid grid-cols-2 gap-x-2">
                        {classifications.map((item, i) => {
                            return (
                                <div key={i} className={`${item._id === selected && 'border-blue-400 dark:border-blue-400 text-blue-500 dark:text-blue-300'} 
                                w-full bg-blue-100 rounded-xl px-4 py-1 mb-2 group flex justify-between border dark:border-gray-900`}>
                                    <span className="sm:text-lg font-medium text-left dark:text-gray-300 truncate">{item.keyword}</span>
                                    {/* Item, on click set selected, handle action */}
                                    <div className="flex">
                                        <button type="button" title="Editar" onClick={() => handleUpdate(item)}
                                            className="hidden group-hover:block p-1">
                                            <HiPencilAlt />
                                        </button>
                                        <button type="button" title="Eliminar" onClick={() => setConfirm({ display: true, priority: item })}
                                            className="hidden group-hover:block p-1">
                                            <HiTrash />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HighClassifications;
