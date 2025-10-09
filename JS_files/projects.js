// Particle Animation
const particlesContainer = document.getElementById("particles");
const particleCount = 15;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  const size = Math.random() * 100 + 50;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animationDelay = `${Math.random() * 20}s`;
  particle.style.animationDuration = `${Math.random() * 10 + 15}s`;

  particlesContainer.appendChild(particle);
}

// Filter Functionality
const filterBtns = document.querySelectorAll(".filterBtn");
const projectCards = document.querySelectorAll(".projectCard");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const tags = card.dataset.tags.toLowerCase().split(" ");

      if (filter === "all" || tags.includes(filter.toLowerCase())) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// slideshow functionality
// to add a slideshow:
//
// add 1 to slideIndex, add Id to slideId, add showSlides(1, no) to the end of the function

let slideIndex = [1, 1, 1, 1];
let slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4"];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);

function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}
