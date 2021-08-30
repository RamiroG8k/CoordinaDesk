// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Login = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const html = document.getElementsByTagName('html')[0];

    const onSubmit = (data) => {
        console.log(data);
        // history.push('/home');
    };

    // useEffect(() => {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         html.classList.add('scheme-dark');
    //     } else {
    //         html.classList.remove('scheme-dark');
    //     }
    // }, [])

    return (
        <section className="flex w-screen h-screen bg-gray-50 dark:bg-gray-800 sm:bg-blue-50 sm:dark:bg-gray-800 justify-center items-center">
            <div className="w-full sm:w-96">
                <div className="flex justify-center mb-8">
                    <img className="block lg:hidden h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.cb8046c163f77190406dfbf4dec89848.svg" />
                    <img className="hidden lg:block h-6 w-auto" alt="Workflow"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-logotype.128b6e12eb85d013bc9f80a917f57efe.svg" />
                </div>

                <div className="h-1/2 sm:bg-white sm:shadow-md p-10 rounded-3xl mx-auto">
                    <div className="text-center">
                        <h3 className="text-gray-900 font-bold text-2xl">Welcome back</h3>
                        <h4 className="text-gray-500 text-xs">Enter your credentials to access to your account</h4>
                    </div>

                    {/* Form Section*/}
                    <form id="form" onSubmit={handleSubmit(onSubmit)} className="my-6">
                        <div className="space-y-3 mb-4">
                            <div>
                                <input {...register("email", { required: true })} className="input bg-blue-50"
                                    type="text" placeholder="Username" />
                                {errors.email && <span className="ml-2 text-xs text-red-400">This field is required</span>}
                            </div>
                            <div>
                                <input {...register("password", { required: true })} className="input bg-blue-50"
                                    type="password" placeholder="Password" />
                                {errors.password && <span className="ml-2 text-xs text-red-400">This field is required</span>}
                            </div>
                        </div>
                    </form>
                    {/* END: Form Section */}

                    <button form="form" type="submit" className="py-2 bg-blue-200 btn btn-animated hover:bg-blue-300 active:bg-blue-200">
                        <p className="font-bold text-lg text-white">Log In</p>
                    </button>
                </div>
                <p className="text-center mt-5">Powered by <a href="https://xifralifestyle.com" target="_blank" rel="noopener noreferrer" className="text-blue-700">Xifra</a></p>
            </div>
        </section>
    );
};

export default Login;