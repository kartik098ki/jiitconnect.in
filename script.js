// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const registerBtns = document.querySelectorAll('.register-btn');
const modal = document.getElementById('hackathon-modal');
const closeModal = document.querySelector('.close-modal');
const hackathonDetail = document.getElementById('hackathon-detail');
const notifyForm = document.getElementById('notify-form');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hackathon data
const hackathons = {
    codefest: {
        name: 'CodeFest 2023',
        date: '15-17 October 2023',
        type: 'Online',
        description: 'CodeFest is a 48-hour coding marathon where participants from across the country come together to build innovative solutions to real-world problems. With prizes worth ₹1,00,000 and mentorship from industry experts, this is an opportunity you don\'t want to miss!',
        highlights: [
            '48-hour coding marathon',
            'Prizes worth ₹1,00,000',
            'Mentorship from industry experts',
            'Networking opportunities with top tech companies',
            'Free swag and goodies for all participants'
        ],
        eligibility: 'Open to all college students with a valid college ID',
        rules: [
            'Teams can consist of 1-4 members',
            'All code must be written during the event',
            'Projects must be submitted before the deadline',
            'Plagiarism will lead to immediate disqualification'
        ]
    },
    innovatex: {
        name: 'InnovateX',
        date: '5-6 November 2023',
        type: 'Hybrid',
        description: 'InnovateX is an innovation challenge focusing on AI and Machine Learning. Participants will work on solving complex problems using cutting-edge technologies. The event will be held in a hybrid format, allowing both in-person and virtual participation.',
        highlights: [
            'Focus on AI and Machine Learning',
            'Hybrid event format',
            'Workshops by industry leaders',
            'Prizes worth ₹75,000',
            'Opportunity to showcase projects to investors'
        ],
        eligibility: 'Open to students with knowledge or interest in AI/ML',
        rules: [
            'Teams can consist of 1-3 members',
            'Projects must leverage AI/ML technologies',
            'A presentation and demo are required',
            'All intellectual property remains with the participants'
        ]
    },
    buildathon: {
        name: 'Buildathon',
        date: '20-21 December 2023',
        type: 'In-Person',
        description: 'Buildathon is a hardware and software integration challenge where participants create innovative IoT solutions. With access to state-of-the-art hardware components and mentorship from embedded systems experts, teams will build prototypes that solve real-world problems.',
        highlights: [
            'Hardware and software integration challenge',
            'Access to state-of-the-art components',
            'Mentorship from embedded systems experts',
            'Prizes worth ₹50,000',
            'Opportunity to convert projects into startups'
        ],
        eligibility: 'Open to students with interest in IoT and embedded systems',
        rules: [
            'Teams can consist of 2-4 members',
            'Hardware will be provided at the venue',
            'Teams must return all borrowed components',
            'Projects must demonstrate a working prototype'
        ]
    }
};

// Show hackathon details in modal
registerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const hackathonKey = btn.getAttribute('data-hackathon');
        const hackathon = hackathons[hackathonKey];
        
        if (hackathon) {
            displayHackathonDetails(hackathon);
            modal.style.display = 'block';
        }
    });
});

// Display hackathon details
function displayHackathonDetails(hackathon) {
    hackathonDetail.innerHTML = `
        <div class="hackathon-detail-header">
            <h2>${hackathon.name}</h2>
            <div class="date-type">
                <span>${hackathon.date}</span>
                <span>${hackathon.type}</span>
            </div>
        </div>
        <div class="hackathon-detail-content">
            <h3>About</h3>
            <p>${hackathon.description}</p>
            
            <h3>Highlights</h3>
            <ul>
                ${hackathon.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
            
            <h3>Eligibility</h3>
            <p>${hackathon.eligibility}</p>
            
            <h3>Rules</h3>
            <ul>
                ${hackathon.rules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
        </div>
        <div class="hackathon-register-form">
            <h3>Register for ${hackathon.name}</h3>
            <form id="hackathon-registration-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" required>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="college">College</label>
                        <input type="text" id="college" name="college" required>
                    </div>
                    <div class="form-group">
                        <label for="year">Year of Study</label>
                        <select id="year" name="year" required>
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="teamName">Team Name (If applicable)</label>
                    <input type="text" id="teamName" name="teamName">
                </div>
                <div class="form-group">
                    <label for="experience">Previous Hackathon Experience</label>
                    <textarea id="experience" name="experience" placeholder="Tell us about your previous hackathon experience..."></textarea>
                </div>
                <div class="form-group">
                    <label for="expectations">What do you expect to gain from this hackathon?</label>
                    <textarea id="expectations" name="expectations" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Register Now</button>
            </form>
        </div>
    `;
    
    // Add event listener to the registration form
    const registrationForm = document.getElementById('hackathon-registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleHackathonRegistration);
    }
}

// Handle hackathon registration
function handleHackathonRegistration(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    console.log('Registration data:', data);
    
    // Show success message
    alert('Registration successful! You will receive a confirmation email shortly.');
    
    // Close modal
    modal.style.display = 'none';
    
    // Reset form
    e.target.reset();
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle notification form submission
notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // In a real application, you would send this email to a server
    console.log('Notification email:', email);
    
    // Show success message
    const formContainer = e.target.parentElement;
    formContainer.innerHTML = '<p style="color: #10b981; font-weight: 500;">Thank you! We will notify you when applications open.</p>';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .hackathon-card, .role').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});