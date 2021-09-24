import { Modal } from 'components/shared';
import { useState, useEffect } from 'react';
import { apiInstance } from 'services';

const Home = () => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchSomething();
    }, []);

    const fetchSomething = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                console.log(data);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    return (
        <section className="space-y-6">
            <Modal visible={modal} toggle={setModal} />
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10 h-96 flex justify-center items-center" >
                <h1 onClick={() => setModal(!modal)} className="text-5xl font-bold text-gray-400">Home</h1>
            </div>
        </section>
    )
}

export default Home;
