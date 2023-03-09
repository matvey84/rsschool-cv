'use strict';
const burger = document.querySelector('.burger');
const cvContainer = document.querySelector('.cv-container');
const cv = document.querySelector('.cv');
const header = document.querySelector('.cv-header');

const headerBg = window.getComputedStyle(header).backgroundColor;

function createBurgerMenu () {
  const burgerMenu = document.createElement('section');
  const burgerNavMenu = document.createElement('nav');

  burgerMenu.classList.add('burger-menu');
  burgerNavMenu.classList.add('burger-navigation');

  burgerNavMenu.append(createBakeArrowButton());
   setTimeout(
      () => {
        createBurgerMenuNavLink();
      },
     0
   ); 
  burgerMenu.append(burgerNavMenu);
  cvContainer.append(burgerMenu);
}
createBurgerMenu();

function createBurgerMenuNavLink() {
  const burgerNavMenu = document.querySelector('.burger-navigation');

  const data = [
    { name: 'CONTACTS', src: '#contacts', },
    { name: 'ABOUT ME', src: '#about-me' },
    { name: 'EDUCATION AND COURSESE', src: '#education' },
    { name: 'SKILLS', src: '#skills' },
    { name: 'CERTIFICATES', src: '#certificates' },
    { name: 'LANGUAGES', src: '#languages' },
  ];

  for (let i = 0; i < data.length; i ++) {
    const burgerNavLink = document.createElement('a');
    burgerNavLink.classList.add('burger-nav-link');
    burgerNavLink.href = data[i].src;
    burgerNavLink.textContent = data[i].name;
    burgerNavLink.addEventListener('click', closeBurgerMenu);
    burgerNavMenu.append(burgerNavLink);
  }
}

function openBurgerMenu () {
  const burgerMenu = document.querySelector('.burger-menu');
  burgerMenu.classList.toggle('open-menu');

  localStorage.setItem('menuOpen', true);

  cv.classList.add('no-scroll');
  header.style.backgroundColor = 'transparent';
}
burger.addEventListener('click', openBurgerMenu);

function createBakeArrowButton() {
  const arrow = document.createElement('div');
  arrow.classList.add('back-arrow');

  const backArrowLline = document.createElement('div');
  backArrowLline.classList.add('back-arrow-line');

  arrow.append(backArrowLline);
  arrow.addEventListener('click', closeBurgerMenu);

  return arrow;
}

function closeBurgerMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  burgerMenu.classList.toggle('open-menu');

  localStorage.setItem('menuOpen', false);
  cv.classList.remove('no-scroll');
  header.style.backgroundColor = headerBg;
  slowScroll();
}

function saveAppState() {
  const isMenuOpen = localStorage.getItem('menuOpen');
  const burgerMenu = document.querySelector('.burger-menu');

  if (isMenuOpen === 'true') {
    cv.classList.add('no-scroll');
    burgerMenu.classList.toggle('open-menu');
    header.style.backgroundColor = 'transparent';
  } else {
    cv.classList.remove('no-scroll');
  }
}
saveAppState();

function slowScroll() {
  const anchors = document.querySelectorAll('a[href*="#"]');
  const headerHeight = window.getComputedStyle(header).height.split('px').reverse().at(-1) * 2
  
  for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href').split('#').at(-1);
      const currentBlock = document.getElementById(blockID);
        if (e.target.classList.contains('nav-link') || e.target.classList.contains('burger-nav-link')) {currentBlock.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    })
    cvContainer.style.marginTop = headerHeight + 'px';
  }
}

slowScroll();

