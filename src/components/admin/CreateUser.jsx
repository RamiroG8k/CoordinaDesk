import { useForm } from 'react-hook-form';

const Body = ({ setLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log(setLoading);

    const create = async (body) => {
        setLoading((loading) => !loading);
        // setTimeout(() => {            
        //     console.log(body);
        // }, 1000)
        // await apiInstance.post('/auth/login', body)
        //     .then(({ data }) => {
        //         saveCredentials(data);
        //         history.push('/home');
        //     }).catch(({ response: { data: error } }) => {
        //         console.log(error);
        //     });
        // await setLoading(false); 
    };

    return (
        <form id="createUser" onSubmit={handleSubmit(create)} className="my-6">
            <div className="space-y-3">
                <div>
                    <label htmlFor="email" className="text-sm ml-2 mb-1">Email</label>
                    <input id="email" {...register('email', { required: true })} type="text" autoComplete="off"
                        className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                    {errors.email && <span className="ml-2 text-xs text-red-400">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="role" className="text-sm ml-2 mb-1">Rol</label>
                    <input id="role" {...register('role', { required: true })} type="text" autoComplete="off"
                        className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                    {errors.role && <span className="ml-2 text-xs text-red-400">This field is required</span>}
                </div>
            </div>
        </form>
    );
};

const Actions = ({ loading }) => {
    return (
        <button form="createUser" type="submit" onClick={() => console.log(true)}
            className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-400 dark:bg-blue-600  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:w-auto transition" >
            <p className="text-white text-base sm:text-sm font-medium">
                {loading ? <>
                    <svg className="absolute left-1/4 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando...
                </> : 'Crear'}
            </p>
        </button>
    );
};

const CreateUser = () => {
    // return (
    //     <>
    //         <Body setLoading={setLoading} />
    //         <Actions loading={loading} />
    //     </>
    // );
};

CreateUser.Body = Body;
CreateUser.Actions = Actions;

export default CreateUser;
