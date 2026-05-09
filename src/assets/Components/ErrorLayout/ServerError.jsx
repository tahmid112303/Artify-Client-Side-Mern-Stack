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
                Something went wrong.
            </p>

            <p className='text-gray-600 mb-6'>
                {error?.message || "Server is not responding"}
            </p>

            <Link to='/'>
                <button className='bg-black text-white px-5 py-2 rounded-lg'>
                    Go Home
                </button>
            </Link>

        </div>
    )
}

export default ErrorPage