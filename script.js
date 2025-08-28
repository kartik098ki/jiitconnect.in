document.addEventListener('DOMContentLoaded', function() {
    // Previous JavaScript code remains the same...

    // Team Filter
    const teamFilterBtns = document.querySelectorAll('.team-filter-btn');
    const teamCards = document.querySelectorAll('.team-card');
    
    teamFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            teamFilterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter team cards
            const filter = this.getAttribute('data-filter');
            
            teamCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Join Team Button - Open Google Form
    const joinTeamBtns = document.querySelectorAll('.join-team-btn');
    
    joinTeamBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const formUrl = this.getAttribute('data-form-url');
            if (formUrl) {
                window.open(formUrl, '_blank');
            }
        });
    });
    
    // View Details Button
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const teamDetailsModal = document.getElementById('team-details-modal');
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const teamCard = this.closest('.team-card');
            
            // Get team details from the card
            const teamName = teamCard.querySelector('.team-info h3').textContent;
            const teamProject = teamCard.querySelector('.team-info p').textContent;
            const teamStatus = teamCard.querySelector('.status').textContent;
            const teamDifficulty = teamCard.querySelector('.difficulty').textContent;
            const teamDescription = teamCard.querySelector('.team-description p').textContent;
            const teamTags = Array.from(teamCard.querySelectorAll('.tag')).map(tag => tag.textContent);
            const teamProgress = teamCard.querySelector('.progress-text').textContent;
            const formUrl = teamCard.querySelector('.join-team-btn').getAttribute('data-form-url');
            
            // Set modal content
            document.getElementById('modal-team-name').textContent = teamName;
            document.getElementById('modal-team-title').textContent = teamName;
            document.getElementById('modal-team-project').textContent = teamProject;
            document.getElementById('modal-team-status').textContent = teamStatus;
            document.getElementById('modal-team-difficulty').textContent = teamDifficulty;
            document.getElementById('modal-team-description').textContent = teamDescription;
            document.getElementById('modal-team-note').textContent = 'Clicking "Join Team" will redirect you to a Google Form to apply.';
            
            // Set status class
            const statusElement = document.getElementById('modal-team-status');
            statusElement.className = 'status';
            if (teamStatus.toLowerCase() === 'active') {
                statusElement.classList.add('active');
            } else if (teamStatus.toLowerCase() === 'recruiting') {
                statusElement.classList.add('recruiting');
            } else if (teamStatus.toLowerCase() === 'full') {
                statusElement.classList.add('full');
            }
            
            // Set tags
            const tagsContainer = document.getElementById('modal-team-skills');
            tagsContainer.innerHTML = '';
            teamTags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
            
            // Set progress
            document.getElementById('modal-team-progress').textContent = teamProgress;
            
            // Set join button URL
            document.getElementById('modal-join-btn').setAttribute('data-form-url', formUrl);
            
            // Open modal
            teamDetailsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Modal Join Team Button
    const modalJoinBtn = document.getElementById('modal-join-btn');
    
    modalJoinBtn.addEventListener('click', function() {
        const formUrl = this.getAttribute('data-form-url');
        if (formUrl) {
            window.open(formUrl, '_blank');
        }
    });
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        
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
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us, ${name}. We'll get back to you soon at ${email}.</p>
            <button class="btn btn-primary close-success">Close</button>
        `;
        
        document.body.appendChild(successMessage);
        document.body.style.overflow = 'hidden';
        
        // Clear form
        contactForm.reset();
        
        // Close button for success message
        document.querySelector('.close-success').addEventListener('click', function() {
            successMessage.remove();
            document.body.style.overflow = 'auto';
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
    
    // Previous JavaScript code continues...
});
