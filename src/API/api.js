import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'ab7d5628-aec0-474e-9943-33f227b84e02'
    }
})


export const usersAPI = {
    getUsers(page, pageSize) {
        return instance.get(`users?page=${page}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(id) {
        console.warn('Obsolete method, use profileAPI.getProfile, please')
        return profileAPI.getProfile(id)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    }
}


export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status: status})
    },
    updatePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image", photoFile)

        return instance.put('profile/photo', formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put('profile', profile)
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe, captcha = {}) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}




