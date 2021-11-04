// Components
import SidebarSections from './sidebar.data';
// Other
import Axios from 'axios';
import { removeCredentials } from 'utils';
import { toast } from 'react-toastify';

const apiInstance = Axios.create(
    {
        baseURL: process.env.REACT_APP_API,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
);

apiInstance.interceptors.request.use(
    async config => {
        const token = await localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => { return Promise.reject(error); }
)

// Add a response interceptor
apiInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async (error) => {
    const { response: { data: { status } } } = error;
    if (status === 401) {
        toast.error('Sesion expirada, por favor ingresa tus credenciales de nuevo', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
        });

        removeCredentials();
        setTimeout(() => { 
            window.location.reload();
        }, 3000);
        return;
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export { apiInstance, SidebarSections };