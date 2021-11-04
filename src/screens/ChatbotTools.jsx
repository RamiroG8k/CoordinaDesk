// Common
import { useEffect, useRef, useState } from 'react';
// Components
import { Disclosure, Modal } from 'components/shared';
import { CreateClassification } from 'components/admin';
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
import { Doughnut } from 'react-chartjs-2';
import { BsArrowDownShort } from 'react-icons/bs';

const ChatbotTools = () => {
    const [info, setInfo] = useState(false);
    const [create, setCreate] = useState(false);
    const [updates, setUpdates] = useState(false);
    const [classificationCat, setClassificationCat] = useState([]);
    const [infoChart, setInfoChart] = useState({});
    const [overflows, setOverflows] = useState();
    const [classification, setClassification] = useState();

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
    }, []);

    useEffect(() => {
        if (classificationCat) {
            cChart(classificationCat);
        }
    }, [classificationCat])

    const trainNlp = async () => {
        await apiInstance.post('/nlp/train')
            .then(({ data }) => {
                toast.success(`Se ha iniciado a entrenar`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(console.log)
    };

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
        const del = window.confirm(`Esta a punto de eliminar la categoria: ${item.category}`);
        if (del === true) {
            deleteById(item._id);
        }
    };

    const deleteById = async (id) => {
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
                link.setAttribute('download', `currentFile.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(console.log);
    };

    return (
        <>
            <Modal visible={info} onClose={setInfo} size="md" title="Informacion chatbot">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4 space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Concurrencia de datos</h4>
                        <p className="leading-4 text-sm">De manera automatica 1 vez cada 30 de Julio y 30 de Diciembre se genera de manera automatica el archivo con los datos del semestre actual.</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-medium">Generar archivo</h4>
                        <p className="leading-4 text-sm">Que si se genera un archivo con el boton de generar, son los datos del semestre actual.</p>
                    </div>
                    <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                    <div className="text-sm space-y-2 mt-2 text-justify">
                        <p className="leading-4">
                            <span className="font-medium">La grafica solo muestra los datos del semestre actual</span>
                        </p>
                    </div>
                </div>
            </Modal>
            <Modal visible={create} onClose={setCreate} size="md" title="Crear categoria de clasificacion">
                <CreateClassification onCreated={refreshHandler} defaultClass={classification}
                    close={() => setCreate(false)} />
            </Modal>
            <section className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="h-96 bg-white w-full sm:w-1/3 shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-6 flex flex-col gap-2 items-center">
                        <div className="flex relative w-full h-full justify-center items-center">
                            <div ref={chatbotContainer} className="absolute z-0" />
                        </div>
                        <div className="space-y-2 z-10">
                            <button type="button" onClick={() => trainNlp()}
                                className="btn btn-animated bg-blue-300 border-2 border-blue-500 py-1 rounded-2xl">
                                <p className="text-white text-xl">Reentrenar</p>
                            </button>
                            <button type="button" onClick={() => classify()}
                                className="btn btn-animated border-2 border-blue-200 py-1 rounded-xl">
                                <p className="text-blue-300 text-sm">Reclasificar</p>
                            </button>
                            <button type="button" onClick={() => getFile()}
                                className="btn btn-animated border-2 border-blue-200 py-1 rounded-xl">
                                <p className="text-blue-300 text-sm">Obtener archivo</p>
                            </button>
                        </div>
                    </div>
                    <div className="h-96 relative bg-white w-full sm:w-2/3 shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-10 flex flex-col">
                        <h3 className="font-semibold text-2xl">Desk bot</h3>
                        <p>Breve descripcionde de deskbot, sus funciones....</p>
                        <button onClick={() => setInfo(true)} className="absolute top-2 right-2 sm:top-10 sm:right-10 h-auto transition rounded-full">
                            <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                                <RiQuestionLine />
                            </p>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full bg-white shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-10 gap-4">
                    <div className="flex justify-between items-center w-full">
                        <h3 className="font-semibold text-2xl">Categorias de clasificacion</h3>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleCreate()} type="button"
                                className="flex items-center gap-1 btn btn-animated text-lg bg-blue-200 dark:bg-gray-500 w-auto p-3 sm:px-2 sm:py-1">
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
                                        <div className="w-full bg-blue-100 rounded-xl px-4 py-1 mb-2 group flex justify-between">
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
            </section>
        </>
    );
};

export default ChatbotTools;
