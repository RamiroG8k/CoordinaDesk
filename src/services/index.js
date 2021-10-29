// Components
import SidebarSections from './sidebar.data';
// Other
import Axios from 'axios';

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
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export { apiInstance, SidebarSections };