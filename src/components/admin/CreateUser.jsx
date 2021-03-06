// Common
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// Components
import { Select } from 'components/shared';
// Services
import { apiInstance } from 'services';
import { toast } from 'react-toastify';
import { errorMessages } from 'utils/data';

const CreateUser = ({ close, onCreate }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

    const create = async (body) => {
        setLoading(!loading);
        await apiInstance.post('/user', body)
            .then(({ data }) => {
                onCreate();
                toast.success('Usuario creado satisfactoriamente', {
                    position: toast.POSITION.TOP_RIGHT
                });
                close();
            }).catch(({ response: { data: error } }) => {
                const { customText } = errorMessages.find((e) => e.message === error.message);
                reset();
                
                toast.error(customText, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
        await setLoading(false);
    };

    return (
        <>
            <form id="createUser" onSubmit={handleSubmit(create)} className="p-4 sm:p-6 sm:pt-4">
                <fieldset disabled={loading} className="space-y-3">
                    <div>
                        <label htmlFor="email" className="text-sm ml-2 mb-1 dark:text-gray-500">Email</label>
                        <input id="email" {...register('email', { required: true })}
                            type="email" autoComplete="off" maxLength={200}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400" />
                        {errors.email && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="role" className="text-sm ml-2 mb-1 dark:text-gray-500">Rol</label>
                        <Controller control={control} name="role" defaultValue="ASSISTANT" rules={{ required: true }}
                            render={({ field: { onChange } }) => (
                                <Select array={['ASSISTANT', 'COORDINATOR']} onChange={onChange}
                                    activeStyle="bg-blue-100 dark:bg-gray-800" parentStyle="z-10"
                                    buttonStyle="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400"
                                    dropdownStyle="bg-white dark:bg-gray-700 dark:text-gray-500" />
                            )} />
                        {errors.role && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                    </div>
                </fieldset>
            </form>
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                <button form="createUser" type="submit" disabled={loading}
                    className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-400 dark:bg-blue-600  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:w-auto transition" >
                    {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                    <p className="text-white text-base sm:text-sm font-medium">
                        {loading ? 'Creando...' : 'Crear'}
                    </p>
                </button>
                <button type="button" onClick={() => close()}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto transition" >
                    <p className="text-gray-700 dark:text-white text-base sm:text-sm font-medium">Cerrar</p>
                </button>
            </div>
        </>
    );
};

export default CreateUser;
