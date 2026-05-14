import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ImageSlider from './ImageSlider'
import { AuthContext } from './AuthContext'
import ServerError from './ErrorLayout/ServerError'

const Home = () => {
  const {theme} = use(AuthContext)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false) 

  useEffect(()=>{
      fetch("https://artify-server-side.onrender.com/artsHome")
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  },[])

   if (loading) {
    return (
      <div className='flex justify-center items-center h-screen gap-8 max-sm:justify-start'>
        <h2 className='font-bold text-3xl'>Please wait</h2>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )
  }

  if (error) {
    return <ServerError></ServerError>
  }

  return (
    <>
    <ImageSlider></ImageSlider>

    <h1 className='text-center text-5xl text-blue-800 font-bold mt-10 max-sm:text-left max-sm:ml-4'>Trending Arts</h1>
        
  <div className='mt-20 mb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-auto w-fit max-sm:ml-4'>
            {data.map(art => <div key={art._id} className="card bg-[#bed9ed] text-black w-96 max-sm:w-80 h-auto shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={art.image}
      alt="art image"
      className="rounded-xl h-55 w-100" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title font-bold text-3xl">{art.title}</h2>
        <div className='flex flex-col gap-5 mt-10'>
            <p>Artist: <span className='font-bold'>{art.artistName}</span></p>

            <p>Category: <span className='font-bold'>{art.category}</span></p>
        </div>
    <div className="card-actions w-full mt-10">
      <button onClick={()=>navigate(`/artDetail/${art._id}`)} className="btn btn-primary w-full">Details</button>
    </div>
  </div>
</div>)}
      </div>

      <div style={{color: theme === "dark" ? "whitesmoke" : "green"}} className='mt-6 mb-6 flex justify-center items-center max-sm:justify-start max-sm:ml-4'>
              <Link to='/explore' className='font-bold text-2xl underline'>View All Arts</Link>
      </div>
    </>
  )
}

export default Home