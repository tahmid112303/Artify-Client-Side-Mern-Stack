import React from 'react'

const Footer = () => {

    const visitTwitter = () => {
      window.open("https://x.com/")
    }

    const visitYouTube = () => {
      window.open("https://www.youtube.com/")
    } 

    const visitFacebook = () => {
      window.open("https://www.facebook.com/")
    }

  return (
    <>
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
  <aside>

      <img src="./arts.png" alt="logo" className='w-13 h-13' />
   
    <p>
      <span className='text-4xl font-serif font-extrabold'>Artify</span>
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Social</h6>
    <div className="flex gap-4">
      <a>
        <svg
          onClick={visitTwitter}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="fill-current cursor-pointer"
        >
          <path d="M18.244 2H21.5l-7.5 8.573L22 22h-6.828l-5.34-6.993L3.5 22H0.244l8.04-9.188L2 2h6.828l4.82 6.357L18.244 2zm-1.2 18h1.9L7.01 4h-2.04l12.074 16z"/>
        </svg>
      </a>
      <a>
        <svg
          onClick={visitYouTube}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current cursor-pointer">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          onClick={visitFacebook}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current cursor-pointer">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>

    <div className='bg-neutral text-white font-semibold pb-5 '>
        <p className='text-center max-sm:text-left max-sm:ml-6'>Copyright © 2026 - All right reserved</p>
    </div>
    </>

  )
}

export default Footer