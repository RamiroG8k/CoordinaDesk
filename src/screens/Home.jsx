import { Datatable, Modal } from 'components/shared';
import { useState } from 'react';

const Home = () => {
    const [modal, setModal] = useState(false);

    return (
        <section className="space-y-6">
            <Modal visible={modal} toggle={setModal} />
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-10 h-96 flex justify-center items-center" >
                <h1 onClick={() => setModal(!modal)} className="text-5xl font-bold text-gray-400">Home</h1>
            </div>


            {/* <div className="relative shadow-md dark:bg-gray-700 w-full rounded-4xl h-96 flex justify-center items-center overflow-hidden" >
                <div className="w-16 h-16 rounded-full bg-red-400 absolute z-0 top-0 left-0" />
                <div className="w-24 h-24 rounded-full bg-purple-200 absolute z-0 top-12 left-1/4" />
                <div className="w-60 h-60 rounded-full bg-blue-400 absolute z-0 -right-10 top-0" />
                <div className="w-44 h-44 rounded-full bg-yellow-400 absolute z-0 -left-20 bottom-0" />
                <div className="w-44 h-44 rounded-full bg-green-200 absolute z-0 -bottom-10" />
                
                <div className="z-10 w-full h-full flex justify-center items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
                <h1 onClick={() => setModal(!modal)} className="text-5xl font-bold text-white">Happiness</h1>
                </div>
                </div>
                <div className="relative shadow-md dark:bg-gray-700 w-full rounded-4xl h-96 flex justify-center items-center overflow-hidden" >
                <div className="w-16 h-16 rounded-full bg-pink-400 absolute z-0 top-0 left-0" />
                <div className="w-24 h-24 rounded-full bg-gray-500 absolute z-0 top-12 left-1/4" />
                <div className="w-60 h-60 rounded-full bg-pink-200 absolute z-0 -right-10 top-0" />
                <div className="w-44 h-44 rounded-full bg-gray-900 bg-opacity-90 absolute z-0 -left-20 bottom-0" />
                <div className="w-44 h-44 rounded-full bg-pink-800 bg-opacity-70 absolute z-0 -bottom-10" />
                
                <div className="z-10 w-full h-full flex justify-center items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
                <div className="flex flex-col">
                <h1 onClick={() => setModal(!modal)} className="text-7xl font-bold text-gray-600">Mariana</h1>
                <h1 onClick={() => setModal(!modal)} className="text-6xl font-bold text-pink-200">Soledad</h1>
                </div>
                </div>
            </div> */}

            
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex justify-center items-center" >
                <Datatable />
            </div>
        </section>
    )
}

export default Home;
