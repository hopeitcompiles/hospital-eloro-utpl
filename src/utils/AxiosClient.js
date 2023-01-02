import axios  from "axios"

const setAxiosAuthorization = (token) =>{
    if(token?.startsWith('Bearer ')){
        axios.defaults.headers.common["Authorization"] = `${token}`
    }else{
        delete axios.defaults.headers.common["Authorization"]
    }
}

export{
    setAxiosAuthorization
}