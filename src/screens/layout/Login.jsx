// Common
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// Assets
import LogoLarge from 'assets/images/Logo-Large.png';
import LogoSquare from 'assets/images/Logo-Square.png';
import LogoLargeDark from 'assets/images/Logo-Large-Dark.png';
// Services | Data
import { apiInstance } from 'services';
import { saveCredentials } from 'utils';
// Others
import { BsArrowLeftShort } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { ModeSwitcher } from 'components/shared';
import { errorMessages } from 'utils/data';

const Login = ({ history }) => {
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const logIn = async (body) => {
        setLoading(!loading);
        body.email = body.email.toLowerCase().trim();

        await apiInstance.post('/auth/login', body)
            .then(({ data }) => {
                saveCredentials(data);
                setLoading(false);
                history.push('/tickets');
                return;
            }).catch(({ response: { data: error } }) => {
                const { customText } = errorMessages.find((e) => e.message === error.message);

                toast.error(customText, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                });
                setLoading(false);
            });
    };

    return (
        <section className="flex w-screen h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-800 sm:bg-blue-50 sm:dark:bg-gray-800 justify-center items-center">
            <div className="w-full sm:w-96 z-10">
                <div className="flex relative justify-center items-center mb-8">
                    <Link to="/" className="absolute left-2 dark:text-gray-400">
                        <BsArrowLeftShort />
                        <p className="text-xs">
                            Inicio
                        </p>
                    </Link>
                    <img className="block lg:hidden h-14 w-14" alt="logo" src={LogoSquare} />
                    <div className="hidden lg:block">
                        <img className="dark:hidden h-10 w-auto" alt="logo" src={LogoLarge} />
                        <img className="hidden dark:block h-10 w-auto" alt="logo" src={LogoLargeDark} />
                    </div>
                </div>

                <div className="h-1/2 sm:bg-white sm:dark:bg-gray-900 sm:shadow-md p-10 rounded-3xl mx-auto">
                    <div className="flex flex-col gap-2 text-center">
                        <h3 className="text-gray-900 dark:text-gray-400 font-bold text-2xl">Log In</h3>
                        <h4 className="text-gray-500 dark:text-gray-500 text-xs">Por favor proporciona tus credenciales para tener acceso a tu cuenta</h4>
                    </div>

                    {/* Form Section*/}
                    <form id="form" onSubmit={handleSubmit(logIn)} className="my-6">
                        <div className="space-y-3 mb-4">
                            <div>
                                <label htmlFor="email" className="dark:text-gray-500 text-sm ml-2 mb-1">E-mail</label>
                                <input id="email" {...register('email', { required: true })}
                                    type="email" autoComplete="off" maxLength={200}
                                    className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400" />
                                {errors.email && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="dark:text-gray-500 text-sm ml-2 mb-1">Contraseña</label>
                                <div className="relative flex items-center">
                                    <input id="password" {...register('password', { required: true })}
                                        type={hidden ? 'password' : 'text'} autoComplete="off" maxLength={200}
                                        className="input rounded-xl pr-14 bg-blue-100 bg-opacity-60 dark:bg-gray-700 dark:text-gray-400" />
                                    <button onClick={() => setHidden(!hidden)} type="button" className="absolute right-2 p-2">
                                        <p className="text-gray-600 dark:text-gray-500 text-xs font-medium uppercase">
                                            {hidden ? 'mostrar' : 'ocultar'}
                                        </p>
                                    </button>
                                </div>
                                {errors.password && <span className="ml-2 text-xs text-red-400">Este campo es requerido</span>}
                            </div>
                        </div>
                    </form>
                    {/* END: Form Section */}

                    <button form="form" type="submit" className="py-2 bg-blue-200 dark:bg-gray-700 btn btn-animated hover:bg-blue-300 active:bg-blue-200">
                        <p className="flex justify-center items-center font-bold text-lg text-white dark:text-gray-900">
                            {loading ? <>
                                <svg className="absolute left-1/4 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cargando...
                            </> : 'Acceder'}
                        </p>
                    </button>
                </div>
                {/* <p className="text-center mt-5 dark:text-gray-300">Powered by <a href="https://github.com/RamiroG8k" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-300">Brand name</a></p> */}
            </div>
            <div className="fixed z-50 -right-4 top-60 transform rotate-90 bg-blue-100 dark:bg-blue-800 px-3 py-2 rounded-b-2xl">
                <ModeSwitcher />
            </div>
            <div className="sm:hidden absolute -bottom-20 rounded-tl-full rounded-tr-full w-2/3 h-1/5 bg-blue-100 dark:bg-gray-700 z-0 opacity-75" />
        </section>
    );
};

export default Login;