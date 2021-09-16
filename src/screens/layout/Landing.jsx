import { useState } from 'react';

const sections = [
    {
        name: 'Section 1',
        goTo: '#',
        icon: ''
    },
    {
        name: 'Section 2',
        goTo: '#',
        icon: ''
    },
    {
        name: 'Section 3',
        goTo: '#',
        icon: ''
    },
    {
        name: 'Section 4',
        goTo: '#',
        icon: ''
    },
    {
        name: 'Section 5',
        goTo: '#',
        icon: ''
    },
];

const Landing = () => {
    const [code, setCode] = useState('')
    return (
        <>
            <header className="flex w-full h-16 bg-gray-100 px-8 py-4 justify-between items-center">
                <div className="flex justify-center">
                    <img className="block lg:hidden h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" />
                    <img className="hidden lg:block h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" />
                </div>
                <div className="hidden sm:flex gap-6">
                    {sections.map(({ name, goTo, icon }) => {
                        return (
                            <a href={goTo}
                            className="font-medium hover:text-blue-800 transition hover:bg-blue-50">{name}</a>
                        );
                    })}
                </div>
            </header>

            <section className="flex flex-col w-screen h-screen items-center bg-gray-300 pt-32">
                <h1 className="text-4xl sm:text-6xl font-semibold p-2 sm:p-4">CoordinaDesk</h1>

                <div className="w-full sm:w-1/2 p-4 text-center">
                    <input type="text" pattern="[a-zA-Z0-9]" onChange={v => setCode(v.target.value.toUpperCase())} value={code} 
                        placeholder="Start typing your ticket id" className="input text-2xl rounded-2xl" />
                </div>
            </section>

            <footer>

            </footer>
        </>
    )
}

export default Landing
