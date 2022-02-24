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

