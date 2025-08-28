// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li a');
const filterBtns = document.querySelectorAll('.filter-btn');
const hackathonCards = document.querySelectorAll('.hackathon-card');
const registerBtns = document.querySelectorAll('.register-btn');
const createTeamBtn = document.getElementById('createTeamBtn');
const joinTeamBtn = document.getElementById('joinTeamBtn');
const joinUsBtn = document.getElementById('joinUsBtn');
const joinWaitlistBtn = document.getElementById('joinWaitlistBtn');
const closeModals = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');
const teamPage = document.getElementById('teamPage');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// Team data storage
let teams = [
    {
        id: 1,
        name: 'Code Warriors',
        hackathon: 'CodeFest 2023',
        hackathonId: '1',
        members: 2,
        maxMembers: 4,
        description: 'We are a team of passionate developers looking to build an innovative solution for CodeFest 2023.',
        lookingFor: 'Frontend Developer, UI/UX Designer',
        leader: 'Akash',
        leaderEmail: 'akash@example.com',
        membersList: [
            { name: 'Akash', email: 'akash@example.com' },
            { name: 'Priya', email: 'priya@example.com' }
        ]
    },
    {
        id: 2,
        name: 'Innovators',
        hackathon: 'InnovateX',
        hackathonId: '2',
        members: 1,
        maxMembers: 4,
        description: 'Join our team for InnovateX! I\'m a full-stack developer with experience in building web applications.',
        lookingFor: 'Backend Developer, Mobile Developer, Designer',
        leader: 'Rahul',
        leaderEmail: 'rahul@example.com',
        membersList: [
            { name: 'Rahul', email: 'rahul@example.com' }
        ]
    },
    {
        id: 3,
        name: 'AI Pioneers',
        hackathon: 'AI Challenge',
        hackathonId: '3',
        members: 3,
        maxMembers: 4,
        description: 'We\'re a team of AI enthusiasts working on a machine learning solution for the AI Challenge.',
        lookingFor: 'Data Scientist',
        leader: 'Vikram',
        leaderEmail: 'vikram@example.com',
        membersList: [
            { name: 'Vikram', email: 'vikram@example.com' },
            { name: 'Ananya', email: 'ananya@example.com' },
            { name: 'Karan', email: 'karan@example.com' }
        ]
    }
];

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
        
        if (targetId === '#teams') {
            // Show team page instead of scrolling
            showTeamPage();
            return;
        }
        
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Show team page
function showTeamPage() {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    teamPage.style.display = 'block';
    
    // Initialize team page
    renderTeams('joinTeamGrid');
    renderTeams('browseTeamGrid');
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Back to home
backToHomeBtn.addEventListener('click', () => {
    teamPage.style.display = 'none';
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'block';
    });
    
    // Scroll to teams section
    window.scrollTo({
        top: document.getElementById('teams').offsetTop - 70,
        behavior: 'smooth'
    });
});

// Team page tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding tab pane
        const tabId = btn.getAttribute('data-tab');
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === `${tabId}-tab`) {
                pane.classList.add('active');
            }
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

createTeamBtn.addEventListener('click', () => {
    showTeamPage();
    // Switch to create team tab
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tab="create"]').classList.add('active');
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === 'create-tab') {
            pane.classList.add('active');
        }
    });
});

joinTeamBtn.addEventListener('click', () => {
    showTeamPage();
    // Switch to join team tab
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tab="join"]').classList.add('active');
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === 'join-tab') {
            pane.classList.add('active');
        }
    });
});

joinUsBtn.addEventListener('click', () => {
    openModal('joinUsModal');
});

joinWaitlistBtn.addEventListener('click', () => {
    openModal('joinWaitlistModal');
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

// Render teams in grid
function renderTeams(gridId) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    
    teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.setAttribute('data-hackathon', team.hackathonId);
        
        // Create member slots
        let memberSlotsHTML = '';
        for (let i = 0; i < team.maxMembers; i++) {
            if (i < team.membersList.length) {
                memberSlotsHTML += `
                    <div class="member">
                        <img src="https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg" alt="Member">
                        <span>${team.membersList[i].name}</span>
                    </div>
                `;
            } else {
                memberSlotsHTML += `
                    <div class="member-slot empty">
                        <i class="fas fa-plus"></i>
                    </div>
                `;
            }
        }
        
        teamCard.innerHTML = `
            <div class="team-header">
                <h3>${team.name}</h3>
                <span class="team-status">Looking for members</span>
            </div>
            <div class="team-info">
                <p><i class="fas fa-users"></i> ${team.members}/${team.maxMembers} members</p>
                <p><i class="fas fa-tag"></i> ${team.hackathon}</p>
                <p><i class="fas fa-search"></i> Looking for: ${team.lookingFor}</p>
            </div>
            <div class="team-members">
                ${memberSlotsHTML}
            </div>
            <button class="btn btn-primary join-team-btn" data-team="${team.id}">Join Team</button>
        `;
        
        grid.appendChild(teamCard);
    });
    
    // Add event listeners to join team buttons
    document.querySelectorAll('.join-team-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const teamId = parseInt(btn.getAttribute('data-team'));
            openJoinTeamModal(teamId);
        });
    });
}

// Team filtering
document.getElementById('joinTeamSearch')?.addEventListener('input', filterTeams);
document.getElementById('joinHackathonFilter')?.addEventListener('change', filterTeams);
document.getElementById('browseTeamSearch')?.addEventListener('input', filterTeams);
document.getElementById('browseHackathonFilter')?.addEventListener('change', filterTeams);

function filterTeams(e) {
    const searchTerm = e.target.value.toLowerCase();
    const hackathonValue = e.target.id.includes('join') ? 
        document.getElementById('joinHackathonFilter').value : 
        document.getElementById('browseHackathonFilter').value;
    
    const gridId = e.target.id.includes('join') ? 'joinTeamGrid' : 'browseTeamGrid';
    const teamCards = document.querySelectorAll(`#${gridId} .team-card`);
    
    teamCards.forEach(card => {
        const teamName = card.querySelector('.team-header h3').textContent.toLowerCase();
        const teamHackathon = card.getAttribute('data-hackathon');
        
        const matchesSearch = teamName.includes(searchTerm);
        const matchesHackathon = hackathonValue === 'all' || teamHackathon === hackathonValue;
        
        if (matchesSearch && matchesHackathon) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
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

document.getElementById('createTeamForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const teamName = document.getElementById('teamNameInput').value;
    const hackathonId = document.getElementById('teamHackathonSelect').value;
    const teamSize = parseInt(document.getElementById('teamSize').value);
    const description = document.getElementById('teamDescriptionInput').value;
    const lookingFor = document.getElementById('teamLookingFor').value;
    const leaderName = document.getElementById('leaderName').value;
    const leaderEmail = document.getElementById('leaderEmail').value;
    
    // Get hackathon name
    const hackathonNames = {
        '1': 'CodeFest 2023',
        '2': 'InnovateX',
        '3': 'AI Challenge'
    };
    
    // Create new team object
    const newTeam = {
        id: teams.length + 1,
        name: teamName,
        hackathon: hackathonNames[hackathonId],
        hackathonId: hackathonId,
        members: 1,
        maxMembers: teamSize,
        description: description,
        lookingFor: lookingFor,
        leader: leaderName,
        leaderEmail: leaderEmail,
        membersList: [
            { name: leaderName, email: leaderEmail }
        ]
    };
    
    // Add to teams array
    teams.push(newTeam);
    
    // In a real application, you would send this data to a server
    console.log(newTeam);
    
    // Show success message
    alert('Team created successfully! Your team is now visible to other students.');
    
    // Reset form and update team grids
    document.getElementById('createTeamForm').reset();
    renderTeams('joinTeamGrid');
    renderTeams('browseTeamGrid');
    
    // Switch to browse tab to see the new team
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tab="browse"]').classList.add('active');
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === 'browse-tab') {
            pane.classList.add('active');
        }
    });
});

document.getElementById('joinTeamForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('joinFullName').value;
    const email = document.getElementById('joinEmail').value;
    const skills = document.getElementById('joinSkills').value;
    const message = document.getElementById('joinMessage').value;
    const teamId = parseInt(document.getElementById('joinTeamForm').getAttribute('data-team-id'));
    
    // Find the team
    const team = teams.find(t => t.id === teamId);
    
    if (team && team.members < team.maxMembers) {
        // Add member to team
        team.membersList.push({ name: fullName, email: email });
        team.members++;
        
        // In a real application, you would send this data to a server
        console.log({
            teamId,
            fullName,
            email,
            skills,
            message
        });
        
        // Show success message
        alert('Your request to join the team has been sent! The team leader will contact you soon.');
        
        // Close modal and reset form
        document.getElementById('joinTeamModal').style.display = 'none';
        document.getElementById('joinTeamForm').reset();
        
        // Update team grids
        renderTeams('joinTeamGrid');
        renderTeams('browseTeamGrid');
    } else {
        alert('This team is already full!');
    }
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

document.getElementById('waitlistForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('waitlistName').value;
    const email = document.getElementById('waitlistEmail').value;
    const year = document.getElementById('waitlistYear').value;
    const department = document.getElementById('waitlistDepartment').value;
    const interests = document.getElementById('waitlistInterests').value;
    
    // In a real application, you would send this data to a server
    console.log({
        name,
        email,
        year,
        department,
        interests
    });
    
    // Show success message
    alert('You have been added to the waitlist! We will notify you when the Senior Mentorship Program launches.');
    
    // Close modal and reset form
    document.getElementById('joinWaitlistModal').style.display = 'none';
    document.getElementById('waitlistForm').reset();
});

function openJoinTeamModal(teamId) {
    const modal = document.getElementById('joinTeamModal');
    const team = teams.find(t => t.id === teamId);
    
    if (team) {
        // Set team ID in form
        document.getElementById('joinTeamForm').setAttribute('data-team-id', teamId);
        
        // Populate modal with team data
        document.getElementById('teamName').textContent = team.name;
        document.getElementById('teamHackathon').innerHTML = '<i class="fas fa-tag"></i> ' + team.hackathon;
        document.getElementById('teamMembers').innerHTML = `<i class="fas fa-users"></i> ${team.members}/${team.maxMembers} members`;
        document.getElementById('teamDescription').textContent = team.description;
        
        modal.style.display = 'block';
    }
}

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
