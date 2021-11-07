// Common
import { useState } from 'react';
// Components
import { Footer, Header, Chatbot, Faqs, Tracking, CreateTicket, Concept, About } from 'components/landing';
import { ScrollToTop, Modal, ModeSwitcher } from 'components/shared';
// Others
import { FaRegCheckCircle, FaRegCopy } from 'react-icons/fa';
import { toClipboard } from 'utils';

const Landing = () => {
    const [show, setShow] = useState(false);
    const [ticket, setTicket] = useState();

    const TicketInfo = ({ close, onCreate }) => {
        return (
            <>
                <div className="relative flex flex-col gap-4 p-4 sm:p-6 sm:pt-4">
                    <div className="flex gap-6">
                        <p className="text-7xl text-green-400">
                            <FaRegCheckCircle />
                        </p>
                        <div className="w-full">
                            <h4 className="text-2xl font-medium">Éxito</h4>
                            <p>Su ticket</p>
                            <p className="font-medium">"{ticket.title}"</p>
                            <div className="flex justify-between items-center text-sm">
                                <p>Status: </p>
                                <span className="text-xs bg-green-200 px-1 rounded-full">{ticket.status}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 font-light text-sm text-justify leading-4">
                        Puedes dar seguimiento con la información recibida a tu correo o con el número de referencia
                        <span className="font-bold"> ({ticket._id}) </span>a traves de esta misma plataforma.
                    </p>
                    <div className="absolute right-6">
                        <button type="button" title="Copiar ID Referencia" onClick={() => toClipboard('ID de Refencia copiado satisfactoriamente', ticket._id)}
                            className="flex w-8 h-8 justify-center items-center rounded-lg border bg-gray-100">
                            <p className="text-gray-700">
                                <FaRegCopy />
                            </p>
                        </button>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                    <button type="button" onClick={onCreate}
                        className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-400 dark:bg-blue-600  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:w-auto transition" >
                        <p className="text-white text-base sm:text-sm font-medium">
                            Nuevo ticket
                        </p>
                    </button>
                    <button type="button" onClick={() => close(false)}
                        className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto transition" >
                        <p className="text-gray-700 dark:text-white text-base sm:text-sm font-medium">Cerrar</p>
                    </button>
                </div>
            </>
        );
    };

    const handleModalClose = () => {
        setShow(false);
        if (ticket) {
            setTicket(null);
        }
    };

    return (
        <div className="relative bg-white dark:bg-gray-800">
            <div className="fixed z-50 -right-4 top-60 transform rotate-90 bg-blue-100 dark:bg-blue-800 px-3 py-2 rounded-b-2xl">
                <ModeSwitcher />
            </div>
            <Header onCreate={setShow} className="sticky top-0 z-50 shadow-md" />
            <Chatbot onCreate={setShow} ticket={ticket} />
            <Concept className="" />
            <Faqs />
            <About className="z-10" />
            <Tracking className="z-0" />
            <Footer />
            <ScrollToTop />
            <Modal visible={show} onClose={handleModalClose} size={ticket ? 'xs' : 'xl'} title={ticket ? 'Informacion de ticket' : 'Crear ticket'}>
                {ticket ?
                    <TicketInfo close={handleModalClose} onCreate={() => setTicket(null)} /> :
                    <CreateTicket close={handleModalClose} onCreate={setTicket} />}
            </Modal>
        </div>
    )
}

export default Landing
