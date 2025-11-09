// Mobile menu toggle
document.querySelector('.menu-btn').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('active');
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