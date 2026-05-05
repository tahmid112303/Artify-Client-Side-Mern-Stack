import React, { use, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'


const MyGallery = () => {
  const {user} = use(AuthContext)
  const [arts,setArts] = useState([])
  const navigate = useNavigate()
  
  useEffect(()=>{
      if(user?.email){
        fetch(`http://localhost:3000/arts?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>{
          setArts(data)
        })
      }
  },[user?.email])

  const handleDeleteArt = (id) => {
       Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result)=>{
            if(result.isConfirmed){
              fetch(`http://localhost:3000/arts/${id}`,{
                method: "DELETE"
              }).then(res=>res.json())
              .then(data=>{
                if(data.deletedCount){
                     Swal.fire({
                      title: "Deleted!",
                      text: "Your art has been deleted.",
                      icon: "success"
                  })

                  const remainingArts = arts.filter(art => art._id !== id)
                  setArts(remainingArts)
                }
              })
            }
          })
  }

  return (
    <div>
        <h1 className='text-center font-bold text-5xl mt-10 max-sm:text-left max-sm:ml-4 max-sm:text-3xl'>Number of Arts added: {arts.length}</h1>

        <div className='flex justify-center items-center mt-5 max-sm:justify-start max-sm:ml-4'>
            <button onClick={()=>navigate('/add')} className='btn bg-blue-300 w-37.5 h-12.5 font-bold text-2xl'>{arts.length === 0 ? "Add" : "Add More"}</button>
        </div>

        <div className='mt-20 mb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-auto w-fit max-sm:ml-4'>
            {arts.map(art => <div key={art._id} className="card bg-[#bed9ed] text-black w-96 max-sm:w-80 h-auto shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={art.image}
      alt="art image"
      className="rounded-xl h-55 w-100" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-3xl font-bold">{art.title}</h2>
        <div className='flex flex-col gap-5 mt-10'>
            <p>Artist: <span className='font-bold'>{art.artistName}</span></p>

            <p>Category: <span className='font-bold'>{art.category}</span></p>
        </div>
    <div className="card-actions w-full mt-10">
      <button onClick={()=>navigate(`/artDetail/${art._id}`)} className="btn btn-primary w-full">Details</button>
    </div>

    <div className='flex justify-between w-full mt-4'>
          <button onClick={()=>handleDeleteArt(art._id)} className='btn btn-primary'>Delete</button>

          <button onClick={()=>navigate(`/editArt/${art._id}`)} className='btn'>Update</button>
    </div>
  </div>
</div>)}
        </div>
    </div>
  )
}

export default MyGallery