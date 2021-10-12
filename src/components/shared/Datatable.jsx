// Common
import { useEffect } from 'react';
// Components
import { Paginator, Popover, Select } from 'components/shared';
// Others
import { BsSearch } from 'react-icons/bs';

const DataTable = ({ onSearch, data = [], onEvent, onUpdate, placeholder }) => {
    const { rows = [], columns = [], actions, total, from, to, last, current } = data;
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

    // const handleItem = ({ action, email, page }) => {
    //     const item = (data.data.find(searched => searched.email === email));
    //     onEvent({ action, item, page });
    // };

    useEffect(() => {
        // console.log('DATA', data);
    }, [data])



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
                    <Select array={[10, 20, 30, 50, 100]} item="(limite)" onChange={(value) => onUpdate(current, value)}
                        activeStyle="bg-blue-100 dark:bg-gray-800"
                        buttonStyle="bg-gray-50 shadow dark:bg-gray-800 dark:text-gray-400"
                        dropdownStyle="bg-white dark:bg-gray-700 dark:text-gray-500"
                        parentStyle="z-10" />
                </div>
            </div>

            <section className="data justify-center align-center w-full shadow rounded-3xl p-2 overflow-x-auto bg-gray-50 dark:bg-gray-800">
                <table className="table-auto w-full divide-y dark:divide-gray-600">
                    {(columns.length > 0) && <thead className="text-center">
                        <tr className="table-row uppercase">
                            {columns.map((name, i) =>
                                <th key={i} className="text-gray-700 dark:text-gray-400 font-semibold pb-2 px-2">{name}</th>)
                            }
                        </tr>
                    </thead>}
                    <tbody className="text-center divide-font-medium space-y-4 text-gray-800 divide-y dark:divide-gray-700">
                        {rows.length ? rows.map((row, i) => {
                            // console.log(row.status ? [actions[0]] : actions);
                            return (
                                <Popover key={i} buttonAs="tr" actions={actions && (row.status ? [actions[0], actions[1]] : actions)}
                                    onAction={(action) => onEvent({ item: row, action })}
                                    docs={{ title: 'Acciones por usuario', description: 'Pueden variar dependiendo el status del seleccionado' }}
                                    className="cursor-pointer hover:text-blue-800">
                                    {Object.values(row).slice(1).map((e, j) => {
                                        return (
                                            <td key={j} className="py-2 dark:text-gray-500">
                                                <p className={`${(typeof e) === 'boolean' ? e ?
                                                    'text-xs uppercase bg-green-100 dark:bg-green-900' : 'text-xs uppercase bg-gray-200 dark:bg-gray-900' : ''} px-2 py-1 rounded-full`}>
                                                    {(typeof e) === 'boolean' ? (e ? 'activo' : 'no habilitado') : e}
                                                </p>
                                            </td>
                                        );
                                    })}
                                </Popover>
                            );
                        }) : <tr>
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
