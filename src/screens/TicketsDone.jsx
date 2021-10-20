// Common
import { useEffect, useState } from 'react';
// Components
import { Datatable } from 'components/shared';
// Services | Data
import { apiInstance } from 'services';


const TicketsDone = () => {
    const [data, setData] = useState();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (page, limit) => {
        await apiInstance.get('/ticket/inactive/all', { params: { page, limit } })
            .then(({ data }) => {
                setData({
                    rows: ticketParser(data.content),
                    columns: Object.keys(ticketParser(data.content)[0]).slice(1),
                    // actions: userActions,
                    pagination: {
                        total: data.totalElements,
                        from: data.page > 1 ? ((data.totalElements) / limit + 1) : 1,
                        to: (limit * data.page) > data.totalElements ? data.totalElements : (limit * data.page),
                        current: data.page,
                        last: data.pages,
                        next: data.nextPage
                    }
                    // total: data.totalElements,
                    // current: data.page,
                    // last: data.pages,
                });
            }).catch(console.log);
    };

    const ticketParser = (data = []) => {
        return data.map((ticket) => (
            {
                _id: ticket._id,
                user: ticket.user.name.split(' ')[0],
                role: ticket.user.role,
                priority: ticket.priority,
                status: ticket.isActive,
            }
        ));
    };

    return (
        <section className="space-y-6">
            {/* <Modal visible={create} toggle={setCreate} size="xl" title="Crear usuario">
                <CreateUser close={setCreate} />
            </Modal>
            <Modal visible={details.visible} toggle={(show) => setDetails({ ...details, visible: show })}
                size="xl" title="Detalles de usuario">
                <div className="px-6 py-4 text-xs">
                    <pre>{JSON.stringify(details.data, null, 4)}</pre>
                </div>
            </Modal> */}
            <div className="bg-white shadow-lg dark:bg-gray-700 w-full rounded-4xl p-4 sm:p-10 flex flex-col justify-center items-center" >
                <div className="relative w-full">
                    <h1 className="text-4xl sm:text-5xl text-center font-bold text-gray-400 mb-4 sm:mb-8">Tickets Inhabilitados</h1>
                    {/* <button onClick={() => setCreate(!create)}
                        className="absolute top-0 flex items-center gap-1 btn btn-animated bg-blue-100 dark:bg-gray-600 w-auto px-3 py-2">
                        <p className="text-2xl"><AiOutlineUserAdd /></p>
                        <p className="hidden md:block text-lg">Crear</p>
                    </button> */}
                </div>
                {data && <Datatable data={data}
                    onUpdate={(page, limit) => fetchUsers(page, limit)}
                    onEvent={() => console.log('handleItemEvent')} />}
            </div>
        </section>
    );
};

export default TicketsDone;
