// Common
import { useEffect } from 'react';
// Animate
import Aos from 'aos';
import 'aos/dist/aos.css';

const About = ({ className }) => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <section id="about" className="bg-about h-96">
            <div data-aos="fade-in" className={`${className} flex flex-col gap-4 items-center justify-center h-full p-2 text-white`}>
                <h2 className="text-3xl sm:text-5xl font-semibold">Acerca de nosotros</h2>
                <p className="w-full max-w-screen-md text-center font-medium text-xl">
                    Somos estudiantes de ingeniería en computación que nos gustaría devolver un poco de lo que la carrera nos ha dado ofreciendo una oportunidad a la escalabilidad y agilización del proceso de seguimiento de dudas entre alumnado y coordinación.
                </p>
            </div>
        </section>
    );
};

export default About;
