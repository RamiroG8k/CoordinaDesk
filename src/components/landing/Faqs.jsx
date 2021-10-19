// Common
import { useState, useEffect } from 'react';
// Components
import { Disclosure } from 'components/shared';
// Services
import { apiInstance } from 'services';

const Faqs = () => {
    const [categories, setCategories] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [selected, setSelected] = useState();

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchFaqs(selected);
    }, [selected]);

    const fetchCategories = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                const activeCategories = data.filter(c => c.isActive);

                setCategories(activeCategories);
                setSelected(activeCategories[0]._id);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const fetchFaqs = async (id) => {
        await apiInstance.get(`/faq/category/${id}`)
            .then(({ data }) => {
                setFaqs(faqParser(data));
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            })
    };

    const faqParser = (data) => {
        return data.map(e => ({ id: e._id, question: e.question, answer: e.answer }));
    };

    return (
        <section id="faqs" className="flex justify-end items-center w-screen h-screen p-4 sm:p-0 bg-gradient-to-r from-blue-100 to-gray-50">
            <div className="flex gap-4 h-full sm:h-4/5 w-full sm:w-4/5 p-20 bg-white rounded-xl">

                <div className="flex flex-col gap-3 w-4/5">
                    <h2 className="w-60 text-4xl font-semibold">Preguntas <span className="text-blue-400">Frecuentes</span></h2>
                    <p>Necesitas respuestas?,  Encuentralas aqui.</p>

                    <div className="flex flex-col h-full z-10 overflow-y-scroll">
                        {faqs?.map(({ id, question, answer }) =>
                            <Disclosure key={id} title={question} description={answer} />
                        )}
                    </div>
                </div>

                <div className="relative flex flex-col w-1/4 h-full">
                    <div className="flex h-1/2 w-full z-0">
                        <div className="absolute right-0 w-72 h-72 bg-blue-200 mix-blend-multiply rounded-full" />
                        <div className="absolute top-60 right-8 w-20 h-20 mix-blend-multiply bg-red-200 rounded-full" />
                    </div>

                    <div className="flex flex-wrap justify-end  gap-2 h-1/2 w-full" >
                        {categories?.map(({ _id, category }, i) =>
                            <button key={_id} onClick={() => fetchFaqs(_id)}
                                className="px-2 py-1 text-sm rounded transform transition hover:scale-105 hover:text-blue-600">
                                {category}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faqs;
