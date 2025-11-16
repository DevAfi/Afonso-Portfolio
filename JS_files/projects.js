// Particle Animation
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  
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
});

// Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll(".filterBtn");
  const projectCards = document.querySelectorAll(".projectCard");
  
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const tags = card.dataset.tags.toLowerCase().split(" ");
        const filterLower = filter.toLowerCase();

        // Check for exact match or partial match
        const matches = filter === "all" || 
                      tags.includes(filterLower) || 
                      tags.some(tag => tag.includes(filterLower)) ||
                      filterLower.includes(tags.join(" "));

        if (matches) {
          card.classList.remove("hidden");
          card.style.display = "block";
        } else {
          card.classList.add("hidden");
          card.style.display = "none";
        }
      });
    });
  });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', currentTheme);
  
  // Update button icon based on current theme
  updateThemeIcon(currentTheme);
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// slideshow functionality
// to add a slideshow:
//
// add 1 to slideIndex, add Id to slideId, add showSlides(1, no) to the end of the function

document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = [1, 1, 1, 1, 1, 1, 1];
  let slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4", "mySlides5", "mySlides6", "mySlides7"];
  showSlides(1, 0);
  showSlides(1, 1);
  showSlides(1, 2);
  showSlides(1, 3);
  showSlides(1, 4);
  showSlides(1, 5);
  showSlides(1, 6);

  window.plusSlides = function(n, no) {
    showSlides((slideIndex[no] += n), no);
  };

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
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Project search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add search input if it doesn't exist
  const filterBar = document.querySelector('.filterBar');
  if (filterBar && !document.querySelector('.project-search')) {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'project-search';
    searchInput.style.cssText = `
      padding: 0.5rem 1rem;
      border: 2px solid rgba(33, 158, 188, 0.3);
      border-radius: 25px;
      background: rgba(255, 255, 255, 0.05);
      color: #f1faee;
      font-size: 1rem;
      margin-left: 1rem;
      transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', function() {
      this.style.borderColor = '#219ebc';
      this.style.background = 'rgba(255, 255, 255, 0.08)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.style.borderColor = 'rgba(33, 158, 188, 0.3)';
      this.style.background = 'rgba(255, 255, 255, 0.05)';
    });
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const projectCards = document.querySelectorAll('.projectCard');
      
      projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.classList.remove('hidden');
          card.style.display = 'block';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
    
    filterBar.appendChild(searchInput);
  }
});

// Google Analytics tracking for project link clicks
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.projectCard');

  projectCards.forEach(card => {
    const titleEl = card.querySelector('.projectContent h3');
    const projectName = titleEl ? titleEl.textContent.trim() : 'Unknown Project';
    const links = card.querySelectorAll('.projectLinks a');

    links.forEach(link => {
      link.addEventListener('click', function() {
        if (window.gtag) {
          gtag('event', 'project_click', {
            event_category: 'engagement',
            event_label: projectName
          });
        }
      });
    });
  });
});