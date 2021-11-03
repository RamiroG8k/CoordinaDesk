// Common
import { useState } from 'react';
// Components
import { Sidebar, Navbar } from 'components';
import { Modal } from 'components/shared';

const Dashboard = ({ children }) => {
    const [bar, setBar] = useState(['max', 'min']);
    const [shown, setShown] = useState(false);
    const [modal, setModal] = useState(false);

    const sidebarShifter = () => {
        bar.unshift(bar[1]);
        bar.pop();
        setBar([...bar]);

        setShown(!shown);
    };

    const classHandler = () => {
        const mobile = 'hidden sm:flex';
        return shown ? mobile : 'absolute transition ease-in-out';
    };

    const mobileHandler = () => {
        setBar(['max', 'min']);
        setShown(!shown);
    };

    return (
        <section className="flex w-screen h-screen bg-main relative">
            {bar[0] === 'min' && <div className="hidden sm:flex h-full w-20" />}

            <Modal visible={modal} onClose={setModal} size="md" title="Informacion">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4">
                    <h4 className="font-medium text-xl mb-2">Estados del ticket</h4>
                    <ul className="space-y-4">
                        <li className="leading-5">
                            <span className="font-medium">ESPERANDO ASIGNACIÓN: </span>
                            El ticket está esperando a ser asignado
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">ASIGNADO: </span>
                            El ticket se ha asignado
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">EN PROGRESO: </span>El ticket está siendo evaluado
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">ESPERANDO RESPUESTA: </span>
                            Esperamos que nos des una respuesta del ticket
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">RESUELTO: </span>
                            Se ha marcado el ticket como resuelto, se puede volver a abrir si quedan dudas
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">FINALIZADO: </span>
                            El ticket se le ha dado una respuesta final, no se puede volver a abrir
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">CERRADO POR INACTIVIDAD: </span>
                            El ticket se ha cerrado por inactividad
                        </li>
                    </ul>
                    <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                    <div className="text-sm space-y-2 mt-2 text-justify">
                        <p className="leading-4">
                            Si un ticket no es usado, contestado o actualizado por más de 5 días, este se deshabilitará automáticamente.
                        </p>
                        <p className="leading-4">
                            Si un ticket con estatus <span className="font-medium">RESOLVE O FINAL_RESOLVE, </span>llevan más de 2 días sin ningúna modificación, se desactiva automáticamente.
                        </p>
                    </div>
                </div>
            </Modal>

            <Sidebar status={bar[0]} visible={shown} toggleView={mobileHandler}
                className={`${classHandler()} ${bar[0] === 'min' ? 'absolute' : 'sm:relative'} p-2 dark:bg-gray-700 z-30 shadow-md`} />

            <div className="w-screen h-screen overflow-y-auto">
                <Navbar
                    toggleSidebar={sidebarShifter} mobileSidebar={mobileHandler} toggleModal={setModal}
                    className="z-20 h-14 sm:h-20 bg-white dark:bg-gray-700 shadow-md sticky top-0" />

                <div className="flex flex-col w-full transition-width duration-500">
                    <div className="max-w-screen-lg mx-auto p-5 sm:p-10 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Dashboard;
