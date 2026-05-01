import React, { useEffect, useState } from 'react'

const slides = ['./img1.jpg','./img2.webp','./img3.jpg'];

const ImageSlider = () => {

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
    
        return () => clearInterval(timer);
      }, []);


    return (
<div className="relative w-full h-105 overflow-hidden rounded-2xl">

{slides.map((img, index) => (
  <img
    key={index}
    src={img}
    alt=""
    className={`absolute w-full h-full object-cover transition-opacity duration-700
      ${index === current ? "opacity-100" : "opacity-0"}
    `}
  />
))}

<div className='text-8xl font-bold text-white text-center relative top-30 z-1 max-sm:text-left max-sm:text-5xl max-sm:pl-4'>
    <h1>Digital Art Trends</h1>
    <p className="mt-2 text-2xl">Explore trending abstract artworks</p>
</div>


<button
  onClick={() =>
    setCurrent((current - 1 + slides.length) % slides.length)
  }
  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 
  text-white px-3 py-2 rounded-full"
>
  ‹
</button>

<button
  onClick={() => setCurrent((current + 1) % slides.length)}
  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
>
  ›
</button>

<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
  {slides.map((_, i) => (
    <div
      key={i}
      onClick={() => setCurrent(i)}
      className={`w-3 h-3 rounded-full cursor-pointer
        ${i === current ? "bg-blue-500" : "bg-white/50"}
      `}
    />
  ))}
</div>
</div>
);
};

export default ImageSlider