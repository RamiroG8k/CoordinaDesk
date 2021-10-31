// Common
import { useEffect, useState } from 'react';
// Services | Data
import { apiInstance } from 'services';
// Other
import { FaUserCircle } from 'react-icons/fa';
import { firstCapitalized, toDate } from 'utils';
import { toast } from 'react-toastify';

const UserDetails = ({ id }) => {
    const [data, setData] = useState();

    useEffect(() => {
        if (id) {
            fetchInfo(id);
        }
    }, []);

    const fetchInfo = async (id) => {
        await apiInstance.get(`/user/${id}`)
            .then(({ data }) => {
                setData(data);
            }).catch(({ response: { data: error } }) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };


    return (
        <div className="flex flex-col px-6 py-4 text-xs bg-gray-50 dark:bg-gray-700">
            {data && <>
                <div className="flex gap-4">
                    <p className="text-7xl text-blue-200">
                        <FaUserCircle />
                    </p>
                    <div className="w-full">
                        <h4 className="text-3xl font-semibold capitalize">{data.name}</h4>
                        <p className="text-sm">{data.role}</p>
                        <p className="text-sm">{data.email}</p>
                        <div className="flex justify-between">
                            <p className="text-sm">Status: </p>
                            <div className="flex gap-2 text-xs uppercase">
                                <span className={`${data.isActive ? 'bg-green-200' : 'bg-gray-200'} p-1 rounded-full`}>
                                    {data.isActive ? 'Activo' : 'Inactivo' }
                                </span>

                                {data.isDeleted && <span className="bg-red-200 p-1 rounded-full">Eliminado</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border w-full rounded-full dark:border-gray-800 mt-4" />
                <div className="flex flex-col sm:flex-row justify-between w-full py-2 text-xs dark:text-gray-400">
                    <div>
                        <p>Creado el: {firstCapitalized(toDate(data.createdAt))}</p>
                        <p>Modificado: {firstCapitalized(toDate(data.updatedAt))}</p>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default UserDetails;
