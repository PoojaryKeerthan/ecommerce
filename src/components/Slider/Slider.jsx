import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './Slider-data'
import './Slider.scss'
const Slider = () => {
    const[currentSlide,setCurrentslide] = useState(0);
    const slideLength = sliderData.length
    const autoScroll = true
    let slideInterval;
    let interValTime = 5000;

    const nextSlide = () =>{
        setCurrentslide( currentSlide === slideLength -1 ? 0 : currentSlide + 1 )
        };
    const prevSlide = () =>{
        setCurrentslide( currentSlide === 0  ? slideLength-1 : currentSlide - 1 )
    };
    useEffect(()=>{
        setCurrentslide(0)
    },[]);

    

    useEffect(()=>{
        if(autoScroll){
            function auto(){
                slideInterval = setInterval(nextSlide, interValTime)
            }
            auto();
        }
        return()=>clearInterval(slideInterval);
    },[currentSlide,slideInterval,autoScroll])

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Slider