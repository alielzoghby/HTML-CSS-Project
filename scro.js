const scroller = document.querySelector("#scrollMeUp");
const menuScroll = document.querySelector(".menu");
const logo = document.querySelector(".lo");
let scro;
let bars = document.querySelector(".fa-bars");
let barsActive = document.querySelector(".fa-bars-staggered");
let nav = document.querySelector(".nav");

bars.addEventListener("click", () => {
  bars.style.display = "none";
  barsActive.style.display = "block";
  nav.style.display = "block";
  menuScroll.classList.add("menu-click");
});

barsActive.addEventListener("click", () => {
  bars.style.display = "block";
  barsActive.style.display = "none";
  nav.style.display = "none";
  menuScroll.classList.remove("menu-click");
});

///////////////////////////////////////////

window.addEventListener("wheel", function () {
  window.cancelAnimationFrame(scro);
  if (window.scrollY > 200) {
    scroller.classList.remove("display__none");
  } else {
    scroller.classList.add("display__none");
  }
});

window.addEventListener("scroll", () => {
  if (bars.style.display !== "none") {
    if (window.scrollY > 2) {
      menuScroll.classList.add("menu-scroller");
      menuScroll.classList.remove("menu-bug");
      logo.src = "img/logo.png";
    } else {
      menuScroll.classList.remove("menu-scroller");
      menuScroll.classList.add("menu-bug");
      logo.src = "img/logo2.png";
    }
  }
});

scroller.addEventListener(
  "click",
  (animatedScrolling = () => {
    const c = window.scrollY;
    if (c > 0) {
      scro = window.requestAnimationFrame(animatedScrolling);
      window.scrollTo(0, c - c / 12);
    }
    if (window.scrollY > 200) {
      scroller.classList.remove("display__none");
    } else {
      scroller.classList.add("display__none");
    }
  })
);

///////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  const $cont = $(".cont-s");
  const $slider = $(".slider");
  const $nav = $(".nav-s");
  const $bol = $(".nav-slider");
  const winW = $(window).width();
  const animSpd = 750; // Change also in CSS
  const distOfLetGo = winW * 0.2;
  let curSlide = 1;
  let animation = false;
  let autoScrollVar = true;
  let diff = 0;

  // Generating slides
  let arrCities = ["Amsterdam", "Rome", "New—York", "Singapore", "Prague"]; // Change number of slides in CSS also
  let numOfCities = arrCities.length;
  let arrCitiesDivided = [];

  arrCities.map((city) => {
    let length = city.length;
    let letters = Math.floor(length / 4);
    let exp = new RegExp(".{1," + letters + "}", "g");

    arrCitiesDivided.push(city.match(exp));
  });

  let generateSlide = function (city) {
    let frag1 = $(document.createDocumentFragment());
    let frag2 = $(document.createDocumentFragment());
    const numSlide = arrCities.indexOf(arrCities[city]) + 1;
    const firstLetter = arrCitiesDivided[city][0].charAt(0);

    const $slide =
      $(`<div data-target="${numSlide}" class="slide slide--${numSlide}">
                              <div class="slide__darkbg slide--${numSlide}__darkbg"></div>
                              <div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>
                          </div>`);

    const letter = $(`<div class="slide__letter slide--${numSlide}__letter">
                              ${firstLetter}
                          </div>`);

    for (let i = 0, length = arrCitiesDivided[city].length; i < length; i++) {
      const text = $(`<div class="slide__text slide__text--${i + 1}">
                                  ${arrCitiesDivided[city][i]}
                              </div>`);
      frag1.append(text);
    }

    const navSlide = $(
      `<div data-target="${numSlide}" class="nav__slide nav__slide--${numSlide}"></div>`
    );
    frag2.append(navSlide);
    $nav.append(frag2);

    $slide
      .find(`.slide--${numSlide}__text-wrapper`)
      .append(letter)
      .append(frag1);
    $slider.append($slide);

    if (arrCities[city].length <= 4) {
      $(".slide--" + numSlide)
        .find(".slide__text")
        .css("font-size", "12vw");
    }
  };

  for (let i = 0, length = numOfCities; i < length; i++) {
    generateSlide(i);
  }

  $(".nav__slide--1").addClass("nav-active");

  // Navigation
  function bullets(dir) {
    $(".nav__slide--" + curSlide).removeClass("nav-active");
    $(".nav__slide--" + dir).addClass("nav-active");
  }

  function timeout() {
    animation = false;
  }

  function pagination(direction) {
    animation = true;
    diff = 0;
    $slider.addClass("animation");
    $slider.css({
      transform: "translate3d(-" + (curSlide - direction) * 100 + "%, 0, 0)",
    });

    $slider.find(".slide__darkbg").css({
      transform: "translate3d(" + (curSlide - direction) * 50 + "%, 0, 0)",
    });

    $slider.find(".slide__letter").css({
      transform: "translate3d(0, 0, 0)",
    });

    $slider.find(".slide__text").css({
      transform: "translate3d(0, 0, 0)",
    });
  }

  function startInterval(n) {
    start = setInterval(() => {
      if (curSlide >= numOfCities) {
        bullets(1);
        curSlide = 0;
      }

      pagination(0);
      setTimeout(timeout, animSpd);
      bullets(curSlide + 1);
      curSlide++;
    }, n);
    return start;
  }
  startin = startInterval(2500);

  function navigateRight() {
    if (curSlide >= numOfCities) {
      bullets(1);
      curSlide = 0;
    }
    pagination(0);
    setTimeout(timeout, animSpd);
    bullets(curSlide + 1);
    curSlide++;
    clearInterval(start);
    startInterval(2500);
  }

  function navigateLeft() {
    if (curSlide <= 1) {
      bullets(6);
      curSlide = 6;
    }
    pagination(2);
    setTimeout(timeout, animSpd);
    bullets(curSlide - 1);
    curSlide--;
    clearInterval(start);
    startInterval(2500);
  }

  function toDefault() {
    pagination(1);
    setTimeout(timeout, animSpd);
  }

  // Events
  $(document).on("mousedown touchstart", ".slide", function (e) {
    if (animation) return;
    let target = +$(this).attr("data-target");
    let startX = e.pageX || e.originalEvent.touches[0].pageX;
    $slider.removeClass("animation");

    $(document).on("mousemove touchmove", function (e) {
      let x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = startX - x;
      if ((target === 1 && diff < 0) || (target === numOfCities && diff > 0))
        return;

      $slider.css({
        transform:
          "translate3d(-" + ((curSlide - 1) * 100 + diff / 30) + "%, 0, 0)",
      });

      $slider.find(".slide__darkbg").css({
        transform:
          "translate3d(" + ((curSlide - 1) * 50 + diff / 60) + "%, 0, 0)",
      });

      $slider.find(".slide__letter").css({
        transform: "translate3d(" + diff / 60 + "vw, 0, 0)",
      });

      $slider.find(".slide__text").css({
        transform: "translate3d(" + diff / 15 + "px, 0, 0)",
      });
    });
  });

  $(document).on("mouseup touchend", function (e) {
    $(document).off("mousemove touchmove");

    if (animation) return;

    if (diff >= distOfLetGo) {
      navigateRight();
    } else if (diff <= -distOfLetGo) {
      navigateLeft();
    } else {
      toDefault();
    }
  });

  $(document).on("click", ".nav__slide:not(.nav-active)", function () {
    let target = +$(this).attr("data-target");
    bullets(target);
    curSlide = target;
    pagination(1);
    clearInterval(start);
    startInterval(2500);
  });

  $(document).on("click", ".side-nav", function () {
    let target = $(this).attr("data-target");

    if (target === "right") navigateRight();
    if (target === "left") navigateLeft();
    clearInterval(start);
    startInterval(2500);
  });

  $(document).on("keydown", function (e) {
    if (e.which === 39) navigateRight();
    if (e.which === 37) navigateLeft();
  });
});
