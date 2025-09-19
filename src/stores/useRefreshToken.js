// useRefreshToken.js
import axios from '../api/axios';

const useRefreshToken = (setAuth) => {
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        // The API should return a complete auth object
        const newAuth = {
            user: response.data.user,
            roles: response.data.roles,
            accessToken: response.data.accessToken
        };

        setAuth(newAuth); // Directly set the new auth object
        return newAuth.accessToken;
    };
    return refresh;
};

export default useRefreshToken;