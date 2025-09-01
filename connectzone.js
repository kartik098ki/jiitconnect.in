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
function closeLaunchModal() {
    document.getElementById('launchModal').style.display = 'none';
}

function closeComingSoonModal() {
    document.getElementById('comingSoonModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const launchModal = document.getElementById('launchModal');
    const comingSoonModal = document.getElementById('comingSoonModal');
    
    if (event.target == launchModal) {
        launchModal.style.display = 'none';
    }
    
    if (event.target == comingSoonModal) {
        comingSoonModal.style.display = 'none';
    }
}

// ConnectZone Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to register button
    document.getElementById('registerBtn').addEventListener('click', function() {
        // Show launch modal
        document.getElementById('launchModal').style.display = 'flex';
    });
    
    // Add event listeners to showcase cards
    const showcaseCards = document.querySelectorAll('.showcase-card');
    
    showcaseCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            let title, description;
            
            switch(feature) {
                case 'showcase':
                    title = 'Project Showcase';
                    description = 'The project showcase feature is under development. Soon you\'ll be able to display your innovative work and get discovered by peers and industry professionals.';
                    break;
                case 'team':
                    title = 'Team Finder';
                    description = 'The team finder feature is under development. Soon you\'ll be able to connect with talented individuals who share your passion and vision.';
                    break;
                case 'collaborate':
                    title = 'Collaboration Space';
                    description = 'The collaboration space is under development. Soon you\'ll be able to work together on groundbreaking ideas and bring them to life.';
                    break;
                default:
                    title = 'Coming Soon';
                    description = 'This feature is under development and will be available soon. Stay tuned for updates!';
            }
            
            // Update coming soon modal
            document.getElementById('comingSoonTitle').textContent = title;
            document.getElementById('comingSoonDescription').textContent = description;
            
            // Show modal
            document.getElementById('comingSoonModal').style.display = 'flex';
        });
    });
});
