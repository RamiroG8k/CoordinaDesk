import { AiFillBulb } from 'react-icons/ai';

const Sidebar = ({ status, className }) => {
    return (
        <nav className={`${className} flex flex-col ${status === 'min' ? 'w-20' : 'w-60'} bg-white h-full transition-width duration-500 justify-between gap-2`}>
            <section className="flex justify-center items-center w-full h-16 bg-blue-100 rounded-2xl">
                <p className="uppercase text-lg">{status}</p>
            </section>

            <section className="flex h-full bg-gray-50 rounded-2xl p-2">
                
                <button className="flex justify-center items-center bg-white w-full h-12 rounded-xl shadow-md gap-2 text-gray-800">
                    <p className="text-2xl"><AiFillBulb /></p>
                    {status === 'max' &&<p className="text-lg">Section</p>}
                </button>

            </section>

            <section className="flex justify-center items-center w-full h-16 bg-blue-100 rounded-2xl">
                <p className="uppercase text-lg">end</p>
            </section>
        </nav>
    )
}

export default Sidebar;
