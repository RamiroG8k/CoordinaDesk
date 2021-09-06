import { BsSearch } from 'react-icons/bs';
import { Paginator } from 'components/shared';
import { Switch } from '@headlessui/react';
import Select from 'components/shared/Select';

const DataTable = ({ onSearch, columns = [], data = {}, onEvent, onUpdate, placeholder }) => {
    // const [limit, setLimit] = useState(pages[0]);
    const { rows, total, from, to, last_page: last, current_page: current } = data;
    let timer;

    const keyPressed = () => {
        clearTimeout(timer);
    }

    const keyReleased = (term) => {
        // Prevent errant multiple timeouts from being generated
        clearTimeout(timer);
        timer = setTimeout(() => {
            onSearch(term?.toLowerCase());
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
        <section className="flex flex-col w-full">
            <div className="flex justify-between items-center header sm:py-6 gap-4 sm:gap-10 py-4">
                <div className="search relative w-2/3">
                    <input type="text" placeholder={`Busqueda por ${placeholder ?? 'nombre'}`} onKeyPress={keyPressed} onKeyUp={(e) => keyReleased(e.target.value)}
                        className="input border-0 rounded-xl input-primary placeholder-font-bold px-10" />
                    <p className="absolute left-4 text-brand-200 top-1/3">
                        <BsSearch />
                    </p>
                </div>
                <div className="limit w-1/3">
                    <Select array={[10, 20, 30, 50, 100]} item="pages" onChange={(value) => console.log(value)} />
                </div>
            </div>
            <section className="data justify-center align-center w-full card shadow-lg rounded-3xl p-2 sm:py-8 overflow-x-auto bg-gray-50 dark:bg-gray-800">
                <table className="table-auto w-full divide-y">
                    {(columns.length > 0) && <thead className="text-center">
                        <tr className="table-row">
                            {columns.map((name, i) => <th key={i} className="px-2 py-4">{name}</th>)}
                        </tr>
                    </thead>}
                    {rows && <tbody className="text-center divide-font-medium space-y-4 text-gray-800">
                        {rows.map((row, i) =>
                            <tr key={i} className={row?.active === false ? 'text-gray-400' : 'table-row'}>
                                {Object.values(row).map((e, j) => {
                                    const reference = e.action ? { action: e.action, email: row.email, page: current } : null;
                                    // console.log(typeof e !== 'boolean');
                                    return typeof e !== 'boolean' ? (
                                        <td key={j} className={`${e?.icon ? 'hover:bg-brand-100 cursor-pointer' : ''} 'p-2'`}>
                                            {e.action ? (e.action === 'delete' ?
                                                <Switcher checked={row.active} data={reference} /> :
                                                <Details icon={e.icon} data={reference} />) : e}
                                        </td>
                                    ) : null;
                                })}
                            </tr>
                        )}
                    </tbody>}
                    <tbody>
                        <tr>
                            <p className="text-2xl text-center font-bold text-gray-500 py-4">No data found</p>
                        </tr>
                    </tbody>
                </table>
            </section >
            <Paginator total={total} pages={{ from, to, current, last }} onChange={(e) => e !== current ? onUpdate(e) : null}
                className="py-4" />
        </section>
    );
};

export default DataTable;
