import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from './AuthContext'
import { updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'

const Register = () => {
    const {createUser,verifyEmail,theme} = useContext(AuthContext)
    const [showPassword,setShowPassword]=useState(false)
    const [fault,setFault] = useState('')
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate()
    const notify = () => {
        toast("Account Created!");
    }

    function handleRegister(e){
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const photo = e.target.photo.value
        const password = e.target.password.value


        createUser(email,password)
        .then(result=>{
            console.log(result.user);
            setFault('');
            setSuccess(true);
            e.target.reset();
            notify()
            navigate('/')

            verifyEmail(result.user)
            .then(()=>{
                toast("A verification link has been sent to your email")
            })

            const profile = {
                displayName: name,
                photoURL: photo
            }

            updateProfile(result.user, profile)
            .then(()=>{
                console.log("Profile updated")
            }).catch(error=>{
                console.log(error)
            })

        }).catch(error=>{
            console.log(error);
            setFault(error.message);
            setSuccess(false)
        })
    }


  return (
    <div className='mt-30 mb-20'>
        <form onSubmit={handleRegister}>
            <fieldset style={{background: theme === "dark" && "white", color: theme === "dark" && "black"}} className="fieldset bg-amber-200 mx-auto max-sm:ml-4 border-base-300 rounded-box w-xs border p-4">
            <h1 className='text-3xl font-bold text-center'>Register</h1>

            <label className="label">Name</label>
            <input style={{color: theme === "dark" && "white"}} type="text" name='name' className="input" placeholder="Your Name" />

            <label className="label">Email</label>
            <input style={{color: theme === "dark" && "white"}} type="email" name='email' className="input" placeholder="Email" />

            <label className="label">PhotoUrl</label>
            <input style={{color: theme === "dark" && "white"}} type="url" name='photo' className="input" placeholder="Photo URL" />

            <label className="label">Password</label>
            <input style={{color: theme === "dark" && "white"}} type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password"/>

            <div style={{color: theme === "dark" && "white"}} onClick={()=>setShowPassword(!showPassword)} className='w-8 h-8 flex justify-center items-center font-bold relative left-60 bottom-10.5 cursor-pointer'>{showPassword ? "Hide" : "Show"}</div>

            <h1>Already have an account? <Link className='text-purple-800 font-bold' to={'/login'}>login</Link></h1> 

            <button className="btn btn-neutral mt-4 font-bold 
            text-[1.5em]">Create Account</button>

            {fault && <h1 className='font-bold 
            text-red-700'>{fault}</h1>}

            {success && <h1 className='font-bold 
            text-green-700'>Account Created Successfully!</h1>}
            
            </fieldset>
        </form>
    </div>
  )
}

export default Register