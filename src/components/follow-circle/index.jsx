import React, { useContext, useRef, useEffect } from 'react';
import { FollowCircleContext } from './follow-circle-store';
export * from './follow-circle-store';

// use context to make a wrapper that can change the stat of the circle
const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

export const FollowCircle = props => {
  const circleRef = useRef(null);
  let clientX = -100;
  let clientY = -100;
  let lastX = clientX;
  let lastY = clientY;

  const { stuck, position, sticky, stickyRadius, animationState } = useContext(
    FollowCircleContext
  );

  const render = () => {
    if (stuck) {
      requestAnimationFrame(render);
      return;
    }

    lastX = lerp(lastX, clientX, 0.2);
    lastY = lerp(lastY, clientY, 0.2);
    circleRef.current.style.transform = `translate(${lastX}px,${lastY}px)`;

    requestAnimationFrame(render);
  };

  useEffect(() => {
    requestAnimationFrame(render);

    window.addEventListener('mousemove', e => {
      clientX = e.clientX;
      clientY = e.clientY;
    });
  }, {});

  return (
    <div className={`circle ${animationState}`} ref={circleRef}>
      <div className="circle__content"></div>
    </div>
  );
};

// mousemove
// mouseenter
// data-target

// const initCursor = () => {
//   const circle = document.querySelector('.circle');

//   const hoverableElements = document.querySelectorAll('[data-fc-hover]');
//   let animationState = '';

//   hoverableElements.forEach((el) => {
//     el.addEventListener('mouseenter', function(e) {
//       console.log('asd');
//       const { fcHover, fcStuck } = this.dataset;
//       animationState = fcHover;

//       circle.classList.add(animationState);
//       if(fcStuck) {
//         stuck = fcStuck
//       }
//     });

//     el.addEventListener('mouseleave', function() {
//       const { fcStuck } = this.dataset;
//       if(fcStuck) {
//         stuck = false;
//       }
//       circle.classList.remove(animationState);
//     })
//   });

// }

// initCursor();
