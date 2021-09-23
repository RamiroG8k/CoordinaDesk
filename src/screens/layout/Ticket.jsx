import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiInstance } from 'services';

const Ticket = () => {
    const [data, setData] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async (body) => {
            await apiInstance.get(`/ticket/id/${id}`, body)
            .then(({ data: ticket }) => {
                setData(ticket);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
        };

        fetchData();
    }, [id]);

    return (
        <section className="flex flex-col w-screen h-screen items-center bg-white">
            <h1>Ticket</h1>
            <div className="bg-gray-100 w-1/2 overflow-x-auto p-4">
                {data ? <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
                : <p>Not found</p>
                }
            </div>
        </section>
    )
}

export default Ticket;
