const baseUrl = process.env.REACT_APP_API_URL




export const fetchSinToken = (endPoint, data, method = 'GET') => {
    //api url
    const url = `${baseUrl}/${endPoint}/` //localhost:400/api/{auth/event}

    //get method
    if (method === 'GET') {
        return fetch(url)
    } else {
        //post put delete method
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export const fetchConToken = (endPoint, data, method = 'GET') => {
    //api url
    const url = `${baseUrl}/${endPoint}` //localhost:400/api/{auth/event}
    const token = localStorage.getItem('token') || ''   //obtiene token de localStorage
    //get method
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        })
    } else {
        //post put delete method
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}