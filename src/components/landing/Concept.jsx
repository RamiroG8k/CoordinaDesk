import React from 'react';

const Concept = ({ className }) => {
    return (
        <section id="concept" className="bg-concept">
            <div className={`${className} flex items-center justify-center h-96`}>
                <h2 className="text-4xl font-medium">Concepto</h2>
            </div>
        </section>
    );
};

export default Concept;
