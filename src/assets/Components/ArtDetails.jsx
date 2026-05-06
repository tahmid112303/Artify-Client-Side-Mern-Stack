import { Star, ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink, useLoaderData, useNavigate } from 'react-router'
import { AuthContext } from './AuthContext'
import { use } from 'react'
import { toast } from 'react-toastify'

const ArtDetails = () => {
    const data  = useLoaderData()
    const navigate = useNavigate()
    const {user} = use(AuthContext)
    const [art, setArt] = useState({...data,likedBy: data.likedBy || []})

    const alreadyLiked = art?.likedBy?.includes(user?.email);

    const handleLike = (id) => {
    fetch(`http://localhost:3000/arts/${id}/like`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setArt((prev) => {
            const liked = prev.likedBy.includes(user.email);

            return {
              ...prev,
              likes: liked ? prev.likes - 1 : prev.likes + 1,
              likedBy: liked
                ? prev.likedBy.filter((e) => e !== user.email)
                : [...prev.likedBy, user.email],
            };
          });
        }
      });
  };

  const handleFavorite = () => {
      fetch('http://localhost:3000/favorites', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artId: data._id,
          image: data.image,
          title: data.title,
          category: data.category,
          artistName: data.artistName,
          favorite_by: user.email
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            toast("Added to My Favorites");
          } else if (data.message) {
            toast("Already in My Favorites");
          }
        });
};

  return (
     <>
         <div className='my-21 mx-20 max-sm:mx-5'>
           <div className='flex gap-10 max-sm:flex-col'>
                <div className='w-75 h-75'>
                    <img className='w-75 h-75 rounded-2xl' src={data.image} alt="art image" />
                </div>

                <div className='flex flex-col'>

                    <div className='text-[40px] font-semibold'>
                        <h3>{data.title}</h3>
                    </div>

                    <div className='flex gap-6 mt-10'>

                        <div className='w-37.5 h-30 flex flex-col gap-2 justify-center'>
                            <h1 className='font-bold text-3xl'>Medium</h1>

                            <h3 className='font-semibold'>{data.medium}</h3>
                        </div>

                        <div className='w-37.5 h-30 flex flex-col gap-2 justify-center'>
                            <h1 className='font-bold text-3xl'>Artist</h1>

                            <h3 className='font-semibold'>{data.artistName}</h3>
                        </div>

                        <div className='w-37.5 h-30 flex flex-col gap-2 justify-center'>

                            <h2 className='font-semibold'>{art.likes}</h2>
                            
                            {alreadyLiked ? <ThumbsDown onClick={()=>handleLike(data._id)} className='cursor-pointer  text-blue-700'></ThumbsDown> : <ThumbsUp onClick={()=>handleLike(data._id)} className='cursor-pointer  text-blue-700'></ThumbsUp>}

                            <h3 className='font-semibold'>{alreadyLiked ? "Unlike" : "Like"}</h3>
                        </div>

                        <div className='w-37.5 h-30 flex flex-col gap-2 justify-center'>
                            <Star onClick={handleFavorite} className='cursor-pointer'></Star>

                            <h3>Favorite</h3>
                        </div>
                    </div>
                    
                    <NavLink className='text-green-600 font-bold text-3xl' to={`/artistInfo/${data._id}`}>About Artist</NavLink>
                </div>
           </div>

           <h1 className='font-semibold text-2xl mb-6 mt-6'>Description</h1>
           <p className='mb-6 text-[#627382 text-[20px]]'>{data.description}</p>

           <div className='flex justify-center items-center max-sm:justify-start'><button onClick={()=>navigate(-1)} class="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] w-50 h-12.5 font-bold text-[20px] text-white">Go Back</button></div>

        </div>
     </>
  )
}

export default ArtDetails