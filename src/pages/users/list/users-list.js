import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SessionContext,Pagination,Loading } from "../../../imports"
import { getUserList } from "../../../service/UserService"
import handleErrorResponse from "../../../utils/ErrorHttpHandler"
import UserCard from "../components/UserCard"
import cardStyle from '../css/UserList.module.css'

export default function UserList() {
  const {sessionUser}=useContext(SessionContext)
  const [ usersList, setUsersList ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)
  const [pagination,setPagination]=useState(null)
  const [error,setError]=useState('')
  const [pagePath, setPagePath] = useSearchParams()
  const page_in_path=pagePath.get("page")
  const search_in_path=pagePath.get("search")

  const loadUsers=async () =>{
    setError('')
    setIsLoading(true)
    try{
      const search_param=search_in_path ? search_in_path:"";
      const pagenumber=page_in_path? page_in_path:1;
      const response= await getUserList(pagenumber,search_param)
      const page_info={
        "current":response.number+1,
        "total_pages":response.totalPages,
        "total_items":response.totalElements,
        "showing":response.numberOfElements,
        "last":response.last,
        "first":response.first
      }
      setPagination(page_info)
      setUsersList(response.content)

    }catch(er){
      setError(handleErrorResponse(er))
      setUsersList(null)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    if(sessionUser){
      loadUsers()    
      return;
    }
    setError('Not authenticated')
    setUsersList([])
    setIsLoading(false)
  },[page_in_path,search_in_path,sessionUser])
  
  if(isLoading){
    return(
      <Loading/>
    )
  }
  if(error!==''){
    return <h1>{error}</h1>
  }

  return (
    <section>
      {isLoading?
      <Loading/>:
        <div>
          <div className={cardStyle.container}>
            {
            usersList?.map((user) =>(
                <div key={user.id} >
                    <UserCard current_user={user}/>
                </div>
            ))
            } 
          </div> 
          <Pagination pagination={pagination} />
        </div>
      }</section>
  )
}
