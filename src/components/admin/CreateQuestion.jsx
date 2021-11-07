// Common
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// Components
import { Select } from 'components/shared';
// Data | Services
import { apiInstance } from 'services';
import { toast } from 'react-toastify';

const CreateQuestion = ({ close, selected, onCreated, defaultFaq }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    useEffect(() => {
        fetchCategories();
    }, [])

    const create = async (body) => {
        console.log(body);
        return;
        setLoading(!loading);
        await apiInstance.post('/faq', body)
            .then(({ data }) => {
                onCreated();
                toast.success('Pregunta creada satisfactoriamente', {
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

    const fetchCategories = async () => {
        await apiInstance.get('/category/all')
            .then(({ data }) => {
                const newCategories = data.map((e) => { return { label: e.category, value: e._id } });
                setCategories(newCategories);
            }).catch(console.log);
    };

    const update = async (body) => {
        setLoading(!loading);
        await apiInstance.put(`/faq/${defaultFaq._id}`, { ...body, _id: defaultFaq._id })
            .then(({ data }) => {
                onCreated();
                toast.success('Pregunta modificada satisfactoriamente', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(console.log);
        await setLoading(false);
    };

    const requestHandler = (body) => {
        defaultFaq ? update(body) : create(body);
    };

    return (
        <>
            <form id="createQuestion" onSubmit={handleSubmit(requestHandler)} className="p-4 sm:p-6 sm:pt-4">
                <fieldset disabled={loading} className="space-y-3 w-full">
                    <div>
                        <label htmlFor="question" className="text-sm ml-2 mb-1 dark:text-gray-500">Pregunta</label>
                        <input id="question" {...register('question', { required: true })} defaultValue={defaultFaq?.question}
                            type="text" autoComplete="off" maxLength={200}
                            className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400" />
                        {errors.question && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="answer" className="text-sm ml-2 mb-1 dark:text-gray-500">Respuesta</label>
                        <textarea id="answer" rows={3} {...register('answer', { required: true })} defaultValue={defaultFaq?.answer}
                            type="text" autoComplete="off" maxLength={100000}
                            className="w-full input rounded-xl border-none bg-blue-100 bg-opacity-60 border dark:bg-gray-700 dark:text-gray-400" />
                        {errors.answer && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                    </div>
                    <div className="flex-grow-0 w-full">
                        <label htmlFor="category" className="text-sm ml-2 mb-1 dark:text-gray-500">Categoria</label>
                        {categories.length > 0 && <Controller control={control} name="category"
                            rules={{ required: true }} defaultValue={(defaultFaq?.category ?? selected._id) ?? null}
                            render={({ field: { onChange } }) => (
                                <Select labels array={categories} onChange={({value}) => onChange(value)} defaultValue={(defaultFaq?.category ?? selected._id) ?? null}
                                    activeStyle="bg-blue-100 dark:bg-gray-800" parentStyle=""
                                    buttonStyle="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400"
                                    dropdownStyle="bg-white dark:bg-gray-700 dark:text-gray-500 z-50" />
                            )} />}
                        {errors.category && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                    </div>
                    <div className="form-group form-check inline-flex items-center dark:text-gray-500 text-sm ml-2 mb-1">
                        <Controller control={control} name="isActive" defaultValue={defaultFaq?.isActive ?? true}
                            render={({ field: { onChange, value } }) => (
                                <input type="checkbox" id="isActive" checked={value ? true : false}
                                    className="form-check-input" onChange={onChange} value={value} />
                            )} />
                        <label htmlFor="isActive" className="form-check-label ml-2">Pregunta activa</label>
                    </div>
                </fieldset>
            </form>
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse gap-2">
                <button form="createQuestion" type="submit" disabled={loading}
                    className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-400 dark:bg-blue-600  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:w-auto transition" >
                    {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                    <p className="text-white text-base sm:text-sm font-medium">
                        {loading ? (defaultFaq ? 'Modificando...' : 'Creando...') : (defaultFaq ? 'Modificar' : 'Crear')}
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

export default CreateQuestion;
