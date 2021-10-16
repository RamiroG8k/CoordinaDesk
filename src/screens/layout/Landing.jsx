import { useState } from 'react';
// Components
import { Footer, Header, Chatbot, Faqs, Tracking, CreateTicket } from 'components/landing';
import { ScrollToTop, Modal } from 'components/shared';

const Landing = () => {
    const [createTicket, setCreateTicket] = useState(false);
    const [ticket, setTicket] = useState();

    return (
        <div className="relative">
            <Header onCreate={setCreateTicket} className="sticky top-0 z-50 shadow-md"/>
            <Chatbot onCreate={setCreateTicket} ticket={ticket}/>
            <Faqs />
            <Tracking />
            <Footer />
            <ScrollToTop />
            <Modal visible={createTicket} toggle={setCreateTicket} size="xl"
                title={ticket ? 'Informacion de ticket' : 'Crear ticket'}>
                {!ticket && <CreateTicket close={setCreateTicket} onCreate={setTicket} />}
                {/* {ticket && <div className="p-4 sm:p-6 sm:pt-4">
                    {JSON.stringify(ticket, null, 4)}
                </div>} */}
            </Modal>
        </div>
    )
}

export default Landing
