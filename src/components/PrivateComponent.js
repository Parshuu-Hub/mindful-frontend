import {Navigate,Outlet} from 'react-router-dom'

export const PrivateComponent=()=>{
    const auth=localStorage.getItem('user-signUp-info');
    return auth?<Outlet/>:<Navigate to={'/home'}/>

}