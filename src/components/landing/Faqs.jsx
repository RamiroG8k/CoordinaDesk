// Common
import { useState, useEffect } from 'react';
// Components
import { Disclosure } from 'components/shared';
// Services
import { apiInstance } from 'services';

const Faqs = () => {
    const [categories, setCategories] = useState();
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
                console.log(data);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            })
    };

    return (
        <section id="faqs" className="flex flex-col w-screen h-screen bg-gray-50 items-center px-4 sm:px-10">
            <div className="flex flex-col text-center p-5 sm:mt-6 gap-3">
                <h3 className="text-4xl font-semibold">Preguntas <span className="text-blue-400">Frecuentes</span></h3>
                <p>Necesitas respuestas?, Encuentralas aqui.</p>
            </div>

            <div className="flex flex-col sm:flex-row w-full h-full lg:w-3/4 items-center sm:gap-10 bg-green-200">
                <div className="flex flex-wrap h-auto justify-center gap-x-4 w-screen text-center py-2 sm:flex-col md:w-1/4 sm:text-right sm:leading-10 sm:overflow-visible" >
                    {categories?.map(({ category }, i) =>
                        <p key={i} className="transform transition hover:scale-105 cursor-pointer sm:whitespace-nowrap hover:text-blue-600">{category}</p>
                    )}
                </div>
                <div className="border w-full sm:w-0 sm:h-4/5 " />
                <div className="flex flex-col space-y-4 max-h-full w-full justify-center items-center overflow-y-scroll py-4">
                    {categories?.map(({ _id, category }) =>
                        <Disclosure key={_id} title={_id} description={category} color="blue" />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Faqs;
