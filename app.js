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
