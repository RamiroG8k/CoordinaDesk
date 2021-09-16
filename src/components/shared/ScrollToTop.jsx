import { useState, useEffect } from 'react';
// import { Transition } from '@headlessui/react';
import { IoIosArrowUp } from 'react-icons/io'

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', toggleVisibility);
    }, [])

    const toggleVisibility = () => {
        window.pageYOffset > 300 ? setVisible(true) : setVisible(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="fixed right-14 bottom-20">
            {visible && <button onClick={() => scrollToTop()} 
                className="bg-white rounded-2xl p-2 shadow-xl focus:outline-none">
                <p className="text-4xl text-brand">
                    <IoIosArrowUp/>
                </p>
            </button>
            }
        </div>
    );
};

export default ScrollToTop;
