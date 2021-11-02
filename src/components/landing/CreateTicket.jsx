// Common
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// Services
import { apiInstance } from 'services';
import { toast } from 'react-toastify';

const CreateTicket = ({ close, onCreate }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const create = async (body) => {
        setLoading(!loading);
        await apiInstance.post('/ticket', body)
            .then(({ data }) => {
                onCreate(data);
                toast.success('Ticket creado satisfactoriamente', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(({ response: { data: error } }) => {
                reset();
                toast.error(error.message, {
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
                <fieldset disabled={loading} className="sm:grid grid-cols-2 space-y-3 gap-x-4">
                    <div className="col-span-2">
                        <label htmlFor="title" className="dark:text-gray-500 text-sm ml-2 mb-1">Título</label>
                        <input id="title" {...register('title', { required: true })}
                            type="text" autoComplete="off" maxLength={200}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" placeholder="Idea principal de manera concreta" />
                        {errors.title && <span className="ml-2 text-xs text-red-400">Este campo es obligatorio</span>}
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="dark:text-gray-500 text-sm ml-2 mb-1">Descripción</label>
                        <textarea id="description" {...register('description', { required: true })}
                            rows="3" maxLength={1000}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                        {errors.description && <span className="ml-2 text-xs text-red-400">Este campo es obligatorio</span>}
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="name" className="dark:text-gray-500 text-sm ml-2 mb-1">Nombre</label>
                        <input id="name" {...register('name', { required: true })}
                            type="text" autoComplete="off" maxLength={200}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                        {errors.name && <span className="ml-2 text-xs text-red-400">Este campo es obligatorio</span>}
                    </div>
                    <div>
                        <label htmlFor="udgId" className="dark:text-gray-500 text-sm ml-2 mb-1">Código de alumno (UDG)</label>
                        <input id="udgId" {...register('udgId', { required: true })} type="number" min={0} autoComplete="off"
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                        {errors.udgId && <span className="ml-2 text-xs text-red-400">Este campo es obligatorio</span>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="dark:text-gray-500 text-sm ml-2 mb-1">Teléfono</label>
                        <input id="phone" {...register('phone')} type="number" min={0} autoComplete="off" maxLength={10}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" placeholder="A 10 digitos" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="email" className="dark:text-gray-500 text-sm ml-2 mb-1">E-mail</label>
                        <input id="email" {...register('email', { required: true })}
                            type="email" autoComplete="off" maxLength={200}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" placeholder="example@domain.xyz" />
                        {errors.email && <span className="ml-2 text-xs text-red-400">Este campo es obligatorio</span>}
                    </div>
                    <div className="col-span-2">
                        <div className="form-group form-check inline-flex items-center dark:text-gray-500 text-sm ml-2 mb-1">
                            <Controller control={control} name="hasEmailUpdates" defaultValue={true} render={({ field: { onChange, value } }) => (
                                <input type="checkbox" id="hasEmailUpdates" checked={value ? true : false}
                                    className="form-check-input" onChange={onChange} value={value} />
                            )} />
                            <label htmlFor="hasEmailUpdates" className="form-check-label ml-2">Recibir notificaciones por email</label>
                        </div>
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
                <button type="button" onClick={() => close(false)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto transition" >
                    <p className="text-gray-700 dark:text-white text-base sm:text-sm font-medium">Cerrar</p>
                </button>
            </div>
        </>
    );
};

export default CreateTicket;
