// Common
import { useEffect } from 'react';
// Animate
import Aos from 'aos';
import 'aos/dist/aos.css';

const Concept = ({ className }) => {
    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    return (
        <section id="concept" className="bg-concept h-96">
            <div data-aos="fade-up" className={`${className} flex flex-col gap-4 items-center justify-center h-full p-2  text-white`}>
                <h2 className="text-3xl sm:text-5xl font-semibold">Concepto</h2>
                <p className="w-full max-w-screen-md text-center font-medium text-xl">
                    Atender las necesidades de los alumnos de manera ordenada, óptima y de un modo fácil que logre tener seguimiento de estas actividades a mayor escala.
                </p>
            </div>
        </section>
    );
};

export default Concept;
