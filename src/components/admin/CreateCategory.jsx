// Common
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// Data | Services
import { apiInstance } from 'services';
import { toast } from 'react-toastify';
import { errorMessages } from 'utils/data';

const CreateCategory = ({ close, onCreated, defaultCategory }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const create = async (body) => {
        setLoading(!loading);
        await apiInstance.post('/category', body)
            .then(({ data }) => {
                onCreated();
                toast.success('Categoría creada satisfactoriamente', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(({ response: { data: error } }) => {
                reset();

                const { customText } = errorMessages.find((e) => e.message === error.message);

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

    const update = async (body) => {
        setLoading(!loading);
        await apiInstance.put(`/category/${defaultCategory._id}`, { ...body, _id: defaultCategory._id })
            .then(({ data }) => {
                onCreated();
                toast.success('Categoría modificada satisfactoriamente', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(({ response: { data: error } }) => {
                const { customText } = errorMessages.find((e) => e.message === error.message);

                toast.error(customText, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
        await setLoading(false);
    };

    const requestHandler = (body) => {
        defaultCategory ? update(body) : create(body);
    };

    return (
        <>
            <form id="createCategory" onSubmit={handleSubmit(requestHandler)} className="p-4 sm:p-6 sm:pt-4">
                <fieldset disabled={loading} className="space-y-3">
                    <div>
                        <label htmlFor="category" className="text-sm ml-2 mb-1 dark:text-gray-500">Nombre</label>
                        <input id="category" {...register('category', { required: true })} defaultValue={defaultCategory?.category ?? ''}
                            type="text" autoComplete="off" maxLength={200}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400" />
                        {errors.category && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                    </div>

                    <div className="form-group form-check inline-flex items-center dark:text-gray-500 text-sm ml-2 mb-1">
                        <Controller control={control} name="isActive" defaultValue={defaultCategory?.isActive ?? true}
                            render={({ field: { onChange, value } }) => (
                                <input type="checkbox" id="isActive" checked={value ? true : false}
                                    className="form-check-input" onChange={onChange} value={value} />
                            )} />
                        <label htmlFor="isActive" className="form-check-label ml-2">Categoría activa</label>
                    </div>
                </fieldset>
            </form>
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                <button form="createCategory" type="submit" disabled={loading}
                    className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-400 dark:bg-blue-600  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:w-auto transition" >
                    {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                    <p className="text-white text-base sm:text-sm font-medium">
                        {loading ? (defaultCategory ? 'Modificando...' : 'Creando...') : (defaultCategory ? 'Modificar' : 'Crear')}
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

export default CreateCategory;
