import { BsSearch } from 'react-icons/bs';
import { Paginator, Select } from 'components/shared';
import { Switch } from '@headlessui/react';

const DataTable = ({ onSearch, columns = [], data = {}, onEvent, onUpdate, placeholder }) => {
    const { rows = [], total, from, to, last_page: last, current_page: current } = data;
    let timer;

    const keyPressed = () => {
        clearTimeout(timer);
    }

    const keyReleased = (term) => {
        // Prevent errant multiple timeouts from being generated
        clearTimeout(timer);
        timer = setTimeout(() => {
            console.log(term);
            // onSearch(term.toLowerCase());
        }, 500);
    }

    const handleItem = ({ action, email, page }) => {
        const item = (data.data.find(searched => searched.email === email));
        onEvent({ action, item, page });
    };

    const Switcher = ({ checked, data }) => {
        return (
            <>
                <Switch checked={checked} onChange={() => handleItem(data)}
                    className={`${checked ? 'bg-brand-400' : 'bg-gray-300'
                        } relative inline-flex items-center h-5 rounded-full w-10 transition-colors focus:outline-none`}>
                    <span className={`${checked ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-3 h-3 transform bg-white rounded-full transition-transform`} />
                </Switch>
                <p className="text-xs">{checked ? 'Activo' : 'Inhabilitado'}</p>
            </>
        )
    };

    const Details = ({ icon, data }) => {
        return (
            <button onClick={() => handleItem(data)} className="p-2 focus:outline-none">
                <p className="text-xl">{icon}</p>
            </button>
        );
    };

    return (
        <section className="flex flex-col w-full space-y-4 sm:space-y-6">
            <div className="flex w-full justify-between items-center header gap-4 sm:gap-10">
                <div className="search relative w-full sm:w-1/2">
                    <input type="text" placeholder={placeholder ?? 'Search by name'} onKeyPress={keyPressed} onKeyUp={(e) => keyReleased(e.target.value)}
                        className="input border-0 rounded-xl input-primary placeholder-font-bold px-10 bg-gray-50 dark:bg-gray-800 shadow" />
                    <p className="absolute left-4 text-brand-200 top-1/3 dark:text-gray-500">
                        <BsSearch />
                    </p>
                </div>
                <div className="limit w-1/4">
                    <Select array={[10, 20, 30, 50, 100]} item="pages" onChange={(value) => console.log(value)}
                        activeStyle="bg-gray-100 dark:bg-gray-800" 
                        buttonStyle="bg-gray-50 shadow dark:bg-gray-800 dark:text-gray-400"
                        dropdownStyle="bg-white dark:bg-gray-700 dark:text-gray-500"
                        parentStyle="z-10" />
                </div>
            </div>
            <section className="data justify-center align-center w-full card shadow rounded-3xl p-2 sm:py-8 overflow-x-auto bg-gray-50 dark:bg-gray-800">
                <table className="table-auto w-full divide-y">
                    {(columns.length > 0) && <thead className="text-center">
                        <tr className="table-row">
                            {columns.map((name, i) => <th key={i} className="px-2 py-4">{name}</th>)}
                        </tr>
                    </thead>}
                    <tbody className="text-center divide-font-medium space-y-4 text-gray-800">
                        {rows.length ? rows.map((row, i) =>
                            <tr key={i}>
                                {Object.values(row).map((e, j) => {
                                    const reference = e.action ? { action: e.action, email: row.email, page: current } : null;
                                    return typeof e !== 'boolean' ? (
                                        <td key={j} className={`${e?.icon ? 'hover:bg-brand-100 cursor-pointer' : ''} 'p-2'`}>
                                            {e.action ? (e.action === 'delete' ?
                                                <Switcher checked={row.active} data={reference} /> :
                                                <Details icon={e.icon} data={reference} />) : e}
                                        </td>
                                    ) : null;
                                })}
                            </tr>
                        ) :
                            <tr>
                                <td colSpan={columns.length}>
                                    <p className="text-2xl text-center font-bold text-gray-500 py-4">No data found</p>
                                </td>
                            </tr>}
                    </tbody>
                </table>
            </section >
            <Paginator pages={{ total, from, to, current, last }} onChange={(e) => e !== current ? console.log(e) : null} 
            className="" />
        </section>
    );
};

export default DataTable;
