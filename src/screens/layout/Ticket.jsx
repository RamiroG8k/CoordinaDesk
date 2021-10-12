// Common
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
// Others
import { apiInstance } from 'services';
import { shortDate } from 'utils';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Disclosure } from 'components/shared';
import lottie from 'lottie-web';
import NotFound from '../../assets/not-found.json';

const Ticket = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const { id } = useParams();

    const notFoundContainer = useRef(null);

    useEffect(() => {
        const fetchData = async (body) => {
            await apiInstance.get(`/ticket/id/${id}`, body)
                .then(({ data: ticket }) => {
                    setData(ticket);
                }).catch(({ response: { data: error } }) => {
                    console.log(error);
                });
            await setLoading(false);
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        lottie.loadAnimation({
            container: notFoundContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: NotFound
        });
    }, [loading, data])

    return (
        <section className="flex flex-col w-screen h-screen items-center">
            {loading && <p>Loading...</p>}

            {(!loading && data) && <div className="flex flex-col w-full max-w-5xl p-4 sm:p-10 justify-center items-center space-y-4">
                <div className="sticky top-4 flex w-full bg-gray-100 rounded-3xl px-4 py-8 justify-between items-center">
                    <div className="flex flex-col justify-center w-5/12 text-left py-2 px-4 gap-2">
                        <p className="text-sm sm:text-lg leading-3">Fecha Apertura</p>
                        <div className="leading-4">
                            <p className="font-medium text-2xl">{`${shortDate(data.createdAt)[0]}/${shortDate(data.createdAt)[1]}`}</p>
                            <p>{shortDate(data.createdAt)[2]}</p>
                        </div>
                    </div>

                    <div className={data.status === 'RESOLVE' ? 'text-green-200' : 'text-black'}>
                        <p className="text-4xl text-green-500">
                            <FaRegCheckCircle />
                        </p>
                    </div>

                    <div className="flex flex-col justify-center w-5/12 text-right py-2 px-4 gap-2">
                        <p className="text-sm sm:text-lg leading-3">Fecha Update</p>
                        <div className="leading-4">
                            <p className="font-medium text-2xl">{`${shortDate(data.createdAt)[0]}/${shortDate(data.createdAt)[1]}`}</p>
                            <p>{shortDate(data.createdAt)[2]}</p>
                        </div>
                    </div>
                </div>

                <Disclosure title={data.title} description={data.description} color="blue" />

                <div className="flex flex-col space-y-2 w-full">

                    {data.ticketContent.map((e, i) => {
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                        return (
                            <div key={e.created_at}
                                className={`${e.isUser ? 'bg-blue-50' : 'text-right'} border rounded-2xl w-full p-4 text-sm`}>
                                <p className="font-semibold">{e.username}</p>
                                <p>{e.data}</p>
                                <span className="text-xs text-gray-500">
                                    {new Date(e.created_at).toLocaleDateString('es-MX', options)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>}

            {(!loading && !data) && <div className="flex sm:w-2/3 flex-col h-full p-6 items-center justify-center space-y-10">
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
