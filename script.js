document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Hackathon Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const hackathonCards = document.querySelectorAll('.hackathon-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter hackathon cards
            const filter = this.getAttribute('data-filter');
            
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
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    
    // Hackathon Registration Modal
    const registerBtns = document.querySelectorAll('.register-btn');
    const hackathonModal = document.getElementById('hackathon-modal');
    
    registerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const hackathonId = this.getAttribute('data-hackathon');
            
            // Set modal content based on hackathon
            if (hackathonId === 'codefest') {
                document.getElementById('modal-title').textContent = 'CodeFest 2023 Registration';
                document.getElementById('modal-hackathon-name').textContent = 'CodeFest 2023';
                document.getElementById('modal-description').textContent = 'Join us for a 24-hour coding marathon where you can showcase your skills, collaborate with peers, and win exciting prizes. This hackathon is open to all students with a passion for coding and innovation.';
                document.getElementById('modal-date').textContent = 'October 15, 2023';
                document.getElementById('modal-venue').textContent = 'JIIT Campus, Sector 62, Noida';
                document.getElementById('modal-duration').textContent = '24 Hours';
                document.getElementById('modal-image').src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
            } else if (hackathonId === 'innovatex') {
                document.getElementById('modal-title').textContent = 'InnovateX Registration';
                document.getElementById('modal-hackathon-name').textContent = 'InnovateX';
                document.getElementById('modal-description').textContent = 'InnovateX is a platform for creative minds to showcase their innovative ideas and compete with the best minds in the region. This online hackathon focuses on solving real-world problems through technology.';
                document.getElementById('modal-date').textContent = 'November 5, 2023';
                document.getElementById('modal-venue').textContent = 'Online Event';
                document.getElementById('modal-duration').textContent = '48 Hours';
                document.getElementById('modal-image').src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
            } else if (hackathonId === 'aichallenge') {
                document.getElementById('modal-title').textContent = 'AI Challenge Registration';
                document.getElementById('modal-hackathon-name').textContent = 'AI Challenge';
                document.getElementById('modal-description').textContent = 'Build AI-powered solutions to real-world problems in this exciting hackathon. Whether you\'re a beginner or an expert in AI, this event is perfect for you to learn, build, and innovate.';
                document.getElementById('modal-date').textContent = 'November 20, 2023';
                document.getElementById('modal-venue').textContent = 'JIIT Campus, Sector 62, Noida';
                document.getElementById('modal-duration').textContent = '36 Hours';
                document.getElementById('modal-image').src = 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
            }
            
            // Open modal
            hackathonModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Create Team Modal
    const createTeamBtn = document.getElementById('create-team-btn');
    const createTeamModal = document.getElementById('create-team-modal');
    
    createTeamBtn.addEventListener('click', function() {
        createTeamModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Join Our Team Modal
    const joinOurTeamBtn = document.getElementById('join-our-team-btn');
    const joinOurTeamModal = document.getElementById('join-our-team-modal');
    
    joinOurTeamBtn.addEventListener('click', function() {
        joinOurTeamModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Form submissions
    const registrationForm = document.getElementById('registration-form');
    const createTeamForm = document.getElementById('create-team-form');
    const joinOurTeamForm = document.getElementById('join-our-team-form');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Registration Successful!</h3>
            <p>Thank you for registering for the hackathon. We've sent a confirmation email with further details.</p>
            <button class="btn btn-primary close-success">Close</button>
        `;
        
        // Clear form
        registrationForm.reset();
        
        // Hide modal body and show success message
        const modalBody = document.querySelector('#hackathon-modal .modal-body');
        modalBody.innerHTML = '';
        modalBody.appendChild(successMessage);
        
        // Close button for success message
        document.querySelector('.close-success').addEventListener('click', function() {
            hackathonModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            location.reload(); // Reload to restore original modal content
        });
    });
    
    createTeamForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Team Created Successfully!</h3>
            <p>Your team has been created and is now visible in the "Find a Team" section. Start inviting members to join your team!</p>
            <button class="btn btn-primary close-success">Close</button>
        `;
        
        // Clear form
        createTeamForm.reset();
        
        // Hide modal body and show success message
        const modalBody = document.querySelector('#create-team-modal .modal-body');
        modalBody.innerHTML = '';
        modalBody.appendChild(successMessage);
        
        // Close button for success message
        document.querySelector('.close-success').addEventListener('click', function() {
            createTeamModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            location.reload(); // Reload to restore original modal content
        });
    });
    
    joinOurTeamForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Application Submitted!</h3>
            <p>Thank you for your interest in joining our team. We'll review your application and get back to you soon.</p>
            <button class="btn btn-primary close-success">Close</button>
        `;
        
        // Clear form
        joinOurTeamForm.reset();
        
        // Hide modal body and show success message
        const modalBody = document.querySelector('#join-our-team-modal .modal-body');
        modalBody.innerHTML = '';
        modalBody.appendChild(successMessage);
        
        // Close button for success message
        document.querySelector('.close-success').addEventListener('click', function() {
            joinOurTeamModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            location.reload(); // Reload to restore original modal content
        });
    });
    
    // Join Team Button
    const joinTeamBtns = document.querySelectorAll('.join-team-btn');
    
    joinTeamBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.position = 'fixed';
            successMessage.style.top = '50%';
            successMessage.style.left = '50%';
            successMessage.style.transform = 'translate(-50%, -50%)';
            successMessage.style.zIndex = '3000';
            successMessage.style.background = 'white';
            successMessage.style.padding = '30px';
            successMessage.style.borderRadius = '15px';
            successMessage.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
            successMessage.style.maxWidth = '500px';
            successMessage.style.width = '90%';
            successMessage.style.textAlign = 'center';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Request Sent!</h3>
                <p>Your request to join the team has been sent. You'll receive a notification once the team leader responds.</p>
                <button class="btn btn-primary close-success">Close</button>
            `;
            
            document.body.appendChild(successMessage);
            document.body.style.overflow = 'hidden';
            
            // Close button for success message
            document.querySelector('.close-success').addEventListener('click', function() {
                successMessage.remove();
                document.body.style.overflow = 'auto';
            });
        });
    });
    
    // Add CSS for success message
    const style = document.createElement('style');
    style.textContent = `
        .success-message .success-icon {
            font-size: 4rem;
            color: var(--success-color);
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .success-message p {
            color: var(--light-text);
            margin-bottom: 25px;
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.hackathon-card, .team-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
