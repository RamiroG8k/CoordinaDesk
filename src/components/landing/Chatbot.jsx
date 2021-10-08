// Common
import { useRef, useEffect, useState } from 'react';
// Components
import { Modal } from 'components/shared';
import { CreateTicket } from 'components/landing';
// Services | Data
import { apiInstance } from 'services';
// Others
import lottie from 'lottie-web';
import ChatbotAnimation from '../../assets/chatbot.json';
import { FiSend } from 'react-icons/fi';
import { BiBot, BiCommentEdit } from 'react-icons/bi';

const Chatbot = () => {
    const [chat, setChat] = useState([]);
    const [question, setQuestion] = useState('');
    const [createTicket, setCreateTicket] = useState(false);
    const [ticket, setTicket] = useState();
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

    }, []);

    const askNLP = async () => {
        if (question) {
            setChat([...chat, { question }]);
            await apiInstance.post('/nlp/evaluate', { question })
                .then(({ data }) => {
                    setChat([...chat, { question }, data !== '' ? data : { answer: 'Vaya!, parece que no entiendo del todo tu pregunta, intenta de nuevo por favor!' }]);
                    setCreate({
                        length: chat.length >= 4,
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
            <div className={`${question ? 'justify-end pl-10 sm:pl-20' : 'justify-start pr-10 sm:pr-20'} flex gap-2 items-center`}>
                {answer && <div className="p-2 w-10 h-10 rounded-full bg-blue-100 flex justify-center items-center">
                    <p className="text-2xl">
                        <BiBot />
                    </p>
                </div>}

                <p className={`${question ? 'bg-blue-100' : 'bg-white'} px-4 py-2 border border-blue-200 rounded-xl break-words text-sm`}>
                    {question ?? answer}
                </p>
            </div>
        );
    };

    return (
        <>
            <Modal visible={createTicket} toggle={setCreateTicket} size="xl" title={ticket ? 'Informacion de ticket' : 'Crear ticket'}>
                {!ticket && <CreateTicket close={setCreateTicket} onCreate={setTicket} />}
                {ticket && <div className="p-4 sm:p-6 sm:pt-4">
                    {JSON.stringify(ticket, null, 4)}
                </div>}
            </Modal>

            <section className="relative flex flex-col w-screen h-screen items-center bg-white">
                <div className="h-1/3 py-4 sm:py-10 text-center w-full sm:w-2/3">
                    <h1 className="text-4xl sm:text-6xl font-semibold p-2 sm:p-4">CoordinaDesk</h1>
                    <p className="font-medium text-md sm:text-xl text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="relative flex h-2/3 w-full sm:gap-20 sm:px-10 xl:px-20 pt-10">
                    <div className="hidden sm:flex relative w-full sm:w-1/2 h-full justify-center items-center">
                        <div ref={chatbotContainer} className="absolute sm:w-2/3 z-10" />
                        <div className="absolute right-10 top-20 sm:w-52 sm:h-52 bg-blue-50 rounded-full z-0" />
                        <div className="absolute left-1/4 bottom-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full z-0" />
                    </div>
                    <div className="flex flex-col justify-between h-full bg-blue-200 rounded-t-6xl w-full sm:w-1/2 p-3 sm:p-4 overflow-hidden" >
                        <div className="relative flex flex-col w-full h-full gap-2 sm:gap-4">
                            {(create.length || create.wrong) && <button onClick={() => setCreateTicket(true)}
                                className="text-justify animate-pulse hover:animate-none focus:animate-none absolute w-full flex items-center gap-4 px-4 h-14 bg-yellow-400 bg-opacity-80 rounded-t-5xl">
                                <p className="text-2xl">
                                    <BiCommentEdit />
                                </p>
                                <p className="break-words leading-3 text-xs font-medium">Si aun no te ha resultado util la informacion, puedes crear un ticket para dar seguimiento a tu caso con folio de referencia, Toca aqui!</p>
                            </button>}
                            <div className="flex flex-col h-full w-full bg-gray-50 rounded-5xl p-4 gap-2 overflow-y-scroll">
                                {chat?.map((e, i) =>
                                    <TextRow key={i} {...e} />
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
                </div>
            </section>
        </>
    );
};

export default Chatbot;
