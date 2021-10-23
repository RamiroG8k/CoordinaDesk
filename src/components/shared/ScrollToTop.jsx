import { useState, useEffect } from 'react';
// import { Transition } from '@headlessui/react';
import { IoIosArrowUp } from 'react-icons/io'

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', toggleVisibility);
        return () => {
            setVisible(false);
        }
    }, [])

    const toggleVisibility = () => {
        window.pageYOffset > 300 ? setVisible(true) : setVisible(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className="fixed right-6 bottom-10 sm:right-14 sm:bottom-20 z-50">
            {visible && <button onClick={() => scrollToTop()}
                className="bg-blue-200 dark:bg-blue-800 rounded-full p-2 shadow-xl focus:outline-none">
                <p className="text-4xl text-white">
                    <IoIosArrowUp />
                </p>
            </button>
            }
        </div>
    );
};

export default ScrollToTop;
