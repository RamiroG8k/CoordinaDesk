import { Datatable, Modal } from 'components/shared';
import { useState, useEffect } from 'react';
import { apiInstance } from 'services';

const Home = () => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);

    const fetchPhrases = async () => {
        await apiInstance.get('/films', { params: { fields: 'title,original_title,director,release_date,rt_score', limit: 10 } })
            .then(({ data }) => {
                setData(data);
            }).catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        fetchPhrases();
    }, [])

    return (
        <section className="space-y-6">
            <Modal visible={modal} toggle={setModal} />
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10 h-96 flex justify-center items-center" >
                <h1 onClick={() => setModal(!modal)} className="text-5xl font-bold text-gray-400">Home</h1>
            </div>

            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex justify-center items-center" >
                <Datatable columns={Object.keys(data[0] ?? {})} data={{ rows: data }}/>
            </div>
        </section>
    )
}

export default Home;
