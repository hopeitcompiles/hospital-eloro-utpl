import { useContext, useState } from 'react';
import { RiDeleteBinFill   as DeleteBtn, RiEdit2Fill as EditBtn, RiSearchEyeLine as InspectBtn } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ModalForm, RoleColor, ThemeContext} from '../../../imports';
import { DefaultUserPicture } from '../../../utils/GlobalStaticElements';
import cardStyle from '../css/UserCard.module.css'
const default_image=DefaultUserPicture

export default function UserCard({current_user}) {
    const [cardUser,setCardUser]=useState( current_user)
    const {theme}=useContext(ThemeContext)
    const [showModalImage,setShowModalImage] = useState(false)

    const handleClose=()=>{
        setShowModalImage(false)
    }

  return (
    <div>{showModalImage&&
        <ModalForm  setClose={()=>handleClose()}>
            <img src={cardUser.image}/>
        </ModalForm>
        }
        <div className={`${theme==='dark'?cardStyle.dark:cardStyle.light} ${cardStyle.card} `} id={cardUser.id}>
            <div className={cardStyle.top}>
                <div className={cardStyle.image_container}>
                    <img src={cardUser?.image?cardUser.image:default_image} onClick={()=>setShowModalImage(true)}/>
                </div>  
                <div className={`${cardStyle.information_display} `}>
                    <Link className={`${cardStyle.link}`} to={`/user/${cardUser.ign?cardUser.ign:cardUser.id}`}>
                        <h4>{cardUser.name} {cardUser.lastName}</h4></Link>
                    <p >{cardUser.email} <br/>
                        <RoleColor role={cardUser.role} bold={true}/>
                    </p>
                </div>
            </div>
            <div className={`${cardStyle.bottom}`}>
                <div className={`${cardStyle.admin_area}`}>
                    <div className={`${cardStyle.checkbox}`}>
                        <input type="checkbox" defaultChecked={cardUser?.enabled}/>
                    </div>
                    <div className={cardStyle.btn_section}>
                        <button className={`${cardStyle.delete} ${cardStyle.no_border_button}`}>
                            <DeleteBtn size={20}/>
                        </button>
                        <button className={`${cardStyle.edit} ${cardStyle.no_border_button}`}>
                            <EditBtn size={20}/>
                        </button>
                        <button className={`${cardStyle.inspect} ${cardStyle.no_border_button} `}>
                            <InspectBtn size={20}/>
                        </button>
                    </div>
                </div>
                <div className={cardStyle.drop}>
                </div>
                
            </div>
        </div>
    </div>
  )
}
