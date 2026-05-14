import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Link } from 'react-router'

const About = () => {
    const {theme} = useContext(AuthContext)

  return (
    <>

        <h1 className='mt-10 text-5xl text-center font-bold text-blue-800 max-sm:text-left max-sm:ml-4 max-sm:text-3xl'>Share Your Art with the World</h1>

        <div className='flex flex-col gap-6 mt-15 mx-30 font-semibold text-2xl mb-10 max-sm:mx-4 max-sm:text-xl'>

        <p>
            Artify is a creative platform designed for artists to showcase their imagination, talent, and passion through digital galleries. Whether you are a beginner exploring your artistic journey or a professional artist building your portfolio, Artify provides a space where creativity can be shared with the world.
        </p>

        <p>
            On Artify, users can upload artwork along with images, titles, descriptions, categories, and other important details that help bring each creation to life. The platform is built to make art sharing simple, interactive, and visually appealing. From paintings and sketches to digital illustrations and modern designs, Artify welcomes every form of artistic expression.
        </p>

        <p>Our mission is to connect artists and art lovers in one inspiring community. Artists can present their unique creations, gain recognition, and inspire others, while visitors can explore a wide variety of artwork from different styles and perspectives. Artify encourages creativity, originality, and collaboration by giving artists a dedicated place to express themselves freely.</p>

        <p>The website focuses on a smooth and user-friendly experience with responsive design, secure data handling, and easy navigation. Users can browse artwork, discover talented creators, and interact with artistic content in an engaging environment.</p>

        <p>Artify is more than just an art-sharing website — it is a growing community where creativity has no limits. We believe every piece of art tells a story, and our goal is to provide the perfect platform for artists to share those stories with the world.</p>
    </div>

    <div style={{color: theme === "dark" ? "whitesmoke" : "green"}} className='mt-6 mb-6 flex justify-center items-center max-sm:text-left max-sm:justify-start max-sm:ml-4'>
     <Link to='/' className='font-bold text-2xl underline'>Go to Home Page</Link> 
      </div>
    </>
  )
}

export default About