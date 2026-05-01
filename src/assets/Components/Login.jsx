import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const {signIn,resetPassword,loginWithGoogle,theme} = useContext(AuthContext);
    const [showPassword,setShowPassword]=useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const [fault,setFault] = useState('');
    const [success,setSuccess] = useState(false);
    const emailRef = useRef()
    const notify = () => {
        toast("Signed in successfully!");
    }

    console.log(location)
    const notify2 = () => {
        toast("Wrong Credentials, Failed to Sign In")
    }

    function handleLogin(e){
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email,password)
        .then(result=>{
            console.log(result.user);
            setFault('');
            setSuccess(true);
            e.target.reset();
            notify();
            navigate(location.state || '/')

        }).catch(error=>{
            console.log(error);
            setFault(error.message);
            setSuccess(false);
            notify2();
        })
    }

    function handleGoogleSignIn(){
        loginWithGoogle()
        .then(result=>{
            console.log(result.user)
            setFault('')
            setSuccess(true)
            toast("Signed in with Google Account")
            navigate(location.state || '/')
        }).catch(error=>{
            console.log(error.message)
        })
    }

    function forgottenPassword(){
        const email = emailRef.current.value

        resetPassword(email)
        .then(()=>{
            toast("Password reset link sent to your email")
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

  return (
    <div className='mt-30 mb-20'>
         <fieldset style={{background: theme === "dark" && "white", color: theme === "dark" && "black"}} className="fieldset bg-blue-200 mx-auto max-sm:ml-4 border-base-300 rounded-box w-xs border p-4">
            <h1 className='text-3xl font-bold text-center'>Login</h1>

            <form onSubmit={handleLogin}>
                <label className="label">Email</label>
            <input style={{color: theme === "dark" && "white"}} type="email" ref={emailRef} name='email' className="input" placeholder="Email" />

            <label className="label">Password</label>
            <input style={{color: theme === "dark" && "white"}} type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" />

            <div style={{color: theme === "dark" && "white"}} onClick={()=>setShowPassword(!showPassword)} className='w-8 h-8 flex justify-center items-center font-bold relative left-60 bottom-9 cursor-pointer'>{showPassword ? "Hide" : "Show"}</div>

            <h1>Don't have an account? Please <Link className='text-purple-800 font-bold' to={'/reg'}>register</Link></h1>

            <button className="btn btn-neutral mt-4 
            text-[1.5em] font-bold w-full">Login</button>
            </form>

            {fault && <h1 className='font-bold 
            text-red-700'>{fault}</h1>}

            {success && <h1 className='font-bold 
            text-green-700'>Signed In Successfully!</h1>}

            <a onClick={forgottenPassword} className='link link-hover'>Forgotten Password?</a>

            <div className='text-center text-xl font-bold'>OR</div>

                        <button onClick={handleGoogleSignIn} className="btn bg-white text-black 
            border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
            </button>


        </fieldset>

            




    </div>
  )
}

export default Login