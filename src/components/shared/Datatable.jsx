// Common
import { useState } from 'react';
// Components
import { BsSearch } from 'react-icons/bs';
// Others
import { Paginator, Popover, Select } from 'components/shared';

const DataTable = ({ popoverTitle, onSearch, data = [], onEvent, onUpdate, placeholder }) => {
    const [limit, setLimit] = useState(10);
    const [term, setTerm] = useState('');
    const { rows = [], columns = [], actions, pagination } = data;
    let timer;

    const keyPressed = () => {
        clearTimeout(timer);
    };

    const keyReleased = (search) => {
        // Prevent errant multiple timeouts from being generated
        clearTimeout(timer);
        timer = setTimeout(() => {
            onSearch(pagination.current, limit, search.trim().toLowerCase());
        }, 500);
    };

    const handleLimit = (value) => {
        setLimit(value);
        onUpdate(pagination.current, value, term.trim().toLowerCase());
    };

    return (
        <section className="relative flex flex-col w-full space-y-4 sm:space-y-6">
            <div className="flex w-full justify-between items-center header gap-4 sm:gap-10">
                <div className="search relative w-full sm:w-1/2">
                    <input type="text" placeholder={placeholder ?? 'Search by name'} value={term} onChange={v => setTerm(v.target.value)}
                        onKeyPress={keyPressed} onKeyUp={(e) => keyReleased(e.target.value)}
                        className="input border-0 rounded-xl input-primary placeholder-font-bold px-10 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 shadow" />
                    <p className="absolute left-4 text-brand-200 top-1/3 dark:text-gray-500">
                        <BsSearch />
                    </p>
                </div>
                <div className="limit w-1/4">
                    <Select array={[10, 20, 30, 50, 100]} item="(límite)" defaultValue={10}
                        onChange={(v) => handleLimit(v)}
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
                            const newActions = actions.length > 1 ? (row.status ? [actions[0], actions[1]] : [actions[0], actions[2], actions[3]]) : actions;

                            return (
                                <Popover key={i} buttonAs="tr" actions={newActions}
                                    onAction={(action) => onEvent({ item: row, action })}
                                    docs={{ title: popoverTitle, description: 'Pueden variar dependiendo el status del seleccionado' }}
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
                                <p className="text-2xl text-center font-bold text-gray-500 py-4">No hay informacion</p>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </section >
            <Paginator pages={pagination}
                onChange={(e) => e !== pagination.current ? onUpdate(e, limit) : null} />
        </section>
    );
};

export default DataTable;
