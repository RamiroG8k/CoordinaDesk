// Common
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// Services
import { apiInstance } from 'services';
import { toast } from 'react-toastify';
// Assets
import LogoLarge from 'assets/images/Logo-Large.png';
import LogoSquare from 'assets/images/Logo-Square.png';
import LogoLargeDark from 'assets/images/Logo-Large-Dark.png';
import { errorMessages } from 'utils/data';

const Activate = ({ history }) => {
    const { id, token } = useParams();

    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const activate = async (body) => {
        setLoading(!loading);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await apiInstance.put('/user/activate', { ...body, _id: id }, config)
            .then(({ data }) => {
                history.push('/');
                toast.success(`Se ha activado correctamente su cuenta, intente iniciar con su correo y contraseña`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }).catch(({ response }) => {
                const { data: error } = response;
                if (response.status === 404) {
                    toast.error('Usuario no encontrado, Por favor contacta con un Coordinador', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    return;
                }   
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
    }

    return (
        <section className="flex w-screen h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-800 sm:bg-blue-50 sm:dark:bg-gray-800 justify-center items-center">
            <div className="w-full sm:w-96 z-10">

                <div className="flex relative justify-center items-center mb-8">
                    <img className="block lg:hidden h-14 w-14" alt="logo" src={LogoSquare} />
                    <div className="hidden lg:block">
                        <img className="dark:hidden h-10 w-auto" alt="logo" src={LogoLarge} />
                        <img className="hidden dark:block h-10 w-auto" alt="logo" src={LogoLargeDark} />
                    </div>
                </div>

                <div className="h-1/2 sm:bg-white sm:dark:bg-gray-600 sm:shadow-md p-10 rounded-3xl mx-auto">
                    <div className="text-center">
                        <h3 className="text-gray-900 dark:text-gray-900 font-bold text-2xl">Listo para Acceder!</h3>
                        <h4 className="text-gray-500 dark:text-gray-800 text-xs">Configura las credenciales para poder tener acceso a tu cuenta</h4>
                    </div>

                    {/* Form Section*/}
                    <form id="form" onSubmit={handleSubmit(activate)} className="my-6">
                        <div className="space-y-3 mb-4">
                            <div>
                                <label htmlFor="name" className="text-sm ml-2 mb-1">Nombre</label>
                                <input id="name" {...register('name', { required: true })}
                                    type="text" autoComplete="off" maxLength={200}
                                    className="input rounded-xl bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                                {errors.name && <span className="ml-2 text-xs text-red-400">Este campo es obligatorio</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm ml-2 mb-1">Contraseña</label>
                                <div className="relative flex items-center">
                                    <input id="password" {...register('password', { required: true })}
                                        type={hidden ? 'password' : 'text'} autoComplete="off" maxLength={200}
                                        className="input rounded-xl pr-14 bg-blue-100 bg-opacity-60 dark:bg-gray-700" />
                                    <button onClick={() => setHidden(!hidden)} type="button" className="absolute right-2 p-2">
                                        <p className="text-gray-600 dark:text-black text-xs font-medium uppercase">
                                            {hidden ? 'mostrar' : 'ocultar'}
                                        </p>
                                    </button>
                                </div>
                                {errors.password && <span className="ml-2 text-xs text-red-400">Este campo es obligatorio</span>}
                            </div>
                        </div>
                    </form>
                    {/* END: Form Section */}

                    <button form="form" type="submit" className="py-2 bg-blue-200 dark:bg-gray-900 btn btn-animated hover:bg-blue-300 active:bg-blue-200">
                        <p className="flex justify-center items-center font-bold text-lg text-white dark:text-gray-400">
                            {loading ? <>
                                <svg className="absolute left-1/4 animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cargando...
                            </> : 'Activar cuenta'}
                        </p>
                    </button>
                </div>
            </div>

            <div className="sm:hidden absolute -bottom-20 rounded-tl-full rounded-tr-full w-2/3 h-1/5 bg-blue-100 dark:bg-gray-700 z-0 opacity-75" />
        </section>
    );
};

export default Activate;
