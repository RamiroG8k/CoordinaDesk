// Common
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// Components
import { Modal } from 'components/shared';
// Others
import lottie from 'lottie-web';
import TrackingAnimation from '../../assets/working.json';
import { MdSecurity } from 'react-icons/md';

const Tracking = () => {
    const [id, setId] = useState('');
    const [udgId, setUdgId] = useState('');
    const [display, setDisplay] = useState(false);
    const writerContainer = useRef(null);

    const history = useHistory();

    useEffect(() => {
        lottie.loadAnimation({
            container: writerContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: TrackingAnimation
        });
    }, []);

    const infoHandler = () => {
        history.push({
            pathname: '/ticket/tracking',
            id,
            udgId
        });
    };

    return (
        <>
            <Modal visible={display} onClose={setDisplay} size="md" title="Eliminar categoría">
                <>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4 space-y-4">
                        <div className="flex gap-6">
                            <div className="flex justify-center items-center bg-green-200 rounded-full h-12 w-12">
                                <p className="text-4xl text-green-600">
                                    <MdSecurity />
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 w-auto">
                                <h5 className="leading-5 break-words">Para continuar por favor ingresa tu código de alumno: </h5>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="udgCode" className="dark:text-gray-500 text-sm ml-2 mb-1">Código de alumno</label>
                            <input id="udgCode" type="number" autoComplete="off" maxLength={20} onChange={v => setUdgId(v.target.value)} value={udgId}
                                className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400" />
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                        <button disabled={!udgId} onClick={() => infoHandler()}
                            className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-green-400 dark:bg-green-600  hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:w-auto transition" >
                            <p className="text-white text-base sm:text-sm font-medium">
                                Continuar
                            </p>
                        </button>
                        <button type="button" onClick={() => setDisplay(false)}
                            className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto transition" >
                            <p className="text-gray-700 dark:text-white text-base sm:text-sm font-medium">Cerrar</p>
                        </button>
                    </div>
                </>
            </Modal>
            <section id="tracking" className="flex flex-col sm:flex-row w-screen h-full sm:h-screen bg-white dark:bg-gray-800 sm:px-20 xl:px-36">
                <div className="flex flex-col w-full sm:w-1/3 h-full items-start p-4 sm:pt-20">
                    <div className="my-4 sm:my-8 text-center sm:text-left">
                        <h3 className="text-3xl sm:text-5xl font-semibold leading-tight dark:text-white">Haz tu <span className="text-blue-300 dark:text-blue-800">seguimiento</span> fácil</h3>
                        <p className="text-xl font-medium my-4 dark:text-gray-500">
                            Acceso a la información que se te proporciona con tu ID de referencia, al instante!
                        </p>
                    </div>
                    <input type="number" pattern="[0-9]+" min="0" onChange={v => setId(v.target.value)} value={id}
                        placeholder="Ticket ID" className="input text-xl rounded-2xl bg-blue-50 dark:bg-gray-900 dark:border-gray-700 border-2 dark:text-white" />
                    <button onClick={() => setDisplay(true)} type="button" disabled={!id}
                        className={`${id ? '' : 'opacity-50'} btn btn-animated self-center sm:self-start disabled:opacity-50 bg-blue-200 w-auto px-4 p-2 mt-6 text-xl`}>
                        Rastrear
                    </button>
                </div>
                <div className="flex w-full sm:w-2/3 h-80 sm:h-full justify-center items-center">
                    <div ref={writerContainer} className="absolute sm:w-2/3" />
                    <div className="sm:w-96 sm:h-96 bg-blue-50 dark:bg-blue-800 rounded-full" />
                </div>
            </section>
        </>
    );
};

export default Tracking;
