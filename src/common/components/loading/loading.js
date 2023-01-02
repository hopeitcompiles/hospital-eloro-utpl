import { useContext } from 'react';
import { VscLoading   as Spinner } from 'react-icons/vsc';
import {ThemeContext} from './../../../imports'
import style from './css/Loading.module.css'

export default function Loading() {
    const {theme}=useContext(ThemeContext)
  return (
    <div className={`${style.spinner} ${theme==='dark'&&style.dark}`}>
      <Spinner className={style.spinning} size={50}/>
      <a className={style.text}>Loading...</a>
    </div>
  )
}
