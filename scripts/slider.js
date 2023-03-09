'use strict';

function createSkillItemSlider() {
  const skillItemSrc = [
    '../assets/skills-icon/icons8-css3.svg',
    '../assets/skills-icon/icons8-html-5.svg',
    '../assets/skills-icon/icons8-javascript.svg',
    '../assets/skills-icon/icons8-typescript.svg',
    '../assets/skills-icon/logo-react-svgrepo-com.svg',
    '../assets/skills-icon/reactrouter.svg',
    '../assets/skills-icon/react-hook-form.svg',
    '../assets/skills-icon/react-testing-library.svg',
    '../assets/skills-icon/icons8-redux.svg',
  ];

  const sliderWindow = document.querySelector('.slider-window');

  const slider = document.createElement('section');
  slider.classList.add('slider');

  skillItemSrc.reverse().forEach((src) => {
    const skillItem = `
    <div class="skill-item">
    <img src=${src} alt=${src.split('/').at(-1)}>
    </div>`;
    slider.insertAdjacentHTML('afterbegin', skillItem);
  });

  sliderWindow.append(slider);
}
createSkillItemSlider();


const slider = document.querySelector('.slider');
const skillItemList = document.querySelectorAll('.skill-item');

const skillItem = window.getComputedStyle(document.querySelector('.skill-item'));

const step = parseInt(skillItem.width) + parseInt(skillItem.marginRight);

const sliderWidth =  Array.from(skillItemList).reduce((sum) => sum + step, 0);

const sliderWindowWidth = parseInt(
  window.getComputedStyle(document.querySelector('.slider-window')).width
);

const startSliderLeftPosition = sliderWindowWidth - sliderWidth + parseInt(skillItem.marginRight) ;

let sliderLeftPosition = startSliderLeftPosition;
slider.style.left = sliderLeftPosition + 'px';

function sliderArrowWork(event) {
  if (event.target.className === 'right-arrow') {
    sliderLeftPosition = sliderLeftPosition + step;
    slider.style.left = sliderLeftPosition + 'px';

    if (sliderLeftPosition > 0) {
      sliderLeftPosition = startSliderLeftPosition;
      slider.style.left = sliderLeftPosition + 'px';
    }
  }

  if (event.target.className === 'left-arrow') {

    sliderLeftPosition = sliderLeftPosition - step;
    slider.style.left = sliderLeftPosition + 'px';
    
    if (sliderLeftPosition < startSliderLeftPosition - parseInt(skillItem.width)) {
      sliderLeftPosition = 0;
      slider.style.left = sliderLeftPosition + 'px'; 

    }
  }
}

document
  .querySelectorAll('.slider-arrow')
  .forEach((arrow) => arrow.addEventListener('click', sliderArrowWork));
