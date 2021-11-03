// Common
import { useEffect, useState } from 'react';
// Components
import { Datatable, Modal } from 'components/shared';
// Services | Data
import { apiInstance } from 'services';
import { ticketActions, ticketPriority, ticketStatus } from 'utils/data';
import { toast } from 'react-toastify';
import { TicketDetails } from 'components/admin';
import { RiQuestionLine } from 'react-icons/ri';

const TicketsDone = () => {
    const [data, setData] = useState();
    const [info, setInfo] = useState(false);
    const [details, setDetails] = useState({ visible: false, data: null });

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async (page, limit = 10, search) => {
        await apiInstance.get('/ticket/inactive/all',
            { params: { page, limit, status: search, title: search, priority: search } })
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
                usuario: ticket.user.name.split(' ')[0],
                prioridad: (ticketPriority.filter(({ priority }) => priority === ticket.priority))[0].label,
                status: (ticketStatus.filter(({ value }) => value === ticket.status))[0].label,
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
            <Modal visible={info} onClose={setInfo} size="md" title="Informacion">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 sm:pt-4">
                    <h4 className="font-medium text-xl mb-2">Filtrar por status</h4>
                    <ul className="space-y-4">
                        <li className="leading-5">
                            <span className="font-medium">ESPERANDO ASIGNACIÓN: </span>
                            Se debera de introducir 'WAITING_ASIGNATION' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">ASIGNADO: </span>
                            Se debera de introducir 'ASIGNED' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">EN PROGRESO: </span>
                            Se debera de introducir 'IN_PROGRESS' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">ESPERANDO RESPUESTA: </span>
                            Se debera de introducir 'WAITING_RESPONSE' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">RESUELTO: </span>
                            Se debera de introducir 'RESOLVE' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">FINALIZADO: </span>
                            Se debera de introducir 'FINAL_RESOLVE' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium">CERRADO POR INACTIVIDAD: </span>
                            Se debera de introducir 'CLOSED_DUE_TO_INACTIVITY' en la Búsqueda
                        </li>
                    </ul>
                    <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                    <ul className="space-y-4 py-2">
                        <h4 className="font-medium text-xl mb-2">Filtrar por prioridad</h4>
                        <li className="leading-5">
                            <span className="font-medium text-green-500">Baja: </span>
                            Se debera de introducir 'LOW' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium text-yellow-500">Media: </span>
                            Se debera de introducir 'MODERATE' en la Búsqueda
                        </li>
                        <li className="leading-5">
                            <span className="font-medium text-red-500">Alta: </span>
                            Se debera de introducir 'HIGH' en la Búsqueda
                        </li>
                    </ul>
                    <div className="border w-full rounded-full dark:border-gray-800" />
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

            <Modal visible={details.visible} onClose={(show) => setDetails({ ...details, visible: show })}
                size="xl" title={`Detalles de ticket (${details.data?._id})`}>
                {details.data && <TicketDetails id={details.data._id} disabled
                    close={() => setDetails({ ...details, visible: false })} />}
            </Modal>
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center" >
                <div className="relative w-full">
                    <h1 className="text-4xl sm:text-5xl text-center font-bold text-gray-400 mb-4 sm:mb-8">Tickets Inhabilitados</h1>
                    <button onClick={() => setInfo(true)} className="absolute right-0 top-0 h-auto transition hover:bg-blue-100 rounded-full">
                        <p className="p-2 text-3xl text-gray-500 dark:text-gray-400 active:bg-transparent">
                            <RiQuestionLine />
                        </p>
                    </button>
                </div>
                {data && <Datatable data={data} popoverTitle="Acciones por ticket"
                    onUpdate={(page, limit) => fetchTickets(page, limit)} placeholder="Búsqueda por titulo, prioridad o status"
                    onEvent={handleItemEvent} onSearch={(page, limit, search) => fetchTickets(page, limit, search)} />}
            </div>
        </section>
    );
};

export default TicketsDone;
