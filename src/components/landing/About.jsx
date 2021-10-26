import React from 'react';

const About = ({ className }) => {
    return (
        <section id="about" className="bg-about h-96">
            <div className={`${className} flex flex-col gap-4 items-center justify-center h-full p-2`}>
                <h2 className="text-3xl sm:text-5xl font-semibold">Acerca de nosotros</h2>
                <p className="w-full max-w-screen-md text-center font-medium text-xl">
                    Somos tan solo un equipo que se quiere titular de la manera mas rapida posible, claro ayudando a los demas companeros con lo que mas sentimos que nos hizo falta.
                </p>
            </div>
        </section>
    );
};

export default About;
