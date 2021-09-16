import { useState } from 'react';
import { BiUserCircle, BiUpArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';


const sections = [
    {
        name: 'Section 1',
        goTo: '#',
    },
    {
        name: 'Section 2',
        goTo: '#',
    },
    {
        name: 'Section 3',
        goTo: '#',
    },
];

const socials = [
    { icon: <FaFacebookF />, url: 'https://www.google.com' },
    { icon: <FaInstagram />, url: 'https://www.google.com' },
    { icon: <FaLinkedinIn />, url: 'https://www.google.com' },
    { icon: <FaTwitter />, url: 'https://www.google.com' },
    { icon: <FaYoutube />, url: 'https://www.google.com' },
];

const Landing = () => {
    const [code, setCode] = useState('');

    const socialURLS = socials.map(({ url, icon }, i) =>
        <a key={i} href={url} target="_blank" rel="noreferrer"
            className={`w-8 h-8 rounded-full bg-blue-300 hover:bg-blue-400 text-white flex justify-center items-center transition transform hover:scale-105`}>
            <p className="text-xl">{icon}</p>
        </a>
    );

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <header className="flex w-full h-16 bg-blue-50 px-8 py-4 justify-between items-center">
                <div className="flex justify-center">
                    <img className="block lg:hidden h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" />
                    <img className="hidden lg:block h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" />
                </div>
                <div className="hidden sm:flex gap-6 items-center">
                    {sections.map(({ name, goTo }) =>
                        <a href={goTo}
                            className="font-medium hover:text-blue-800 transition transform hover:scale-105 hover:bg-blue-50">{name}</a>
                    )}

                    <Link to="/login"
                        className="bg-blue-200 hover:scale-105 hover:font-medium transform transition px-3 py-1 rounded-xl">
                        <div className="flex items-center gap-1 text-lg text-gray-700">
                            <p>Login</p>
                            <BiUserCircle />
                        </div>
                    </Link>

                </div>
            </header>

            <section className="flex flex-col w-screen h-screen items-center bg-white pt-32">
                <h1 className="text-4xl sm:text-6xl font-semibold p-2 sm:p-4">CoordinaDesk</h1>

                <div className="w-full sm:w-1/2 p-4 text-center">
                    <input type="text" pattern="[a-zA-Z0-9]" onChange={v => setCode(v.target.value.toUpperCase())} value={code}
                        placeholder="Start typing your ticket id" className="input text-2xl rounded-2xl bg-blue-50 border-2" />
                </div>
            </section>
            {/* 
            <div className="z-10 w-full h-full flex justify-center items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
            </div> */}

            <footer className="flex flex-col gap-6 bg-blue-50 p-10">
                <div className="flex justify-between">
                    <div className="flex justify-center">
                        <img className="block lg:hidden h-6 w-auto" alt="Workflow"
                            src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" />
                        <img className="hidden lg:block h-6 w-auto" alt="Workflow"
                            src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" />
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center">
                        {socialURLS}
                    </div>

                </div>
                <div className="flex flex-col sm:flex-row place-self-center text-center justify-between w-full sm:w-1/2">
                    {sections.map(({ name, goTo }) =>
                        <a href={goTo}
                            className="font-medium hover:text-blue-800 transition transform hover:scale-105 p-1">{name}</a>
                    )}
                </div>
                <div className="flex flex-col gap-4 text-center sm:text-left sm:grid grid-cols-3">
                    <div className="">
                        <div className="border border-blue-200 my-2" />
                        <p>2021 CoordinaDesk. All rights reserved</p>
                    </div>


                    <div className="flex justify-center">
                        <button onClick={scrollToTop}
                        className="flex items-center gap-2 rounded-lg text-lg font-medium text-gray-700 px-4 hover:bg-white hover:scale-105 transition transform">
                            <p>To the Top</p>
                            <BiUpArrowAlt/>
                        </button>
                    </div>

                    <div className="terms">
                        <div className="border border-blue-200 my-2" />
                        <div className="flex justify-between">
                            <p>Terms of service</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Landing
