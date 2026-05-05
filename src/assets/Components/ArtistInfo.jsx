import React, { use, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { AuthContext } from './AuthContext'

const ArtistInfo = () => {
    const artistData = useLoaderData()
    const navigate = useNavigate()
    const {user} = use(AuthContext)
    const [arts,setArts] = useState([])

      useEffect(()=>{
          if(user?.email){
            fetch(`http://localhost:3000/arts?email=${user.email}`)
            .then(res=>res.json())
            .then(data=>{
                setArts(data)
            })
          }
      },[user?.email])

  return (
    <div className='text-center mt-20 font-semibold max-sm:text-left max-sm:ml-4'>
        <div style={{display: artistData.artistImage ? "flex" : "none"}} className='justify-center items-center max-sm:justify-start'>
          <img className='h-70 w-70 rounded-[50%]' src={artistData.artistImage} alt="image of the artist" />
          </div>

        <h1>Name: <span className='font-extrabold'>{artistData.artistName}</span></h1>

        <h1>Email: <span className='font-extrabold'>{artistData.artistEmail}</span></h1>

        <h1>Total Artworks: <span className='font-extrabold'>{arts.length}</span></h1>

        <div className='mt-20 mb-20'>
            <button onClick={()=>navigate(-1)} className='btn btn-primary w-37.5 h-12.5 font-bold text-[1.2em]'>Go Back</button>
        </div>
    </div>
  )
}

export default ArtistInfo