// Common
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Others
import { apiInstance } from 'services';
import { shortDate } from 'utils';
import { FaRegCheckCircle, FaUserCheck } from 'react-icons/fa';
import { Disclosure } from 'components/shared';
import lottie from 'lottie-web';
import NotFound from '../../assets/not-found.json';

const Ticket = () => {
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState();
    const [hasEmailUpdates, setHasEmailUpdates] = useState();
    const [data, setData] = useState();
    const { id } = useLocation();

    const notFoundContainer = useRef(null);

    useEffect(() => {
        fetchData(id);
    }, [id]);

    useEffect(() => {
        lottie.loadAnimation({
            container: notFoundContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: NotFound
        });
    }, [loading, ticket])

    const fetchData = async (ticket) => {
        await apiInstance.get(`/ticket/id/${ticket}`)
            .then(({ data }) => {
                setTicket(data);
                setHasEmailUpdates(data.hasEmailUpdates);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
        await setLoading(false);
    };

    const answerAsStudent = async () => {
        await apiInstance.post(`/ticket/id/${id}/student/answer`, { data })
            .then(({ data }) => {
                setData('');
                fetchData(id);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const toggleEmailNotifs = async () => {
        await apiInstance.patch(`/ticket/id/${id}/email-updates`, { hasEmailUpdates })
            .then(({ data }) => {
                fetchData(id);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const handleEmailNotifs = () => {
        setHasEmailUpdates(v => !v);
        toggleEmailNotifs();
    };

    const getColor = (status) => {
        switch (status) {
            case 'RESOLVE': return 'text-green-200 dark:text-green-600';
            case 'IN_PROGRESS': return 'text-yellow-200 dark:text-yellow-600';
            default: return 'text-black dark:text-gray-200';
        }
    };

    return (
        <section className={`flex flex-col w-screen h-screen items-center dark:bg-gray-800 ${ticket ? 'bg-gradient-to-b from-white via-gray-200 to-blue-100' : 'bg-white'}`}>
            {loading && <p>Loading...</p>}
            {(!loading && ticket) && <div className="flex flex-col w-full h-screen max-w-5xl p-4 sm:p-10 justify-center items-center space-y-4">
                <div className="sticky top-4 flex w-full h-1/4 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 py-8 justify-between items-center shadow-inner">
                    <div className="flex flex-col justify-center w-5/12 text-left py-2 px-4 gap-2">
                        <p className="text-sm sm:text-lg leading-3">Fecha Apertura</p>
                        <div className="leading-4">
                            <p className="font-medium text-2xl">{`${shortDate(ticket.createdAt)[0]}/${shortDate(ticket.createdAt)[1]}`}</p>
                            <p>{shortDate(ticket.createdAt)[2]}</p>
                        </div>
                    </div>

                    <div className={`${getColor(ticket.status)} relative flex flex-col items-center group`}>
                        <p className="text-4xl rounded-full bg-white dark:bg-gray-800 p-2 shadow-lg">
                            <FaRegCheckCircle />
                        </p>
                        <div className="absolute -top-10 flex-col items-center hidden mb-6 group-hover:flex">
                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black dark:bg-gray-400 shadow-lg rounded-lg text-center">
                                Estado: {ticket.status}
                            </span>
                            <div className="w-3 h-3 -mt-2 transform rotate-45 bg-black dark:bg-gray-400" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center w-5/12 text-right py-2 px-4 gap-2">
                        <p className="text-sm sm:text-lg leading-3">Fecha Modificación</p>
                        <div className="leading-4">
                            <p className="font-medium text-2xl">{`${shortDate(ticket.createdAt)[0]}/${shortDate(ticket.createdAt)[1]}`}</p>
                            <p>{shortDate(ticket.createdAt)[2]}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col rounded-3xl gap-3 w-full h-2/3 p-4 bg-white">
                    <Disclosure title={ticket.title} description={ticket.description} color="blue" className="rounded-xl" />

                    <div className="flex flex-col space-y-2 w-full h-full overflow-y-scroll scrollbar-hide">
                        {ticket.ticketContent.map((e, i) => {
                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                            return (
                                <div key={e.created_at}
                                    className={`${e.isUser ? 'bg-blue-50 dark:bg-gray-900' : 'text-right'} border dark:border-gray-700 rounded-2xl w-full p-4 text-sm`}>
                                    <div className={`flex gap-2 items-center ${e.isUser ? 'text-blue-500' : 'text-right justify-end'} dark:text-white`}>
                                        {e.isUser && <p><FaUserCheck /></p>}
                                        <p className="font-semibold">{e.isUser ? e.username : 'Tú'}</p>
                                    </div>
                                    <div className={`flex gap-2 items-center ${e.isUser ? 'text-blue-500' : 'text-right justify-end'}`}>
                                        <p className="dark:text-white break-words w-4/5">{e.data}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 capitalize">
                                        {new Date(e.created_at).toLocaleDateString('es-MX', options)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {(ticket.status !== 'FINAL_RESOLVE' && ticket.status !== 'CLOSED_DUE_TO_INACTIVITY') && <>
                    <div className="flex w-full justify-between px-2">
                        <div className="form-group form-check inline-flex items-center dark:text-gray-500 text-sm ml-2 mb-1">
                            <input type="checkbox" id="hasEmailUpdates" checked={hasEmailUpdates ? true : false}
                                className="form-check-input" onChange={() => handleEmailNotifs()} value={hasEmailUpdates} />
                            <label htmlFor="hasEmailUpdates" className="form-check-label ml-2">Recibir notificaciones por email</label>
                        </div>
                        <Link to="/" className="w-auto btn btn-animated">
                            <p className="text-blue-500 dark:text-white text-right">Regresar al Inicio</p>
                        </Link>
                    </div>


                    <div className="flex w-full">
                        <textarea id="answer" rows={2} value={data} onChange={({ target: { value } }) => setData(value)}
                            className="w-full input rounded-xl bg-gray-50 dark:bg-gray-600" />
                        <div className="flex flex-col gap-2 w-auto px-2">
                            <button onClick={() => answerAsStudent()} disabled={!data}
                                className="btn px-2 py-1 bg-blue-400 dark:bg-blue-600 rounded-xl disabled:opacity-40">
                                <p className="text-white">
                                    Contestar
                                </p>
                            </button>
                        </div>
                    </div>
                </>}
            </div>}

            {((!loading && !ticket) && (ticket.status !== 'FINAL_RESOLVE' && ticket.status !== 'CLOSED_DUE_TO_INACTIVITY')) &&
                <div className="flex sm:w-2/3 flex-col h-full p-6 items-center justify-center space-y-10">
                    <h4 className="text-2xl sm:text-4xl font-semibold text-center">
                        <span className="text-blue-600">Oops</span>, parece que no hay informacion relacionada con el <span className="text-blue-600">ticket</span> proporcionado
                    </h4>
                    <div className="flex relative w-full h-1/2 justify-center items-center">
                        <div ref={notFoundContainer} className="flex z-0" />
                    </div>
                    <Link to="/" className="px-4 py-2 w-auto btn btn-animated bg-blue-300">
                        <p className="text-white text-lg">Regresar al Inicio</p>
                    </Link>
                </div>}
        </section>
    )
}

export default Ticket;
