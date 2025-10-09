// Particle Animation
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
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
// Form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactFormElement');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const mailtoLink = `mailto:afonsomiguelcarvalho2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      try {
        window.location.href = mailtoLink;
        alert('Opening your email client...');
        contactForm.reset();
      } catch (error) {
        console.error('Error opening email client:', error);
        alert('Please copy the following email address and send your message manually: afonsomiguelcarvalho2006@gmail.com');
      }
    });
  }
});
// Input validation and styling
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('.formGroup input, .formGroup textarea');

  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        this.style.borderColor = 'rgba(33, 158, 188, 0.6)';
        this.style.background = 'rgba(255, 255, 255, 0.08)';
      } else {
        this.style.borderColor = 'rgba(33, 158, 188, 0.3)';
        this.style.background = 'rgba(255, 255, 255, 0.05)';
      }
    });

    input.addEventListener('focus', function() {
      this.style.borderColor = '#219ebc';
      this.style.background = 'rgba(255, 255, 255, 0.08)';
      this.style.boxShadow = '0 0 0 3px rgba(33, 158, 188, 0.1)';
    });
  });
});