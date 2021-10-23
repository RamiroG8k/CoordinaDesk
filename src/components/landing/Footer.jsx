// Services | Data
import { sections, socials } from 'utils/data';
// Assets
import LogoLarge from 'assets/images/Logo-Large.png';
import LogoSquare from 'assets/images/Logo-Square.png';
// Others
import { BiUpArrowAlt } from 'react-icons/bi';
import { scrollToTop } from 'utils';

const Footer = () => {
    const socialURLS = socials.map(({ url, icon }, i) =>
        <a key={i} href={url} target="_blank" rel="noreferrer"
            className={`w-8 h-8 rounded-full bg-blue-300 hover:bg-blue-400 text-white flex justify-center items-center transition transform hover:scale-105`}>
            <p className="text-xl">{icon}</p>
        </a>
    );

    return (
        <footer className="flex flex-col gap-6 bg-blue-50 dark:bg-gray-900 dark:text-gray-500 p-10">
            <div className="flex justify-between">
                <div className="flex justify-center">
                    {/* <img className="block lg:hidden h-6 w-auto" alt="Workflow"
                    src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" /> */}
                    <img className="block lg:hidden h-14 w-14" alt="Workflow"
                        src={LogoSquare} />
                    {/* <img className="hidden lg:block h-6 w-auto" alt="Workflow"
                    src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" /> */}
                    <img className="hidden lg:block h-10 w-auto" alt="Workflow"
                        src={LogoLarge} />
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                    {socialURLS}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row place-self-center text-center justify-between w-full sm:w-1/2">
                {sections.map(({ name, goTo }) =>
                    <a href={goTo} key={name}
                        className="font-medium hover:text-blue-800 transition transform hover:scale-105 p-1">{name}</a>
                )}
            </div>
            <div className="flex flex-col gap-4 text-center sm:text-left sm:grid grid-cols-3">
                <div className="">
                    <div className="border border-blue-200 dark:border-gray-700 my-2" />
                    <p>2021 CoordinaDesk. All rights reserved</p>
                </div>

                <div className="flex justify-center">
                    <button onClick={scrollToTop}
                        className="flex items-center gap-2 rounded-lg text-lg font-medium text-gray-700 px-4 hover:bg-white hover:scale-105 transition transform">
                        <p>To the Top</p>
                        <BiUpArrowAlt />
                    </button>
                </div>

                <div className="terms">
                    <div className="border border-blue-200 dark:border-gray-700 my-2" />
                    <div className="flex justify-between">
                        <p>Terms of service</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
