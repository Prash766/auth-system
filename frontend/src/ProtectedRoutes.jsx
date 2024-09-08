import React from 'react'
import { useRecoilValue } from 'recoil'
import { isAuthenticated, userState } from '../atoms/Auth'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const isAuth = useRecoilValue(isAuthenticated)
    const user= useRecoilValue(userState)
    if(!isAuth){
       return <Navigate to='/login' replace/>
    }
    if(!user.isVerified){
      return   <Navigate to='/verify-email' replace/>
    }
    return children
  
}


export const AuthenticatedRoute = ({children})=>{
    const isAuth = useRecoilValue(isAuthenticated)
    const user= useRecoilValue(userState)
    if(isAuth && user.isVerified) {
        console.log(isAuth)
      return  <Navigate to='/' replace/>
    }
    return children
}

export { ProtectedRoutes}