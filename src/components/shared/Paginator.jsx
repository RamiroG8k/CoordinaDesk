import { BsChevronLeft, BsChevronDoubleLeft, BsChevronRight, BsChevronDoubleRight } from 'react-icons/bs';

const Paginator = ({ total, pages: { from, to, current, last }, onChange, className }) => {
    const handleChange = (page) => {
        onChange(page > last ? last : page < 1 ? 1 : page);
    };

    return (
        <div className={`${className} flex items-center justify-between sm:px-6`}>
            <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50">
                    Anterior
                </button>
                <button className="ml-3 relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50">
                    Siguiente
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{from}</span> a <span className="font-medium">{to}</span> de{' '}
                        <span className="font-medium">{total}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button onClick={() => handleChange(1)} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <BsChevronDoubleLeft />
                        </button>
                        <button onClick={() => handleChange(current - 1)}
                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-2 border text-sm font-medium">
                            <span className="sr-only">Previous</span>
                            <BsChevronLeft />
                        </button>

                        {current > 1 && <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            {current - 1}
                        </button>}
                        <button aria-current="page" className="z-10 bg-brand-50 border-brand-500 text-brand-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            {current}
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                        </span>
                        {current < last && <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            {last}
                        </button>}

                        <button onClick={() => handleChange(current + 1)}
                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                            <span className="sr-only">Next</span>
                            <BsChevronRight />
                        </button>
                        <button onClick={() => handleChange(last)} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <BsChevronDoubleRight />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
};

export default Paginator;
