// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle);
    }
}
// Initialize particles when page loads
window.addEventListener('load', createParticles);
// Mobile Navigation Toggle
document.querySelector('.mobile-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
        navLinks.style.borderRadius = '0 0 10px 10px';
    }
});
// Modal Functions
function showComingSoonModal() {
    document.getElementById('comingSoonModal').style.display = 'flex';
}
function closeModal() {
    document.getElementById('comingSoonModal').style.display = 'none';
}
// Close modal when clicking outside
window.onclick = function(event) {
    const comingSoonModal = document.getElementById('comingSoonModal');
    const registrationModal = document.getElementById('registrationModal');
    const launchModal = document.getElementById('launchModal');
    
    if (event.target == comingSoonModal) {
        comingSoonModal.style.display = 'none';
    }
    if (event.target == registrationModal) {
        registrationModal.style.display = 'none';
    }
    if (event.target == launchModal) {
        launchModal.style.display = 'none';
    }
}
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
// Supabase Configuration
const SUPABASE_URL = 'https://rafdwpdprsvvaiezmjhu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZmR3cGRwcnN2dmFpZXptamh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTI1MTgsImV4cCI6MjA3MTYyODUxOH0.1SO-faZMeRMGKeh-N_bgQHH69jRdfEewgMdA0qTOX50';
// Initialize Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Registration Modal Functions
function showRegistrationModal(event) {
    const modal = document.getElementById('registrationModal');
    const title = document.getElementById('registrationTitle');
    const description = document.getElementById('registrationDescription');
    
    // Set event-specific information
    title.textContent = `Register for ${event}`;
    description.textContent = `Join the ${event} community and connect with fellow participants`;
    
    // Store event data for form submission
    modal.dataset.event = event;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Reset form
    document.getElementById('registrationForm').reset();
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
}
function closeRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'none';
}
function resetForm() {
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'block';
    document.getElementById('loadingSpinner').style.display = 'none';
}
// Add event listeners to register buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', function() {
            const event = this.dataset.event;
            const websiteLink = this.dataset.website;
            
            // Store website link for later redirect
            document.getElementById('registrationModal').dataset.website = websiteLink;
            
            showRegistrationModal(event);
        });
    });
});
// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const campus = document.querySelector('input[name="campus"]:checked').value;
    
    // Get event data from modal
    const modal = document.getElementById('registrationModal');
    const eventName = modal.dataset.event;
    const websiteLink = modal.dataset.website;
    
    // Show loading state
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('loadingSpinner').style.display = 'block';
    
    try {
        // Insert data into Supabase
        const { data, error } = await supabaseClient
            .from('registrations')
            .insert([
                {
                    full_name: fullName,
                    email: email,
                    contact_number: contactNumber,
                    campus: campus,
                    event_name: eventName
                }
            ]);
            
        if (error) {
            throw error;
        }
        
        // Show success message
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Set the website link for the "Visit Official Website" button
        document.getElementById('visitWebsiteBtn').href = websiteLink;
        
    } catch (error) {
        console.error('Error saving data:', error);
        
        // Show error message
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'block';
        
        // Set error text
        const errorText = document.getElementById('errorText');
        if (error.message) {
            errorText.textContent = `Error: ${error.message}`;
        } else {
            errorText.textContent = 'There was an error with your registration. Please try again.';
        }
    }
});

// Launch Modal Timer
document.addEventListener('DOMContentLoaded', function() {
    // Set launch date to tomorrow at 1 PM
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 1); // Tomorrow
    launchDate.setHours(13, 0, 0, 0); // 1:00 PM
    
    // Format date for display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('modalLaunchDate').textContent = launchDate.toLocaleDateString(undefined, options);
    
    // Elements for countdown
    const daysEl = document.getElementById('modalDays');
    const hoursEl = document.getElementById('modalHours');
    const minutesEl = document.getElementById('modalMinutes');
    const secondsEl = document.getElementById('modalSeconds');
    const launchModal = document.getElementById('launchModal');
    
    // Check if current time is before launch time
    const now = new Date();
    if (now < launchDate) {
        // Show the modal
        launchModal.style.display = 'flex';
        
        // Update countdown every second
        const countdownInterval = setInterval(updateCountdown, 1000);
        
        function updateCountdown() {
            const currentTime = new Date().getTime();
            const distance = launchDate - currentTime;
            
            // If the countdown is over
            if (distance < 0) {
                clearInterval(countdownInterval);
                launchModal.style.display = 'none';
                return;
            }
            
            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update the DOM with leading zeros
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initial call
        updateCountdown();
    }
});
