// Common
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Footer, Header } from 'components/Landing';
import { Disclosure, ScrollToTop } from 'components/shared';
// Services
import { apiInstance } from 'services';
// Others
import { FiSend } from 'react-icons/fi';
import lottie from 'lottie-web';
// import TrackingAnimation from '../.. /assets/77409-working.json';
import TrackingAnimation from '../../assets/77409-working.json';

const Landing = () => {
    const [code, setCode] = useState('');
    const [question, setQuestion] = useState('');
    const [categories, setCategories] = useState();
    const [chat, setChat] = useState([]);

    const chatbot = useRef(null);
    const lottieContainer = useRef(null);

    useEffect(() => {
        fetchSomething();

        lottie.loadAnimation({
            container: lottieContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: TrackingAnimation
        });

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
        setChat([...chat, { question }]);

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
            <section id="tracking" className="flex flex-col sm:flex-row w-screen h-screen bg-white sm:px-20 xl:px-36">
                <div className="flex flex-col w-full sm:w-1/3 h-full items-start p-4 pt-20">
                    <div className="my-8">
                        <h3 className="text-5xl font-semibold leading-tight">Make your <span className="text-blue-300">tracking</span> easy</h3>
                        <p className="text-xl font-medium my-4">
                            Keep track of your ticket with your ID reference
                        </p>
                    </div>
                    <input type="text" onChange={v => setCode(v.target.value.toUpperCase())} value={code}
                        placeholder="Start typing your ticket id" className="input text-2xl rounded-2xl bg-blue-50 border-2" />
                    <Link to={`/ticket/id/${code}`} type="button" disabled={!code}
                        className={`${code ? '' : 'opacity-50'} btn btn-animated disabled:opacity-50 bg-blue-200 w-auto px-4 p-2 mt-6 text-xl`}>
                        Search
                    </Link>
                </div>

                <div className="flex w-full sm:w-2/3 h-full justify-center items-center">
                    <div ref={lottieContainer} className="absolute sm:w-2/3" />
                    <div className="sm:w-96 sm:h-96 bg-blue-50 rounded-full" />
                </div>

            </section>
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default Landing
