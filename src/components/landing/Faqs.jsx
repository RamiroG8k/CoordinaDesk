// Common
import { useState, useEffect } from 'react';
// Components
import { Disclosure } from 'components/shared';
// Services
import { apiInstance } from 'services';

const Faqs = () => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const fetchCategories = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                setCategories(data);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };
    return (
        <section id="faqs" className="flex flex-col w-screen h-screen bg-gray-50 items-center px-4 sm:px-10">
                <div className="title text-center p-5">
                    <h3 className="text-4xl font-semibold">FAQs</h3>
                    <span>Specify your category to look for the top results in our FAQs</span>
                </div>
                <div className="flex flex-col sm:flex-row w-full h-full lg:w-3/4 items-center sm:gap-10 py-10">
                    <div className="flex flex-wrap h-auto justify-center gap-x-4 w-screen text-center py-2 sm:flex-col md:w-1/4 sm:text-right sm:leading-10 sm:overflow-visible" >
                        {categories?.map(({ category }, i) => {
                            return (
                                <p key={i} className="transform transition hover:scale-105 cursor-pointer sm:whitespace-nowrap hover:text-blue-600">{category}</p>
                            );
                        })}
                    </div>
                    <div className="border w-full sm:w-0 sm:h-4/5 " />
                    <div className="flex flex-col space-y-4 max-h-full w-full justify-center items-center overflow-y-scroll">
                        {categories?.map((e, i) => {
                            return (
                                <Disclosure key={e._id} title={e._id} description={e.category} color="blue" />
                            );
                        })}
                    </div>
                </div>
            </section>
    );
};

export default Faqs;
