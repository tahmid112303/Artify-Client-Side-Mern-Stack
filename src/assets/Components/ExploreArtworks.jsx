import React, { useContext, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { AuthContext } from './AuthContext'

const ExploreArtworks = () => {

    const data = useLoaderData()
    const {theme} = useContext(AuthContext)
    const [arts,setArts] = useState(data)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate() 

    function handleSearch(e){
        e.preventDefault()
        setLoading(true)
        const search_item = e.target.search_item.value
        fetch(`https://artify-server-side.onrender.com/arts/search?title=${search_item}`)
        .then(res=>res.json())
        .then(data=>{
            setArts(data)
            setLoading(false)
            e.target.reset()
        })
    }

    if(loading){
      return <div className='flex justify-center items-center'>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }

  return (
      <>

        <h1 className='font-bold text-5xl text-center mt-10 max-sm:text-left max-sm:ml-4'>All Arts</h1>

        <form onSubmit={handleSearch} className='flex gap-2 justify-center items-center mt-10 max-sm:flex-col max-sm:items-start max-sm:ml-4'>
              <label className="input rounded-full">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" name='search_item' placeholder="Search by Title" />
            </label>

            <button className='btn btn-primary rounded-full'>Search</button>
        </form>

          <div className='mt-10 mb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-auto w-fit max-sm:ml-4'>
            {arts.map(art =>  <div key={art._id} className="card bg-[#bed9ed] text-black w-96 max-sm:w-80 h-auto shadow-sm">
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

        <div style={{color: theme === "dark" ? "whitesmoke" : "green"}} className='mt-6 mb-6 flex justify-center items-center max-sm:text-left max-sm:justify-start max-sm:ml-4'>
              <Link to='/' className='font-bold text-2xl underline'>Go to Home Page</Link>
      </div>
      </>
  )
}

export default ExploreArtworks