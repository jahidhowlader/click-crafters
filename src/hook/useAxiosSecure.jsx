import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';

const axiosSecure = axios.create({
    baseURL: 'https://click-crafters-server-jahidhowlader.vercel.app',
});

const useAxiosSecure = () => {
    const { setLoading, logOut } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {

            const token = localStorage.getItem('access-token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {

                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut().then(() => {
                        setLoading(false)
                    })
                    navigate('/signin');
                }

                return Promise.reject(error);
            }
        );
    }, [logOut, navigate, setLoading]);

    return [axiosSecure];
};

export default useAxiosSecure;