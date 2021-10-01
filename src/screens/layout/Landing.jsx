import { useState, useEffect, useRef } from 'react';
import { Footer, Header } from 'components/Landing';
import { apiInstance } from 'services';
import { Link } from 'react-router-dom';
import { Disclosure, ScrollToTop } from 'components/shared';

import { FiSend } from 'react-icons/fi';

const Landing = () => {
    const [code, setCode] = useState('');
    const [question, setQuestion] = useState('');
    const [categories, setCategories] = useState();
    const [chat, setChat] = useState([]);

    const chatbot = useRef(null);

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

    const askNLP = async () => {
        if (question) {
            await apiInstance.post('/nlp/evaluate', { question })
                .then(({ data }) => {
                    
                    // chatbot.current?.scrollIntoView({
                    //     block: 'end', 
                    //     behavior: 'smooth',
                    // });

                    setChat([...chat, { question }, data]);
                }).catch(({ response: { data: error } }) => {
                    console.log(error);
                });
        }
        setQuestion('');
    };

    return (
        <>
            <Header />
            <section className="relative flex flex-col w-screen h-screen items-center bg-white">
                <div className="h-1/3 py-4 sm:py-10 text-center w-full sm:w-2/3">
                    <h1 className="text-4xl sm:text-6xl font-semibold p-2 sm:p-4">CoordinaDesk</h1>
                    <p className="font-medium text-md sm:text-xl text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                {/* <h3 className="text-gray-700 text-center font-semibold text-3xl">Chatbot</h3> */}
                <div className="flex flex-col justify-between h-2/3 bg-blue-200 rounded-t-4xl w-full sm:w-2/3 p-2 sm:p-4" >
                    <div className="flex flex-col w-full h-full gap-2 sm:gap-4">
                        <div ref={chatbot} className="flex flex-col h-full w-full bg-gray-50 rounded-3xl p-4 gap-2 overflow-y-scroll">
                            {chat?.map((e, i) =>
                                <div key={i} className={e.question ? 'text-right' : ''}>
                                    <p className={`${e.question ? 'bg-white' : 'bg-blue-50'} inline-block px-4 py-2 border border-blue-100 rounded-xl`}>
                                        {e.question ?? e.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="bottom flex w-full gap-2">
                            <input value={question} onChange={v => setQuestion(v.target.value)} type="text" placeholder="Ask anything"
                                className="input rounded-3xl bg-white border-2 border-blue-100 w-full" />
                            <button onClick={() => askNLP()}
                                className="btn-animated w-10 h-10 bg-white rounded-full flex justify-center items-center focus:outline-none">
                                <p className="text-blue-400 text-xl">
                                    <FiSend />
                                </p>
                            </button>
                        </div>
                    </div>
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
                    </div>
                </div>
            </section>
            <section id="tracking" className="flex flex-col w-screen h-screen justify-center items-center bg-white">
                <div className="w-full sm:w-1/2 p-4 text-center">
                    <input type="text" onChange={v => setCode(v.target.value.toUpperCase())} value={code}
                        placeholder="Start typing your ticket id" className="input text-2xl rounded-2xl bg-blue-50 border-2" />
                    <Link to={`/ticket/id/${code}`} type="button" disabled={!code}
                        className={`${code ? '' : 'opacity-50'} btn btn-animated disabled:opacity-50 bg-blue-200 w-auto px-4 p-2 mt-6 text-xl`}>
                        Search
                    </Link>
                </div>
            </section>
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default Landing
