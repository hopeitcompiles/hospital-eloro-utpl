import axios from "axios"
import { getAppURL } from "../utils/Urls"

const base_url=getAppURL()

const get_roles=async ()=>{
    let url= base_url+'roles'   
    const response = await axios.get(`${url}`).then(result => result.data)
    return response
}

export{
    get_roles
}