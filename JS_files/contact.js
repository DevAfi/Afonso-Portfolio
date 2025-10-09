// Initialize EmailJS (you'll need to get your own service ID, template ID, and public key)
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

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

// CV Download Function
function downloadCV() {
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = '/documents/Afonso_Carvalho_CV.pdf'; // Update this path to your actual CV file
  link.download = 'Afonso_Carvalho_CV.pdf';
  link.target = '_blank';
  
  // Add to DOM, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Show success message
  showMessage('CV downloaded successfully!', 'success');
}

// Enhanced Form Handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactFormElement');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submitBtn');
      const btnText = submitBtn.querySelector('.btnText');
      const btnIcon = submitBtn.querySelector('i');
      
      // Get form data
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      btnIcon.className = 'fas fa-spinner fa-spin';

      // EmailJS configuration (replace with your actual IDs)
      const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
      const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
      
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'afonsomiguelcarvalho2006@gmail.com'
      };

      // Send email using EmailJS
      emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
          showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
          contactForm.reset();
        }, function(error) {
          console.error('EmailJS Error:', error);
          
          // Fallback to mailto link if EmailJS fails
          const mailtoLink = `mailto:afonsomiguelcarvalho2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
          window.location.href = mailtoLink;
          showMessage('Opening your email client as a fallback...', 'success');
          contactForm.reset();
        })
        .finally(function() {
          // Reset button state
          submitBtn.disabled = false;
          btnText.textContent = 'Send Message';
          btnIcon.className = 'fas fa-paper-plane';
        });
    });
  }
});

// Enhanced Input Validation and Styling
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('.formGroup input, .formGroup textarea');

  inputs.forEach(input => {
    // Real-time validation
    input.addEventListener('input', function() {
      validateField(this);
    });

    input.addEventListener('blur', function() {
      validateField(this);
      if (this.value.trim() !== '') {
        this.style.borderColor = 'var(--accent-color)';
        this.style.background = 'var(--card-bg)';
      } else {
        this.style.borderColor = 'rgba(33, 158, 188, 0.3)';
        this.style.background = 'rgba(255, 255, 255, 0.05)';
      }
    });

    input.addEventListener('focus', function() {
      this.style.borderColor = 'var(--accent-color)';
      this.style.background = 'var(--card-bg)';
      this.style.boxShadow = '0 0 0 3px rgba(33, 158, 188, 0.1)';
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        message = isValid ? '' : 'Please enter a valid email address';
        break;
      case 'text':
        if (field.id === 'name') {
          isValid = value.length >= 2;
          message = isValid ? '' : 'Name must be at least 2 characters';
        } else if (field.id === 'subject') {
          isValid = value.length >= 3;
          message = isValid ? '' : 'Subject must be at least 3 characters';
        }
        break;
      default:
        if (field.tagName === 'TEXTAREA') {
          isValid = value.length >= 10;
          message = isValid ? '' : 'Message must be at least 10 characters';
        }
    }

    // Update field appearance
    if (value && !isValid) {
      field.style.borderColor = 'var(--error-color)';
      field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    } else if (value && isValid) {
      field.style.borderColor = 'var(--success-color)';
      field.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
    }

    return isValid;
  }
});

// Message Display System
function showMessage(text, type) {
  const messageDisplay = document.getElementById('messageDisplay');
  const messageIcon = messageDisplay.querySelector('.message-icon');
  const messageText = messageDisplay.querySelector('.message-text');

  // Clear existing classes
  messageDisplay.className = 'message-display';
  
  // Set message content and styling
  messageText.textContent = text;
  messageDisplay.classList.add(type);
  
  // Set appropriate icon
  if (type === 'success') {
    messageIcon.className = 'fas fa-check-circle';
  } else if (type === 'error') {
    messageIcon.className = 'fas fa-exclamation-circle';
  }

  // Show message
  messageDisplay.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDisplay.style.display = 'none';
  }, 5000);
}

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

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Escape key to close messages
  if (e.key === 'Escape') {
    const messageDisplay = document.getElementById('messageDisplay');
    if (messageDisplay.style.display === 'block') {
      messageDisplay.style.display = 'none';
    }
  }
  
  // Ctrl/Cmd + Enter to submit form
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const contactForm = document.getElementById('contactFormElement');
    if (contactForm && document.activeElement.tagName !== 'BUTTON') {
      contactForm.dispatchEvent(new Event('submit'));
    }
  }
});