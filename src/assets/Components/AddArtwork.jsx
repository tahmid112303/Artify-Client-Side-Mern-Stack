import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const AddArtwork = () => {

  const {user,theme} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleAddArtwork = (e) => {
    e.preventDefault();
    const image = e.target.image.value;
    const title = e.target.title.value;
    const category = e.target.category.value;
    const medium = e.target.medium.value;
    const description = e.target.description.value;
    const artistName = e.target.artistName.value;
    const artistEmail = e.target.artistEmail.value
    const artistImage = e.target.artistImage.value;
    const createdAt = new Date()

    const newArt = {image,title,category,medium,description,artistName,artistEmail,artistImage,createdAt}

    fetch("http://localhost:3000/arts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArt),
          })
    .then(res=>res.json())
    .then(data=>{ 
      if(data.insertedId){
        newArt._id = data.insertedId
        e.target.reset();
        toast("New art added")
        navigate('/explore')
      }
    })
  }

  return (
    <div className='mt-20 mb-20'>
        <form onSubmit={handleAddArtwork}>
          <fieldset style={{background: theme === "dark" && "purple"}} className="fieldset bg-gray-300 mx-auto border-base-300 rounded-box w-xs border p-4 max-sm:ml-4">

          <h2 className='text-2xl text-center font-bold'>Add Artwork</h2>

          <label className="label">Art Image</label>
          <input type="url" name='image' className="input" placeholder="Art Image Url" required/>

          <label className="label">Title</label>
          <input type="text" name='title' className="input" placeholder="Art Title" required/>

          <label className="label">Category</label>
          <input type="text" name='category' className="input" placeholder="Art Category" required/>

          <label className="label">Medium</label>
          <input type="text" name='medium' className="input" placeholder="Medium/Tools" required/>

          <label className="label">Photo Url (optional)</label>
          <input type="url" name='artistImage' className="input" placeholder="Your Photo URL"/>

          <label className="label">Description</label>
          <textarea placeholder="Description" name='description' className="textarea textarea-xl" required>
          </textarea>

          <label className="label">User Name</label>
          <input type="text" name='artistName' className="input" defaultValue={user?.displayName} disabled/>

          <label className="label">User Email</label>
          <input type="email" name='artistEmail' className="input" defaultValue={user?.email} disabled/>

          <button className='btn btn-secondary w-full font-bold
           text-[1.5em] mt-6'>Add Artwork</button>

        </fieldset>
        </form>
    </div>
  )
}

export default AddArtwork