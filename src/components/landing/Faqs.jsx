// Common
import { useState, useEffect, useRef } from 'react';
// Components
import { Disclosure } from 'components/shared';
// Services
import { apiInstance } from 'services';
import { checkOverflow } from 'utils';
// Others
import { BsArrowDownShort } from 'react-icons/bs';

const Faqs = () => {
    const [categories, setCategories] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [selected, setSelected] = useState();
    const [overflows, setOverflows] = useState();

    const faqsContainer = useRef();

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selected) {
            fetchFaqs(selected);
        }
    }, [selected]);

    const fetchCategories = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                const activeCategories = data.filter(c => c.isActive);

                setCategories(activeCategories);
                setSelected(activeCategories[2]._id);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    const fetchFaqs = async (id) => {
        await apiInstance.get(`/faq/category/${id}`)
            .then(({ data }) => {
                setFaqs(faqParser(data));
                setOverflows(checkOverflow(faqsContainer.current));
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            })
    };

    const faqParser = (data) => {
        return data.map(e => {
            if (e.isActive) {
                return { id: e._id, question: e.question, answer: e.answer };
            };
            return null;
        });
    };

    return (
        <section id="faqs" className="flex justify-end items-center w-screen sm:h-screen p-4 sm:p-0 bg-gradient-to-r from-blue-100 to-gray-50">
            <div className="relative flex flex-col h-full gap-4 sm:h-4/5 w-full sm:w-4/5 p-6 sm:p-14 bg-white rounded-2xl">
                <div className="flex flex-col w-auto h-auto gap-3 z-10">
                    <h2 className="w-60 text-4xl font-semibold">Preguntas <span className="text-blue-400">Frecuentes</span></h2>
                    <p>Necesitas respuestas?,  Encuentralas aqui.</p>
                </div>

                <div className="flex flex-col-reverse h-full w-full sm:flex-row gap-4 z-10">
                    {/* TODO: handle styling in height! */}
                    <div className="flex flex-col gap-3 h-full w-full sm:w-4/5">
                        <div ref={faqsContainer}
                            className="flex flex-col h-full overflow-y-scroll">
                            {faqs?.map(({ id, question, answer }) =>
                                <Disclosure key={id} title={question} description={answer} />
                            )}
                        </div>

                        {overflows?.height && <div className="flex items-center self-center gap-2 animate-bounce text-blue-400">
                            <div className="h-10 w-10">
                                <BsArrowDownShort className="h-full w-full" />
                            </div>
                            <p className="font-medium font-2xl">Scroll</p>
                        </div>}
                    </div>

                    <div className="flex flex-col sm:w-1/4 h-full">
                        <div className="flex flex-col items-center sm:items-end sm:justify-end gap-4 h-full w-full border-b-2 sm:border-0" >
                            <h5 className="font-medium text-right mb-2">
                                Categorias
                            </h5>
                            <div className="flex sm:flex-col flex-wrap gap-x-6 gap-y-4 justify-center">
                                {categories?.map(({ _id, category }, i) =>
                                    <button key={_id} onClick={() => setSelected(_id)}
                                        className={`${selected === _id ? '-translate-x-4 font-medium scale-105 text-blue-600' : 'hover:scale-105 hover:text-blue-600 hover:-translate-x-2'}
                                            text-sm text-right rounded transform transition`}>
                                        {category}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="z-0 opacity-30 sm:opacity-60">
                    <div className="absolute top-10 right-20 w-60 h-60 bg-blue-200 mix-blend-multiply rounded-full" />
                    <div className="absolute top-52 right-16 w-20 h-20 mix-blend-multiply bg-red-200 rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default Faqs;
