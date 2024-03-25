import axios from './request';
export function login(data) {
    return axios({
        url: '/user/login/login',
        method: 'post',
        data
    });
}



