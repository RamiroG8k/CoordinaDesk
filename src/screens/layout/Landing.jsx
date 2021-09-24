import { useState, useEffect } from 'react';
import { Footer, Header } from 'components/Landing';
import { apiInstance } from 'services';
import { Link } from 'react-router-dom';
import { Disclosure } from 'components/shared';

const Landing = () => {
    const [code, setCode] = useState('');
    const [categories, setCategories] = useState();

    useEffect(() => {
        fetchSomething();
    }, []);

    const fetchSomething = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                setCategories(data);
            }).catch(({ response: { data: error } }) => {
                console.log(error);
            });
    };

    return (
        <>
            <Header />
            <section className="flex flex-col w-screen h-screen items-center bg-white pt-32">
                <h1 className="text-4xl sm:text-6xl font-semibold p-2 sm:p-4">CoordinaDesk</h1>
                <div className="w-full sm:w-1/2 p-4 text-center">
                    <input type="text" onChange={v => setCode(v.target.value.toUpperCase())} value={code}
                        placeholder="Start typing your ticket id" className="input text-2xl rounded-2xl bg-blue-50 border-2" />
                    <Link to={`/ticket/id/${code}`} type="button" disabled={!code}
                        className={`${code ? '' : 'opacity-50'} btn btn-animated disabled:opacity-50 bg-blue-200 w-auto px-4 p-2 mt-6 text-xl`}>
                        Search
                    </Link>
                </div>
            </section>
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
                        {/* <pre className="text-xs">{JSON.stringify(categories, null, 4)}</pre> */}
                    </div>
                </div>
            </section>
            <section id="faqs" className="flex flex-col w-screen h-screen items-center bg-white pt-32">

            </section>
            <Footer />
        </>
    )
}

export default Landing
