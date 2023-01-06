let bars = document.querySelector(".fa-bars");
let barsActive = document.querySelector(".fa-bars-staggered");
let nav = document.querySelector(".nav");

bars.addEventListener("click", () => {
  bars.style.display = "none";
  barsActive.style.display = "block";
  nav.style.display = "block";
});

barsActive.addEventListener("click", () => {
  bars.style.display = "block";
  barsActive.style.display = "none";
  nav.style.display = "none";
});

/////////////////////////////////////////////////////////////////////////////////

const slides = [
  {
    id: 1,
    image: "/img/1.jpg",
    text1: "This is Slide 1",
    text2: "Wahoo",
    buttonText: "Learn More",
    buttonURL: "#",
  },
  {
    id: 2,
    image: "/img/8.jpg",
    text1: "This is Slide 2",
    text2: "Wahoo",
    buttonText: "Learn More",
    buttonURL: "#",
  },
  {
    id: 3,
    image: "/img/5.jpg",
    text1: "This is Slide 3",
    text2: "Wahoo",
    buttonText: "Learn More",
    buttonURL: "#",
  },
  {
    id: 4,
    image: "/img/2.jpg",
    text1: "This is Slide 4",
    text2: "Wahoo",
    buttonText: "Learn More",
    buttonURL: "#",
  },
];

const amt = 100 / slides.length;
const slider = document.querySelector(".slider");

let value = 0;
let indicatorsValue = 0;
let interval = 8000;

let indicators;
let start;

loadSlides();

async function loadSlides() {
  await createSlides();
  await createIndicators();

  start = setInterval(() => slide("increase"), interval);

  document.querySelectorAll(".navigation").forEach((cur) => {
    cur.addEventListener("click", () =>
      cur.classList.contains("next") ? slide("increase") : slide("decrease")
    );
  });

  indicators.forEach((cur) =>
    cur.addEventListener("click", (ev) => clickCheck(ev))
  );

  const touchSlide = (() => {
    let start, move, change, sliderWidth;

    slider.addEventListener("touchstart", (e) => {
      start = e.touches[0].clientX;
      sliderWidth = slider.clientWidth / indicators.length;
    });

    slider.addEventListener("touchmove", (e) => {
      e.preventDefault();
      move = e.touches[0].clientX;
      change = start - move;
    });

    const mobile = (e) => {
      change > sliderWidth / 4 ? slide("increase") : null;
      change * -1 > sliderWidth / 4 ? slide("decrease") : null;
      [start, move, change, sliderWidth] = [0, 0, 0, 0];
    };
    slider.addEventListener("touchend", mobile);
  })();
}

//Create slides from JSON object "slides"
function createSlides() {
  for (let i = 0; i < slides.length; i++) {
    const slide = document.createElement("div");
    slide.classList.add("slider__slide");
    slide.innerHTML = `<img src="${slides[i].image}" class="slider__slide__image"><div class="slider__slide__details"><h1>${slides[i].text1}</h1><p>${slides[i].text2}</p><a href="${slides[i].buttonURL}">${slides[i].buttonText}</a></div>`;
    document.querySelector(".slider").appendChild(slide);
  }
}

//Create indicators based on the number of slides
function createIndicators() {
  for (let i = 0; i < slides.length; i++) {
    const box = document.createElement("div");
    box.setAttribute("data-index", i);
    document.querySelector(".indicators").appendChild(box);
  }
  indicators = document.querySelector(".indicators").querySelectorAll("div");
  indicators[0].classList.add("active");
  document.querySelector(":root").style.setProperty("--index", slides.length);
}

// function to transform slide
function move(S, T) {
  slider.style.transform = `translateX(-${S}%)`;
  indicators[T].classList.add("active");
}

// Check which indicator was clicked
function clickCheck(e) {
  clearInterval(start);
  indicators.forEach((cur) => cur.classList.remove("active"));
  const check = e.target;
  check.classList.add("active");

  value = check.getAttribute("data-index") * amt;

  indicatorsUpdate();
  move(value, indicatorsValue);
  start = setInterval(() => slide("increase"), interval);
}

function indicatorsUpdate() {
  indicatorsValue = value / amt;
}

function slide(condition) {
  clearInterval(start);
  condition === "increase" ? slideIncrease() : slideDecrease();
  move(value, indicatorsValue);
  start = setInterval(() => slide("increase"), interval);
}

function slideIncrease() {
  indicators.forEach((cur) => cur.classList.remove("active"));
  value === (document.querySelectorAll(".slider__slide").length - 1) * amt
    ? (value = 0)
    : (value += amt);
  indicatorsUpdate();
}

function slideDecrease() {
  indicators.forEach((cur) => cur.classList.remove("active"));
  value === 0
    ? (value = (document.querySelectorAll(".slider__slide").length - 1) * amt)
    : (value -= amt);
  indicatorsUpdate();
}
/////////////////////////////////////////////////////////////////
