// Common
import { useEffect, useRef, useState } from 'react';
// Components
import { Disclosure, Modal, Paginator } from 'components/shared';
import { CreateClassification, HighClassifications } from 'components/admin';
// Services | Data 
import { apiInstance } from 'services';
import { CHART_COLORS, errorMessages } from 'utils/data';
import { checkOverflow } from 'utils';
// Others
import lottie from 'lottie-web';
import ChatbotAnimation from '../assets/loader.json';
import { toast } from 'react-toastify';
import { RiQuestionLine } from 'react-icons/ri';
import { HiOutlineBookmark, HiOutlineAdjustments, HiPencilAlt, HiTrash } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import { BsArrowDownShort } from 'react-icons/bs';
import { CgDanger } from 'react-icons/cg';

const ChatbotTools = () => {
    const [info, setInfo] = useState(false);
    const [create, setCreate] = useState(false);
    const [updates, setUpdates] = useState(false);
    const [classificationCat, setClassificationCat] = useState([]);
    const [infoChart, setInfoChart] = useState({});
    const [overflows, setOverflows] = useState();
    const [files, setFiles] = useState();
    const [classification, setClassification] = useState();
    const [confirm, setConfirm] = useState({ display: false, category: null });
    const [loading, setLoading] = useState(false);

    const classContainer = useRef();
    const chatbotContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: chatbotContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: ChatbotAnimation
        });

        fetchCategories();
        fetchPaginatedFiles();
    }, []);

    useEffect(() => {
        if (classificationCat) {
            cChart(classificationCat);
        }
    }, [classificationCat])

    const fetchCategories = async () => {
        await apiInstance.get('/classification-category/all')
            .then(({ data }) => {
                setClassificationCat(data);
                setOverflows(checkOverflow(classContainer.current));
            }).catch(console.log);
    };

    const cChart = (array) => {
        const labels = array.map(e => e.category);
        const data = array.map(f => f.total);

        setInfoChart({
            labels,
            options: {
                responsive: true,
            },
            datasets: [{
                data,
                backgroundColor: Object.values(CHART_COLORS),
                borderWidth: 4
            }]
        });
    };

    const onScroll = () => {
        if (classContainer.current) {
            const { scrollTop, scrollHeight, clientHeight } = classContainer.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setOverflows(v => ({ ...v, reached: true }));
                return;
            }
            setOverflows(v => ({ ...v, reached: false }));
        }
    };

    const refreshHandler = () => {
        setCreate(false);
        fetchCategories();
    };

    const handleDelete = (item) => {
        // const del = window.confirm(`Esta a punto de eliminar la categoria: ${item.category}`);
        // if (del === true) {
        //     deleteById(item._id);
        // }
        setConfirm({ display: true, category: item });
    };

    const deleteById = async (id) => {
        setLoading(true);
        await apiInstance.delete(`/classification-category/${id}`)
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
        await setLoading(false);
        await setConfirm({ display: false, category: null });
    };

    const handleCreate = () => {
        setClassification(null);
        setCreate(true);
    };

    const handleUpdate = (item) => {
        setClassification(item);
        setCreate(true);
    };

    const classify = async () => {
        await apiInstance.post('/classification-category/classify')
            .then(({ data }) => {
                toast.success(`Se ha iniciado a reclasificar`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(console.log);
    };

    const getFile = async () => {
        toast.success(`Preparando archivo para descarga`, {
            position: toast.POSITION.TOP_RIGHT
        });

        await apiInstance.get('/chatbot/generate-current', { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `semestre-actual.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(console.log);
    };

    const downloadFileById = async (item) => {
        toast.success(`Preparando archivo para descarga`, {
            position: toast.POSITION.TOP_RIGHT
        });

        await apiInstance.get(`/chatbot/files/${item._id}`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${item.archivo}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(console.log);
    };

    const fetchPaginatedFiles = async (page, limit = 10) => {
        await apiInstance.get('/chatbot/files/all/pageable', { params: { page, limit } })
            .then(({ data }) => {
                setFiles({
                    rows: fileParser(data.content),
                    columns: Object.keys(fileParser(data.content)[0]).slice(1),
                    pagination: {
                        total: data.totalElements,
                        from: data.page > 1 ? (((data.page - 1) * limit) + 1) : 1,
                        to: (limit * data.page) > data.totalElements ? data.totalElements : (limit * data.page),
                        current: data.page,
                        last: data.pages,
                    }
                });
            }).catch(console.log);
    };

    const fileParser = (data = []) => {
        return data.map((file) => (
            {
                _id: file._id,
                archivo: file.name,
                descargar: <FiDownload />
            }
        ));
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
                                <h5 className="text-lg leading-5">Estas a punto de eliminar la categoría: </h5>
                                <p className="leading-6 font-medium">
                                    {confirm.category?.category}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                        <button disabled={loading} onClick={() => deleteById(confirm.category._id)}
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
            <Modal visible={info} onClose={setInfo} size="md" title="Informacion chatbot">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4 space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Concurrencia de datos</h4>
                        <p className="leading-4 text-sm">De manera automática 1 vez cada 30 de Julio y 30 de Diciembre se genera de manera automática el archivo con los datos del semestre actual.</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-medium">Generar archivo</h4>
                        <p className="leading-4 text-sm">Si se genera un archivo con el botón de generar, son los datos del semestre actual.</p>
                    </div>
                    <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                    <div className="text-sm space-y-2 mt-2 text-justify">
                        <p className="leading-4">
                            <span className="font-medium">La grafica solo muestra los datos del semestre actual</span>
                        </p>
                    </div>
                </div>
            </Modal>
            <Modal visible={create} onClose={setCreate} size="md" title="Crear categoría de clasificación">
                <CreateClassification onCreated={refreshHandler} defaultClass={classification}
                    close={() => setCreate(false)} />
            </Modal>
            <section className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row h-96 bg-white w-full shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-6 gap-2 items-center">
                    <div className="flex relative w-full sm:w-1/2 h-full justify-center items-center">
                        <div ref={chatbotContainer} className="absolute z-0" />
                    </div>
                    <div className="relative flex flex-col w-full h-full sm:w-1/2" >
                        <button onClick={() => setInfo(true)} className="absolute right-0 top-0 h-auto transition rounded-full z-10">
                            <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                                <RiQuestionLine />
                            </p>
                        </button>
                        <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 h-full w-full z-0">
                            <div>
                                <h3 className="text-4xl font-semibold">Desk bot</h3>
                                <div className="border w-full rounded-full dark:border-gray-800 my-2" />
                            </div>
                            <button type="button" onClick={() => classify()}
                                className="btn btn-animated border-2 border-blue-300 py-1 sm:py-2 rounded-xl sm:rounded-2xl hover:bg-blue-300 group sm:w-2/3">
                                <p className="text-blue-400 sm:text-lg group-hover:text-white">Reclasificar</p>
                            </button>
                            <button type="button" onClick={() => getFile()}
                                className="btn btn-animated border-2 border-blue-300 py-1 sm:py-2 rounded-xl sm:rounded-2xl hover:bg-blue-300 group sm:w-2/3">
                                <p className="text-blue-400 sm:text-lg group-hover:text-white">Obtener archivo</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full bg-white shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-10 gap-4">
                    <div className="flex justify-between items-center w-full">
                        <h3 className="font-semibold text-2xl">Categorías de clasificación</h3>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleCreate()} type="button"
                                className="flex items-center gap-1 btn btn-animated sm:text-lg bg-blue-200 dark:bg-gray-500 w-auto p-3 sm:px-2 sm:py-1">
                                <p><HiOutlineBookmark /></p>
                                <p className="hidden md:block">Crear</p>
                            </button>
                            <button type="button" onClick={() => setUpdates(!updates)}
                                className="flex items-center gap-1 btn btn-animated text-lg border-2 dark:border-gray-900 w-auto p-3 sm:px-2 sm:py-1">
                                <p><HiOutlineAdjustments /></p>
                                <p className="hidden md:block">Modificar</p>
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-8 relative">
                        {(classificationCat.length > 0) && <div className="w-full sm:w-1/2">
                            <Doughnut data={infoChart} />
                        </div>}

                        <div ref={classContainer} onScroll={onScroll} className="py-6 max-h-96 sm:h-full w-full overflow-y-scroll scrollbar-hide">
                            {updates ? <>
                                {classificationCat.map((item, i) => {
                                    return (
                                        <div key={i} className="w-full bg-blue-100 rounded-xl px-4 py-1 mb-2 group flex justify-between">
                                            <span className="sm:text-lg font-medium text-left dark:text-gray-300">{item.category}</span>
                                            <div className="flex">
                                                <button type="button" title="Editar" onClick={() => handleUpdate(item)}
                                                    className="hidden group-hover:block p-1">
                                                    <HiPencilAlt />
                                                </button>
                                                <button type="button" title="Eliminar" onClick={() => handleDelete(item)}
                                                    className="hidden group-hover:block p-1">
                                                    <HiTrash />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </> : <>
                                {classificationCat?.map((item, i) => {
                                    const keywords = `Palabras clave: ${item.keywords.split(' ').join(', ')}`;
                                    return (
                                        <Disclosure key={item._id ?? i} title={item.category} description={keywords}
                                            color="blue" className="rounded-xl px-2 py-1 mb-2" />
                                    );
                                })}
                            </>}
                            {(overflows?.height && !overflows.reached) && <div className="absolute right-4 bottom-0 flex items-center animate-bounce text-blue-400">
                                <div className="h-10 w-10">
                                    <BsArrowDownShort className="h-full w-full" />
                                </div>
                                <p className="font-medium font-2xl">Scroll</p>
                            </div>}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full bg-white shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-10 gap-4">
                    <div className="flex justify-between items-center w-full">
                        <h3 className="font-semibold text-2xl">Archivos semestrales</h3>
                    </div>

                    {files && <div className="w-full flex flex-col gap-8 relative">
                        <section className="data justify-center align-center w-full shadow rounded-3xl p-2 overflow-x-auto bg-gray-50 dark:bg-gray-800">
                            <table className="table-auto w-full divide-y dark:divide-gray-600">
                                {(files.columns.length > 0) && <thead className="text-center">
                                    <tr className="table-row uppercase">
                                        {files.columns.map((name, i) =>
                                            <th key={i} className="text-gray-700 dark:text-gray-400 font-semibold pb-2 px-2">{name}</th>)
                                        }
                                    </tr>
                                </thead>}
                                <tbody className="text-center divide-font-medium space-y-4 text-gray-800 divide-y dark:divide-gray-700">
                                    {files.rows.length ? files.rows.map((row, i) =>
                                        <tr key={i} >
                                            {Object.values(row).slice(1).map((e, j) => {
                                                return (
                                                    <td key={j} className="py-2 dark:text-gray-500">
                                                        <p onClick={() => typeof e !== 'string' && downloadFileById(row)}
                                                            className={`${typeof e !== 'string' && 'text-xl cursor-pointer'} px-2 py-1 text-center flex justify-center`}>
                                                            {e}
                                                        </p>
                                                    </td>
                                                );

                                            })}
                                        </tr>
                                    ) : <tr>
                                        <td colSpan={files.columns.length}>
                                            <p className="text-2xl text-center font-bold text-gray-500 py-4">No hay información</p>
                                        </td>
                                    </tr>}
                                </tbody>
                            </table>
                        </section >
                        <Paginator pages={files.pagination}
                            onChange={(page) => page !== files.pagination.current ? fetchPaginatedFiles(page) : null} />
                    </div>}
                </div>
            </section>
        </>
    );
};

export default ChatbotTools;
