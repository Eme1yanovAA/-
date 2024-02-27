const carousel = document.querySelector('.player__carousel');
const cards = document.querySelectorAll('.player__card');
const prevBtn = document.querySelector('.carousel__button-prev');
const nextBtn = document.querySelector('.carousel__button-next');
const counter = document.querySelector('.number__now');
const total = document.querySelector('.number__total');
let currentIndex = 0;


function updateCounter() {
  counter.innerText = `${(currentIndex + 3) > cards.length ? cards.length : currentIndex + 3 }`;
  total.innerText = `/ ${cards.length}`
}

function updateCarousel() {
  const cardWidth = cards[0].clientWidth;
  carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

function next() {
  if (currentIndex + 3 < cards.length) {
    currentIndex += 3;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
  updateCounter();
}

function prev() {
  if (currentIndex - 3 >= 0) {
    currentIndex -= 3;
  } else {
    currentIndex = Math.floor(cards.length / 3) * 3;
  }
  updateCarousel();
  updateCounter();
}

let interval = setInterval(next, 4000);

nextBtn.addEventListener('click', () => {
  clearInterval(interval);
  next();
  interval = setInterval(next, 4000);
});

prevBtn.addEventListener('click', () => {
  clearInterval(interval);
  prev();
  interval = setInterval(next, 4000);
});

updateCounter();

const animItems = document.querySelectorAll('._anim-item');
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemPoint)) {
                animItem.classList.add('anim')
                console.log(1)
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    animOnScroll()
}

// 
