import { useEffect, useRef, useState } from 'react';
import { carouselItems } from './data/images';
import './App.css';

export default function App() {
  const [buttonPressed, setButtonPressed] = useState('');
  const sliderRef = useRef();
  const thumbnailBorderRef = useRef();

  const showSlider = (type) => {
    const sliderItemsDom = sliderRef.current.querySelectorAll('.item');
    const thumbnailItemsDom =
      thumbnailBorderRef.current.querySelectorAll('.item');

    if (type === 'next') {
      sliderRef.current.appendChild(sliderItemsDom[0]);
      thumbnailBorderRef.current.appendChild(thumbnailItemsDom[0]);
      setButtonPressed('next');
    } else {
      sliderRef.current.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      thumbnailBorderRef.current.prepend(
        thumbnailItemsDom[thumbnailItemsDom.length - 1]
      );
      setButtonPressed('prev');
    }

    setTimeout(() => {
      setButtonPressed('');
    }, 3000);
  };

  // This useEffect is triggering the auto next of the slider
  useEffect(() => {
    if (!buttonPressed.trim()) {
      const nextTimer = setTimeout(() => {
        showSlider('next'); // Call the showSlider function to move the slider
      }, 7000);
      return () => clearTimeout(nextTimer);
    }
  }, [buttonPressed]);

  return (
    <>
      {/* <!-- carousel --> */}
      <section className={`carousel ${buttonPressed}`}>
        {/* <!-- loader --> */}
        <div className='loader'></div>
        {/* <!-- list item --> */}
        <div className='list' ref={sliderRef}>
          {carouselItems.map((item) => (
            <div key={item.imgSrc} className='item'>
              <img src={item.imgSrc} />
              <div className='content'>
                <div className='title'>{item.title}</div>
                <div className='topic'>{item.topic}</div>
                <div className='desc'>{item.desc}</div>
                <div className='buttons'>
                  <button>DETAILS</button>
                  <button>SUBSCRIBE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <!-- list thumnail --> */}
        <div className='thumbnail' ref={thumbnailBorderRef}>
          {carouselItems.map((item, index) => (
            <div key={index} className='item'>
              <img src={item.imgSrc} />
              <div className='content'>
                <div className='title'>{item.title}</div>
                <div className='description'>{item.desc.slice(0, 15)}</div>
              </div>
            </div>
          ))}
        </div>
        {/* <!-- next prev --> */}
        <div className='arrows'>
          <button onClick={() => showSlider('prev')}>{'<'}</button>
          <button onClick={() => showSlider('next')}>{'>'}</button>
        </div>
      </section>
    </>
  );
}
