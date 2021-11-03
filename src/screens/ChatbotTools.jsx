// Common
import { useEffect, useRef, useState } from 'react';
// Services | Data 
import { apiInstance } from 'services';
// Others
import lottie from 'lottie-web';
import ChatbotAnimation from '../assets/loader.json';

const ChatbotTools = () => {
    const [training, setTraining] = useState(false);
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

    const trainNlp = async () => {
        await apiInstance.post('/nlp/train')
            .then(({ data }) => {
                setTraining(true);
            }).catch(console.log)
    };

    return (
        <section className="flex flex-col sm:flex-row gap-4">
            <div className="h-72 bg-white w-full sm:w-1/3 shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-10 flex flex-col items-center">
                <div className="flex relative w-full h-full justify-center items-center">
                    <div ref={chatbotContainer} className="absolute z-10" />
                    {/* <div className="absolute right-10 top-20 sm:w-52 sm:h-52 bg-blue-50 dark:bg-blue-900 rounded-full z-0" />
                    <div className="absolute left-1/4 bottom-20 sm:w-24 sm:h-24 bg-blue-100 dark:bg-blue-700 rounded-full z-0" /> */}
                </div>
                <button type="button" onClick={() => trainNlp()} disabled={training}
                    className="btn btn-animated bg-blue-300 border-2 border-blue-500 py-1 rounded-2xl">
                    <p className="text-white text-xl">
                        {training ? 'Entrenando..' : 'Reentrenar'}
                    </p>
                </button>
            </div>
            <div className="h-72 bg-white w-full sm:w-2/3 shadow-md dark:bg-gray-700 rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center">
                Pantalla de informacion
            </div>
        </section>
    );
};

export default ChatbotTools;
