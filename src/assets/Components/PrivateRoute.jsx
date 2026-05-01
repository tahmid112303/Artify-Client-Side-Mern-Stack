import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate, useLocation } from 'react-router'

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()

    console.log(location)

    if(loading){
        return <div className='flex justify-center items-center'>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }

    if(user){
        return children
    }

    return <Navigate state={location?.pathname} to={'/login'}></Navigate>
}

export default PrivateRoute