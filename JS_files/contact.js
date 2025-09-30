// Particle Animation
const particlesContainer = document.getElementById('particles');
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
const contactForm = document.getElementById('contactFormElement');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoLink = `mailto:afonsomiguelcarvalho2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  window.location.href = mailtoLink;
  alert('Opening your email client...');
  contactForm.reset();
});
const inputs = document.querySelectorAll('.formGroup input, .formGroup textarea');

inputs.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
      this.style.borderColor = 'rgba(33, 158, 188, 0.6)';
    } else {
      this.style.borderColor = 'rgba(33, 158, 188, 0.3)';
    }
  });
});