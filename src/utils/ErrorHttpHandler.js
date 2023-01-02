const handleErrorResponse = (er) => { 
    if(!er?.response){
        return "Could not contact the server"
    }else if(er.response?.status===400){
        return "Bad request"
    }else if(er.response?.status===401){
        return 'Unauthorized'
    }else if(er.response?.status===403){
        return 'Access denied'
    }else if(er.response?.status===404){
        return 'Not found'
    }else if(er.response?.status===408){
        return 'Request Timeout'
    }else if(er.response?.status===0){
        return 'Could not access the server'
    }else  {
        return 'Something went wrong'
    }
}

export default handleErrorResponse