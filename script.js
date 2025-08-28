// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li a');
const filterBtns = document.querySelectorAll('.filter-btn');
const hackathonCards = document.querySelectorAll('.hackathon-card');
const registerBtns = document.querySelectorAll('.register-btn');
const joinUsBtn = document.getElementById('joinUsBtn');
const closeModals = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Hackathon filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Show/hide hackathon cards based on filter
        hackathonCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal functionality
registerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const hackathonId = btn.getAttribute('data-id');
        openHackathonModal(hackathonId);
    });
});

joinUsBtn.addEventListener('click', () => {
    openModal('joinUsModal');
});

closeModals.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function openHackathonModal(hackathonId) {
    const modal = document.getElementById('hackathonModal');
    
    // Mock data for hackathons
    const hackathonData = {
        1: {
            name: 'CodeFest 2023',
            date: 'June 15, 2023',
            location: 'Online',
            prize: '$10,000',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            description: 'Join the biggest online coding competition of the year. CodeFest 2023 brings together developers from around the world to compete, learn, and showcase their skills. With multiple tracks, expert judges, and amazing prizes, this is an event you don\'t want to miss!'
        },
        2: {
            name: 'InnovateX',
            date: 'June 22, 2023',
            location: 'Delhi',
            prize: '$15,000',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            description: 'A 48-hour innovation challenge where teams work to solve real-world problems. With industry mentors, workshops, and networking opportunities, InnovateX is the perfect platform to turn your ideas into reality.'
        },
        3: {
            name: 'AI Challenge',
            date: 'July 5, 2023',
            location: 'Online',
            prize: '$20,000',
            image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
            description: 'Build innovative AI solutions for real-world problems. This challenge focuses on creating practical AI applications that can make a difference. Whether you\'re an AI expert or just starting, there\'s a place for you in the AI Challenge.'
        }
    };
    
    const hackathon = hackathonData[hackathonId];
    
    // Populate modal with hackathon data
    document.getElementById('modalTitle').textContent = 'Register for ' + hackathon.name;
    document.getElementById('modalHackathonName').textContent = hackathon.name;
    document.getElementById('modalDate').innerHTML = '<i class="fas fa-calendar-alt"></i> ' + hackathon.date;
    document.getElementById('modalLocation').innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + hackathon.location;
    document.getElementById('modalPrize').innerHTML = '<i class="fas fa-trophy"></i> ' + hackathon.prize;
    document.getElementById('modalDescription').textContent = hackathon.description;
    document.getElementById('modalImage').src = hackathon.image;
    
    modal.style.display = 'block';
}

// Form submissions
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const studentId = document.getElementById('studentId').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const teamPreference = document.getElementById('teamPreference').value;
    const terms = document.getElementById('terms').checked;
    
    // Simple validation
    if (!terms) {
        alert('Please agree to the terms and conditions');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log({
        fullName,
        email,
        phone,
        studentId,
        skills,
        experience,
        teamPreference
    });
    
    // Show success message
    alert('Registration successful! You will receive a confirmation email shortly.');
    
    // Close modal and reset form
    document.getElementById('hackathonModal').style.display = 'none';
    document.getElementById('registrationForm').reset();
});

document.getElementById('joinUsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('applicantName').value;
    const email = document.getElementById('applicantEmail').value;
    const phone = document.getElementById('applicantPhone').value;
    const year = document.getElementById('applicantYear').value;
    const department = document.getElementById('applicantDepartment').value;
    const role = document.getElementById('applicantRole').value;
    const skills = document.getElementById('applicantSkills').value;
    const motivation = document.getElementById('applicantMotivation').value;
    const experience = document.getElementById('applicantExperience').value;
    
    // In a real application, you would send this data to a server
    console.log({
        name,
        email,
        phone,
        year,
        department,
        role,
        skills,
        motivation,
        experience
    });
    
    // Show success message
    alert('Application submitted successfully! We will contact you soon for the next steps.');
    
    // Close modal and reset form
    document.getElementById('joinUsModal').style.display = 'none';
    document.getElementById('joinUsForm').reset();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hackathon-card, .info-card, .feature-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.hackathon-card, .info-card, .feature-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
