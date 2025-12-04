// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling is already handled by CSS (scroll-behavior: smooth)
    // But we'll add extra smooth scrolling for better control
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navMenu = document.querySelector('nav ul');
                    const hamburger = document.querySelector('.hamburger-menu');
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});

// ========================================
// Mobile Hamburger Menu Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = this.classList.toggle('active');
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', isActive);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ========================================
// Image Lightbox/Modal
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-container img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    if (lightbox && lightboxImg) {
        images.forEach(img => {
            // Make images clickable and keyboard accessible
            img.style.cursor = 'pointer';
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'Click to view larger image');
            
            // Click event
            img.addEventListener('click', function() {
                openLightbox(this);
            });
            
            // Keyboard event (Enter or Space)
            img.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(this);
                }
            });
        });
        
        function openLightbox(img) {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            const caption = img.closest('.image-container').querySelector('figcaption');
            if (caption) {
                lightboxCaption.textContent = caption.textContent;
            }
            
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }
        
        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        
        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});

// ========================================
// Active Navigation Highlighting
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNav() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Call on load
});

// ========================================
// Timeline Animation for Membership Growth
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe statistics
    const statistics = document.querySelectorAll('.statistics li');
    statistics.forEach(stat => {
        stat.classList.add('fade-in-stat');
        observer.observe(stat);
    });
    
    // Observe images
    const images = document.querySelectorAll('.image-container');
    images.forEach(img => {
        img.classList.add('fade-in-image');
        observer.observe(img);
    });
    
    // Observe content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});

// ========================================
// Interactive Quiz/Knowledge Check
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const quiz = document.querySelector('.quiz');
    
    if (quiz) {
        const quizForm = quiz.querySelector('.quiz-form');
        const submitBtn = quiz.querySelector('.quiz-submit');
        const resultsDiv = quiz.querySelector('.quiz-results');
        
        if (quizForm && submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                checkQuizAnswers();
            });
        }
        
        function checkQuizAnswers() {
            const questions = quizForm.querySelectorAll('.quiz-question');
            let correct = 0;
            let total = questions.length;
            
            questions.forEach(question => {
                const selected = question.querySelector('input[type="radio"]:checked');
                const feedback = question.querySelector('.quiz-feedback');
                
                if (selected) {
                    const isCorrect = selected.dataset.correct === 'true';
                    
                    if (isCorrect) {
                        correct++;
                        feedback.textContent = '✓ Correct!';
                        feedback.className = 'quiz-feedback correct';
                    } else {
                        feedback.textContent = '✗ Incorrect';
                        feedback.className = 'quiz-feedback incorrect';
                    }
                    feedback.style.display = 'block';
                }
            });
            
            // Show results
            const percentage = Math.round((correct / total) * 100);
            resultsDiv.innerHTML = `
                <h3>Quiz Results</h3>
                <p>You got <strong>${correct} out of ${total}</strong> questions correct (${percentage}%).</p>
                ${percentage >= 70 ? 
                    '<p class="pass">Great job! You have a good understanding of this topic.</p>' : 
                    '<p class="fail">Keep learning! Review the material above for a better understanding.</p>'
                }
            `;
            resultsDiv.style.display = 'block';
            
            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
