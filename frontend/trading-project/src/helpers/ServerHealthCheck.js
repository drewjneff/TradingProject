import axios from 'axios';

export const checkServerStatus = () => {
    return axios.get('http://127.0.0.1:5001/api/health')
        .then(response => {
            if (response.status === 200 && response.data.status === 'running') {
                return true;
            } else {
                return false;
            }
        })
        .catch(() => {
            return false;
        });
};