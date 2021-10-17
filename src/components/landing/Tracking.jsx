// Common
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Others
import lottie from 'lottie-web';
import TrackingAnimation from '../../assets/working.json';

const Tracking = () => {
    const [code, setCode] = useState('');
    const writerContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: writerContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: TrackingAnimation
        });
    }, []);

    return (
        <section id="tracking" className="flex flex-col sm:flex-row w-screen h-screen bg-white sm:px-20 xl:px-36">
            <div className="flex flex-col w-full sm:w-1/3 h-full items-start p-4 sm:pt-20">
                <div className="my-8">
                    <h3 className="text-3xl sm:text-5xl font-semibold leading-tight">Haz tu <span className="text-blue-300">seguimiento</span> fácil</h3>
                    <p className="text-xl font-medium my-4">
                        Acceso a la información que se te proporciona con tu ID de referencia, al instante! 
                    </p>
                </div>
                <input type="number" pattern="[0-9]+" min="0" onChange={v => setCode(v.target.value.toUpperCase())} value={code}
                    placeholder="Ticket ID" className="input text-xl rounded-2xl bg-blue-50 border-2" />
                <Link to={{ pathname: code ? '/ticket/tracking' : '/', id: code }} type="button" disabled={!code}
                    className={`${code ? '' : 'opacity-50'} btn btn-animated disabled:opacity-50 bg-blue-200 w-auto px-4 p-2 mt-6 text-xl`}>
                    Rastrear
                </Link>
            </div>
            <div className="flex w-full sm:w-2/3 h-full justify-center items-center">
                <div ref={writerContainer} className="absolute sm:w-2/3" />
                <div className="sm:w-96 sm:h-96 bg-blue-50 rounded-full" />
            </div>
        </section>
    );
};

export default Tracking;
