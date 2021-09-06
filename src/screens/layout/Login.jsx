import { useForm } from 'react-hook-form';

const Login = ({ history }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        history.push('/home');
    };

    return (
        <section className="flex w-screen h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-800 sm:bg-blue-50 sm:dark:bg-gray-800 justify-center items-center">
            <div className="w-full sm:w-96 z-10">
                <div className="flex justify-center mb-8">
                    <img className="block lg:hidden h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" />
                    <img className="hidden lg:block h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" />
                </div>

                <div className="h-1/2 sm:bg-white sm:dark:bg-gray-600 sm:shadow-md p-10 rounded-3xl mx-auto">
                    <div className="text-center">
                        <h3 className="text-gray-900 dark:text-gray-900 font-bold text-2xl">Welcome back</h3>
                        <h4 className="text-gray-500 dark:text-gray-800 text-xs">Enter your credentials to access to your account</h4>
                    </div>

                    {/* Form Section*/}
                    <form id="form" onSubmit={handleSubmit(onSubmit)} className="my-6">
                        <div className="space-y-3 mb-4">
                            <div>
                                <input {...register("email", { required: true })} className="input bg-blue-100 bg-opacity-60 dark:bg-gray-700"
                                    type="text" placeholder="Username" autoComplete="off" />
                                {errors.email && <span className="ml-2 text-xs text-red-400">This field is required</span>}
                            </div>
                            <div>
                                <input {...register("password", { required: true })} className="input bg-blue-100 bg-opacity-60 dark:bg-gray-700"
                                    type="password" placeholder="Password" autoComplete="off" />
                                {errors.password && <span className="ml-2 text-xs text-red-400">This field is required</span>}
                            </div>
                        </div>
                    </form>
                    {/* END: Form Section */}

                    <button form="form" type="submit" className="py-2 bg-blue-200 dark:bg-gray-900 btn btn-animated hover:bg-blue-300 active:bg-blue-200">
                        <p className="font-bold text-lg text-white dark:text-gray-400">Log In</p>
                    </button>
                </div>
                <p className="text-center mt-5 dark:text-gray-300">Powered by <a href="https://xifralifestyle.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-300">Xifra</a></p>
            </div>

            <div className="sm:hidden absolute -bottom-20 rounded-tl-full rounded-tr-full w-2/3 h-1/5 bg-blue-100 dark:bg-gray-700 z-0 opacity-75" />
        </section>
    );
};

export default Login;