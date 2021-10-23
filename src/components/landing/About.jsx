import React from 'react';

const About = ({ className }) => {
    return (
        <section id="about" className="bg-about">
            <div className={`${className} flex items-center justify-center h-96`}>
                <h2 className="text-4xl font-medium">Acerca de</h2>
            </div>
        </section>
    );
};

export default About;
