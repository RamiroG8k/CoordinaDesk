// Common
import { useEffect, useState } from 'react';
// Components
import { Datatable, Modal } from 'components/shared';
// Services | Data
import { apiInstance } from 'services';
import { ticketActions } from 'utils/data';
import { toast } from 'react-toastify';
import { TicketDetails } from 'components/admin';

const TicketsDone = () => {
    const [data, setData] = useState();
    const [details, setDetails] = useState({ visible: false, data: null });

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async (page, limit = 10, search) => {
        await apiInstance.get('/ticket/inactive/all',
            { params: { page, limit, name: search, email: search, role: search } })
            .then(({ data }) => {
                setData({
                    rows: ticketParser(data.content),
                    columns: Object.keys(ticketParser(data.content)[0]).slice(1),
                    actions: ticketActions,
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

    const ticketParser = (data = []) => {
        return data.map((ticket) => (
            {
                _id: ticket._id,
                id: ticket._id,
                titulo: (ticket.title).substring(0, 20) + '...',
                user: ticket.user.name.split(' ')[0],
                priority: ticket.priority,
                status: ticket.isActive,
            }
        ));
    };

    const handleItemEvent = ({ item, action }) => {
        switch (action) {
            case 'details':
                detailsTicket(item._id);
                break;
            default:
                break;
        }
    };

    const detailsTicket = async (id) => {
        await apiInstance.get(`/ticket/id/${id}`)
            .then(({ data }) => {
                setDetails({ visible: true, data });
            }).catch(({ response: { data: error } }) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };

    return (
        <section className="space-y-6">
            <Modal visible={details.visible} onClose={(show) => setDetails({ ...details, visible: show })}
                size="xl" title={`Detalles de ticket (${details.data?._id})`}>
                {details.data && <TicketDetails id={details.data._id} disabled
                    close={() => setDetails({ ...details, visible: false })} />}
            </Modal>
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center" >
                <div className="relative w-full">
                    <h1 className="text-4xl sm:text-5xl text-center font-bold text-gray-400 mb-4 sm:mb-8">Tickets Inhabilitados</h1>
                </div>
                {data && <Datatable data={data} popoverTitle="Acciones por ticket"
                    onUpdate={(page, limit) => fetchTickets(page, limit)}
                    onEvent={handleItemEvent} onSearch={(page, limit, search) => fetchTickets(page, limit, search)} />}
            </div>
        </section>
    );
};

export default TicketsDone;
