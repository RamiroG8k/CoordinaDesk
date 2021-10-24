import { BsChevronLeft, BsChevronDoubleLeft, BsChevronRight, BsChevronDoubleRight } from 'react-icons/bs';

const Paginator = ({ pages: { total = 0, from = 0, to = 0, current = 0, last = 0 }, onChange, className }) => {
    const handleChange = (page) => {
        const goTo = page > last ? last : page < 1 ? 1 : page;
        onChange(goTo);
    };

    const buttons = [
        { icon: <BsChevronDoubleLeft />, label: undefined, toPage: 1, disabled: false },
        { icon: <BsChevronLeft />, label: undefined, toPage: current - 1, disabled: false },
        { icon: undefined, label: current > 0 ? current - 1 : 0, toPage: undefined, disabled: true },
        { icon: undefined, label: current, toPage: undefined, disabled: true },
        { icon: undefined, label: '...', toPage: undefined, disabled: true },
        { icon: undefined, label: last, toPage: undefined, disabled: true },
        { icon: <BsChevronRight />, label: undefined, toPage: current + 1, disabled: false },
        { icon: <BsChevronDoubleRight />, label: undefined, toPage: last, disabled: false },
    ];

    return (
        <div className={`${className} flex items-center justify-center sm:justify-between z-0`}>
            <div className="flex justify-center sm:hidden shadow rounded-xl overflow-hidden">
                <button onClick={() => handleChange(current - 1)}
                    className="px-3 py-2 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800">
                    <BsChevronLeft />
                </button>
                <p className="px-3 py-2 text-sm text-gray-500">
                    Pagina {current} de {last}
                </p>
                <button onClick={() => handleChange(current + 1)}
                    className="px-3 py-2 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800">
                    <BsChevronRight />
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700 dark:text-gray-400">
                    Mostrando <span className="font-medium">{from}</span> a <span className="font-medium">{to}</span> de{' '}
                    <span className="font-medium">{total}</span> elementos
                </p>
                <div className="flex rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 divide-x divide-gray-100 dark:divide-gray-900 shadow">
                    {buttons.map((e, i) =>
                        <button key={i} onClick={() => handleChange(e.toPage)} disabled={e.disabled}
                            className={`${e.icon ? 'px-2 text-gray-500' : 'px-3 dark:text-gray-400'} py-2 hover:bg-black hover:bg-opacity-10`}>
                            <p className="text-sm">{e.icon ?? e.label}</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Paginator;
