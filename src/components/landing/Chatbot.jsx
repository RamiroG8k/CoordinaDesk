// Common
import { useRef, useEffect, useState } from 'react';
// Services | Data
import { apiInstance } from 'services';
// Others
import lottie from 'lottie-web';
import ChatbotAnimation from '../../assets/chatbot.json';
import { FiSend } from 'react-icons/fi';
import { BiBot, BiCommentEdit } from 'react-icons/bi';
import ScrollableFeed from 'react-scrollable-feed';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Chatbot = ({ onCreate, ticket }) => {
    const [chat, setChat] = useState([
        { answer: 'Hola soy Deskbot!' },
        { answer: 'Estoy aquí para ayudar, Por favor pregunta algo para empezar! 🔥' },
    ]);
    const [question, setQuestion] = useState('');
    const [create, setCreate] = useState({ length: false, wrong: false });

    const chatbotContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: chatbotContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: ChatbotAnimation
        });
        Aos.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        setChat([
            { answer: 'Hola soy Deskbot!' },
            { answer: 'Estoy aquí para ayudar, Por favor pregunta algo para empezar! 🔥' },
        ]);
        setCreate({ length: false, wrong: false });
    }, [ticket]);

    const chatHandler = ({ code }) => {
        if (code === 'Enter') {
            askNLP();
        }
    }

    const askNLP = async () => {
        if (question) {
            setChat([...chat, { question }]);
            await apiInstance.post('/chatbot/evaluate', { question })
                .then(({ data }) => {
                    setChat([...chat, { question }, data !== '' ? data : { answer: 'Vaya!, parece que no entiendo del todo tu pregunta, intenta de nuevo por favor' }]);
                    setCreate({
                        length: chat.length >= 10,
                        wrong: data === '' ? true : false
                    });
                }).catch(({ response: { data: error } }) => {
                    console.log(error);
                });
        }
        setQuestion('');
    };

    const TextRow = ({ question, answer }) => {
        return (
            <div className={`${question ? 'justify-end pl-10 sm:pl-20' : 'justify-start pr-10 sm:pr-20'} flex gap-2 items-center my-2`}>
                {answer && <div className="p-2 w-10 h-10 rounded-full bg-blue-100 dark:bg-gray-800 flex justify-center items-center">
                    <p className="text-2xl dark:text-blue-200">
                        <BiBot />
                    </p>
                </div>}

                <p className={`${question ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'} px-4 py-2 border border-blue-200 dark:border-gray-900 rounded-xl break-words text-sm max-w-full dark:text-gray-200`}>
                    {question ?? answer}
                </p>
            </div>
        );
    };

    return (
        <section className="relative flex flex-col w-screen h-screen items-center bg-white dark:bg-gray-800">
            <div data-aos="fade-in" className="flex flex-col justify-center items-center h-1/3 p-4 sm:p-10 text-center w-full sm:max-w-6xl">
                <h1 className="text-4xl sm:text-6xl font-semibold p-2 sm:p-4 dark:text-gray-300">Coordina Desk</h1>
                <p className="font-medium text-md sm:text-xl text-gray-600 dark:text-gray-500">Coordina Desk es una plataforma web para apoyar a los estudiantes de ingeniería en computación en la solución de problemas y dudas con ayuda de Deskbot (nuestro chatbot) y de su propio help desk.</p>
            </div>

            <div className="relative flex h-2/3 w-full sm:gap-20 sm:px-10 xl:px-20 sm:pt-10">
                <div className="hidden sm:flex relative w-full sm:w-1/2 h-full justify-center items-center">
                    <div ref={chatbotContainer} className="absolute sm:w-2/3 z-10" />
                    <div className="absolute right-10 top-20 sm:w-52 sm:h-52 bg-blue-50 dark:bg-blue-900 rounded-full z-0" />
                    <div className="absolute left-1/4 bottom-20 sm:w-24 sm:h-24 bg-blue-100 dark:bg-blue-700 rounded-full z-0" />
                </div>
                <div className="flex flex-col justify-between h-full bg-blue-200 dark:bg-blue-900 rounded-t-6xl w-full sm:w-1/2 p-3 sm:p-4 overflow-hidden" >
                    <div className="relative flex flex-col w-full h-full gap-2 sm:gap-4">
                        {(create.length || create.wrong) && <button onClick={() => onCreate(true)}
                            className="text-justify animate-pulse hover:animate-none focus:animate-none absolute w-full flex items-center gap-4 px-4 h-14 bg-yellow-400 bg-opacity-80 rounded-t-5xl">
                            <p className="text-2xl">
                                <BiCommentEdit />
                            </p>
                            <p className="break-words leading-3 text-xs font-medium">Si aún no te ha resultado útil la información, puedes crear un ticket para dar seguimiento a tu caso con folio de referencia, Toca aquí!</p>
                        </button>}
                        <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-700 rounded-5xl p-4 overflow-y-scroll scrollbar-hide">
                            <ScrollableFeed>
                                {chat?.map((e, i) => <TextRow key={i} {...e} />)}
                            </ScrollableFeed>
                        </div>
                        <div className="bottom flex w-full gap-2">
                            <input onChange={v => setQuestion(v.target.value)} onKeyDown={chatHandler}
                                value={question} type="text" placeholder="Haz tu pregunta"
                                className="input rounded-3xl bg-white dark:bg-gray-700 border-2 border-blue-100 dark:border-gray-800 w-full dark:text-white" />
                            <button onClick={() => askNLP()} disabled={!question}
                                className="btn-animated w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex justify-center items-center focus:outline-none disabled:opacity-50">
                                <p className="text-blue-400 dark:text-white text-xl">
                                    <FiSend />
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chatbot;
