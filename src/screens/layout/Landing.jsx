import { useState } from 'react';
// Components
import { Footer, Header, Chatbot, Faqs, Tracking, CreateTicket, Concept, About } from 'components/landing';
import { ScrollToTop, Modal } from 'components/shared';

const Landing = () => {
    const [show, setShow] = useState(false);
    const [ticket, setTicket] = useState();

    const TicketInfo = ({ close, onCreate }) => {
        return (
            <>
                <div className="p-4 sm:p-6 sm:pt-4">
                    {/* TODO: Manage ticket info */}
                    {/* {JSON.stringify(ticket, null, 4)} */}
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
            <Header onCreate={setShow} className="sticky top-0 z-50 shadow-md" />
            <Chatbot onCreate={setShow} ticket={ticket} />
            <Concept className=""/>
            <Faqs />
            <About className=""/>
            <Tracking />
            <Footer />
            <ScrollToTop />
            <Modal visible={show} onClose={handleModalClose} size="xl" title={ticket ? 'Informacion de ticket' : 'Crear ticket'}>
                {ticket ?
                    <TicketInfo close={handleModalClose} onCreate={() => setTicket(null)} /> :
                    <CreateTicket close={handleModalClose} onCreate={setTicket} />}
            </Modal>
        </div>
    )
}

export default Landing
