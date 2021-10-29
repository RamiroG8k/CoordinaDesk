import React from 'react';

const Concept = ({ className }) => {
    return (
        <section id="concept" className="bg-concept h-96">
            <div className={`${className} flex flex-col gap-4 items-center justify-center h-full p-2  text-white`}>
                <h2 className="text-3xl sm:text-5xl font-semibold">Concepto</h2>
                <p className="w-full max-w-screen-md text-center font-medium text-xl">
                    Atender las necesidades de los alumnos de manera ordenada, optima y de un modo tan facil que logre tener seguimiento de estas actividades en mayor escala.
                </p>
            </div>
        </section>
    );
};

export default Concept;
