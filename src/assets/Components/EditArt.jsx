import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const EditArt = () => {
    const {theme} = useContext(AuthContext)
    const data = useLoaderData()
    const navigate = useNavigate()

    function handleUpdateArt(e){
        e.preventDefault()
        const image = e.target.image.value;
        const title = e.target.title.value;
        const category = e.target.category.value;
        const medium = e.target.medium.value;
        const description = e.target.description.value;
        const artistImage = e.target.artistImage.value;

        

        const updatedArt = {image,title,category,medium,artistImage,description}

        fetch(`https://artify-server-side.onrender.com/arts/${data._id}`, {
             method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
             body: JSON.stringify(updatedArt),
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){
                toast("Data updated successfully!")
                navigate('/gallery')
            }
        })
    }

  return (
    <div className='mt-20 mb-20'>
        <form onSubmit={handleUpdateArt}>
          <fieldset style={{background: theme === "dark" && "purple"}} className="fieldset bg-cyan-200 mx-auto border-base-300 rounded-box w-xs border p-4 max-sm:ml-4">

          <h2 className='text-2xl text-center font-bold'>Update Artwork</h2>

          <label className="label">Art Image</label>
          <input type="url" name='image' className="input" placeholder="Art Image Url" defaultValue={data.image}/>

          <label className="label">Title</label>
          <input type="text" name='title' className="input" placeholder="Art Title" defaultValue={data.title}/>

          <label className="label">Category</label>
          <input type="text" name='category' className="input" placeholder="Art Category" defaultValue={data.category}/>

          <label className="label">Medium</label>
          <input type="text" name='medium' className="input" placeholder="Medium/Tools" defaultValue={data.medium}/>

          <label className="label">Photo Url (optional)</label>
          <input type="url" name='artistImage' className="input" placeholder="Your Photo URL" defaultValue={data.artistImage}/>

          <label className="label">Description</label>
          <textarea placeholder="Description" name='description' className="textarea textarea-xl" defaultValue={data.description && data.description}>
          </textarea>

          <button className='btn btn-secondary w-full font-bold
           text-[1.5em] mt-6'>Update</button>

        </fieldset>
        </form>
    </div>
  )
}

export default EditArt