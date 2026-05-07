import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import Swal from 'sweetalert2'


const MyFavorites = () => {
    const {user} = useContext(AuthContext)
    const [fav,setFav] = useState([])

    useEffect(()=>{
        if(user?.email){
          fetch(`http://localhost:3000/favorites?fav=${user.email}`)
          .then(res=>res.json())
          .then(data=>{
              console.log(data)
              setFav(data)
          })
        }
    },[user?.email])

    const handleDeleteFavoriteArt = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result)=>{
            if(result.isConfirmed){
              fetch(`http://localhost:3000/favorites/${id}`,{
                method: "DELETE"
              }).then(res=>res.json())
              .then(data=>{
                  if(data.deletedCount){
                    Swal.fire({
                    title: "Unfavorited",
                    text: "Your art has been removed from My Favorites.",
                    icon: "success"
                  })
                  
                  const remaining = fav.filter(x => x._id !== id)
                  setFav(remaining)
                }
              })
            }
        })




        // fetch(`http://localhost:3000/favorites/${id}`,{
        //   method: "DELETE"
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     if(data.deletedCount){
        //        toast("Removed from My Favorites")
        //        const remaining = fav.filter(x => x._id !== id)
        //        setFav(remaining)
        //     }
        // })
    }

  return (
      <>
        <h1 className='mt-10 text-center text-5xl font-bold max-sm:text-left max-sm:ml-4 max-sm:text-3xl'>My Favorite Arts: {fav.length}</h1>

        <div className='mt-10 mb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-auto w-fit max-sm:ml-4'>
            {fav.map(art=> <div key={art._id} className="card bg-[#bed9ed] text-black w-96 max-sm:w-80 h-auto shadow-sm">
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
      <button onClick={()=>handleDeleteFavoriteArt(art._id)} className="btn btn-primary w-full">Unfavorite</button>
    </div>
  </div>
</div>)}
        </div>
      </>
  )
}

export default MyFavorites