// Mobile menu toggle
document.querySelector('.menu-btn').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelector('.nav-links').classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Animate skill bars on scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;
  });
}

// Initialize particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#6e44ff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#6e44ff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    }
  }
});

// Initialize animations when page loads
window.addEventListener('load', function() {
  animateSkillBars();
});

// Video modal functionality
const videoModal = document.getElementById('videoModal');
const demoVideo = document.getElementById('demoVideo');
const videoSource = document.getElementById('videoSource');
const closeModal = document.getElementById('closeModal');

// Handle demo button clicks
document.querySelectorAll('.demo-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const videoSrc = this.getAttribute('data-video');
    videoSource.src = videoSrc;
    demoVideo.load();
    videoModal.classList.add('active');
  });
});

// Close modal
closeModal.addEventListener('click', function() {
  videoModal.classList.remove('active');
  demoVideo.pause();
});

// Close modal when clicking outside
videoModal.addEventListener('click', function(e) {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    demoVideo.pause();
  }
});

// View More Projects functionality
const viewMoreBtn = document.getElementById('viewMoreBtn');
const hiddenProjects = document.querySelectorAll('.project-card.hidden');
let projectsVisible = false;

viewMoreBtn.addEventListener('click', function() {
  projectsVisible = !projectsVisible;
  
  hiddenProjects.forEach(project => {
    if (projectsVisible) {
      project.classList.remove('hidden');
    } else {
      project.classList.add('hidden');
    }
  });

  // Update button text and icon
  if (projectsVisible) {
    viewMoreBtn.innerHTML = '<i class="fas fa-minus"></i> View Less Projects';
  } else {
    viewMoreBtn.innerHTML = '<i class="fas fa-plus"></i> View More Projects';
  }
});

// View More Certifications functionality
const viewMoreCertsBtn = document.getElementById('viewMoreCertsBtn');
const hiddenCerts = document.querySelectorAll('.cert-card.hidden');
let certsVisible = false;

viewMoreCertsBtn.addEventListener('click', function() {
  certsVisible = !certsVisible;
  
  hiddenCerts.forEach(cert => {
    if (certsVisible) {
      cert.classList.remove('hidden');
    } else {
      cert.classList.add('hidden');
    }
  });

  // Update button text and icon
  if (certsVisible) {
    viewMoreCertsBtn.innerHTML = '<i class="fas fa-minus"></i> View Less Certifications';
  } else {
    viewMoreCertsBtn.innerHTML = '<i class="fas fa-plus"></i> View More Certifications';
  }
});

// EmailJS functionality
(function() {
  // Initialize EmailJS with your public key
  emailjs.init('_IumjEKcAp9Tf9HYy'); // Replace with your EmailJS public key

  const contactForm = document.getElementById('contactForm');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to_name: 'Min Khant Zaw' // Your name
    };

    // Send email using EmailJS
    emailjs.send('service_fkilaxl', 'template_9l12jy6', templateParams) // Replace with your service and template IDs
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        contactForm.reset();
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send message. Please try again.');
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      });
  });
})();