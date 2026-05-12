import React from 'react'
import { useRouteError, Link } from 'react-router'

const ErrorPage = () => {

    const error = useRouteError()

    return (
        <div className='min-h-screen flex flex-col justify-center items-center text-center p-5 bg-gray-100'>

            <h1 className='text-5xl font-bold text-red-500 mb-4'>
                Oops!
            </h1>

            <p className='text-xl mb-2'>
                Server Error
            </p>

            <p className='text-gray-600 mb-6'>
                {error?.message || "Server is not responding"}
            </p>

        </div>
    )
}

export default ErrorPage