import React, { use } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import ImageSlider from './ImageSlider'
import { AuthContext } from './AuthContext'

const Home = () => {
  const data = useLoaderData()
  const {theme} = use(AuthContext)
  const navigate = useNavigate()

  return (
    <>
    <ImageSlider></ImageSlider>
        
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

      <div style={{color: theme === "dark" ? "whitesmoke" : "green"}} className='mt-6 mb-6 flex justify-center items-center'>
              <Link to='/explore' className='font-bold text-2xl underline'>View All Arts</Link>
      </div>
    </>
  )
}

export default Home