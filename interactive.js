// Interactive Features for Hitler Youth History Project

// ===== HAMBURGER MENU =====
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    
    if (!hamburger || !nav) return;
    
    // Toggle menu
    hamburger.addEventListener('click', () => {
        const isActive = nav.classList.contains('active');
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
    });
    
    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !hamburger.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// ===== INTERACTIVE TIMELINE =====
function initTimeline() {
    const timelineContainer = document.getElementById('interactive-timeline');
    if (!timelineContainer) return;

    const timelineEvents = [
        { 
            year: 1926, 
            title: 'Formation', 
            description: 'Groups formed called Hitler Youth',
        },
        { 
            year: 1933, 
            title: 'Nazi Power', 
            description: 'After Nazis took power, independent youth groups were banned, such as boy scouts',
         
        },
        { 
            year: 1936, 
            title: 'Standardization', 
            description: 'Laws made the organisation more official.',
           
        },
        { 
            year: 1939, 
            title: 'Mandatory Membership', 
            description: 'Membership became mandatory for ages 10-18.',
            
        },
        { 
            year: 1944, 
            title: 'War Participation', 
            description: 'Used more of the older teens in fighting roles for the war',
           
        },
        { 
            year: 1945, 
            title: 'Dissolution', 
            description: 'After Germany lost the war, Hitler Youth was banned.',
           
        }
    ];

    let currentEvent = 0;

    const timelineHTML = `
        <div class="timeline-wrapper">
            <div class="timeline-header">
                <h3>Hitler Youth Timeline</h3>
            </div>
            <div class="timeline-line"></div>
            <div class="timeline-events">
                ${timelineEvents.map((event, index) => `
                    <div class="timeline-event ${index === 0 ? 'active' : ''}" data-index="${index}">
                        <div class="timeline-dot"></div>
                        <div class="timeline-year">${event.year}</div>
                    </div>
                `).join('')}
            </div>
            <div class="timeline-content-dual">
                <div class="timeline-track hy-track">
                    <h4 class="timeline-track-label">Hitler Youth</h4>
                    <div class="timeline-track-content">
                        <h3 class="timeline-title">${timelineEvents[0].title}</h3>
                        <p class="timeline-description">${timelineEvents[0].description}</p>
                    </div>
                </div>
            </div>
            <div class="timeline-controls">
                <button class="timeline-btn timeline-prev" disabled>← Previous</button>
                <span class="timeline-counter">1 / ${timelineEvents.length}</span>
                <button class="timeline-btn timeline-next">Next →</button>
            </div>
        </div>
    `;

    timelineContainer.innerHTML = timelineHTML;

    // Event listeners
    const events = timelineContainer.querySelectorAll('.timeline-event');
    const prevBtn = timelineContainer.querySelector('.timeline-prev');
    const nextBtn = timelineContainer.querySelector('.timeline-next');
    const counter = timelineContainer.querySelector('.timeline-counter');
    const title = timelineContainer.querySelector('.timeline-title');
    const description = timelineContainer.querySelector('.timeline-description');

    function updateTimeline(index) {
        currentEvent = index;
        
        // Update active event
        events.forEach((e, i) => {
            e.classList.toggle('active', i === index);
        });

        // Update content with animation
        title.style.opacity = '0';
        description.style.opacity = '0';
        
        setTimeout(() => {
            title.textContent = timelineEvents[index].title;
            description.textContent = timelineEvents[index].description;
            title.style.opacity = '1';
            description.style.opacity = '1';
        }, 200);

        // Update buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === timelineEvents.length - 1;
        counter.textContent = `${index + 1} / ${timelineEvents.length}`;
    }

    events.forEach((event, index) => {
        event.addEventListener('click', () => updateTimeline(index));
    });

    prevBtn.addEventListener('click', () => {
        if (currentEvent > 0) updateTimeline(currentEvent - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentEvent < timelineEvents.length - 1) updateTimeline(currentEvent + 1);
    });
}

// ===== HOVER-TO-REVEAL FACTS =====
function initHoverFacts() {
    const facts = document.querySelectorAll('.hover-fact');
    
    facts.forEach(fact => {
        const trigger = fact.querySelector('.hover-trigger');
        const reveal = fact.querySelector('.hover-reveal');
        
        if (trigger && reveal) {
            trigger.addEventListener('mouseenter', () => {
                reveal.classList.add('visible');
            });
            
            trigger.addEventListener('mouseleave', () => {
                reveal.classList.remove('visible');
            });

            // Touch support for mobile
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                reveal.classList.toggle('visible');
            });
        }
    });
}

// ===== FLIP CARDS FOR KEY TERMS =====
function initFlipCards() {
    const cards = document.querySelectorAll('.flip-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
}

// ===== INTERACTIVE MAP =====
function initInteractiveMap() {
    const mapContainer = document.getElementById('interactive-map');
    if (!mapContainer) return;

    const regions = [
        { id: 'berlin', name: 'Berlin', year: '1926', members: 'Initial HQ', x: 52, y: 28 },
        { id: 'munich', name: 'Munich', year: '1923', members: 'Origin of Nazi Youth', x: 48, y: 45 },
        { id: 'hamburg', name: 'Hamburg', year: '1933', members: 'Major Northern Hub', x: 54, y: 18 },
        { id: 'vienna', name: 'Vienna (Austria)', year: '1938', members: 'After Anschluss', x: 48, y: 54 },
        { id: 'prague', name: 'Prague (Czechia)', year: '1939', members: 'Occupation Period', x: 56, y: 42 }
    ];

    const mapHTML = `
        <div class="map-container">
            <div class="map-title">Hitler Youth Expansion Across Central Europe</div>
            <div class="map-canvas">
                <svg class="map-svg" viewBox="0 0 100 100">
                    <!-- Simplified Central Europe outline -->
                    <path d="M 20,30 L 30,20 L 45,22 L 60,18 L 75,25 L 80,35 L 78,50 L 70,60 L 55,65 L 40,62 L 28,55 L 22,45 Z" 
                          fill="#e8e4dc" stroke="#8b7355" stroke-width="0.5"/>
                    ${regions.map(region => `
                        <circle class="map-marker" data-region="${region.id}" 
                                cx="${region.x}" cy="${region.y}" r="3" 
                                fill="#8b7355" stroke="#2c2c2c" stroke-width="0.5"/>
                    `).join('')}
                </svg>
            </div>
            <div class="map-legend">
                <div class="map-info">Click markers to learn more</div>
            </div>
            <div class="map-details" id="map-details">
                <h4 class="map-details-title">Select a location</h4>
                <p class="map-details-text">Click on the markers to see information about Hitler Youth presence in different regions.</p>
            </div>
        </div>
    `;

    mapContainer.innerHTML = mapHTML;

    // Add interactivity
    const markers = mapContainer.querySelectorAll('.map-marker');
    const detailsTitle = mapContainer.querySelector('.map-details-title');
    const detailsText = mapContainer.querySelector('.map-details-text');

    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const regionId = marker.dataset.region;
            const region = regions.find(r => r.id === regionId);
            
            // Remove active class from all markers and reset their appearance
            markers.forEach(m => {
                m.classList.remove('active');
                m.setAttribute('r', '3');
                m.setAttribute('fill', '#8b7355');
            });
            
            // Set active marker appearance
            marker.classList.add('active');
            marker.setAttribute('r', '4');
            marker.setAttribute('fill', '#7a6347');

            // Update details
            detailsTitle.textContent = region.name;
            detailsText.textContent = `Established: ${region.year} | Note: ${region.members}`;
        });

        marker.addEventListener('mouseenter', () => {
            marker.setAttribute('r', '4');
            marker.setAttribute('fill', '#7a6347');
        });

        marker.addEventListener('mouseleave', () => {
            if (!marker.classList.contains('active')) {
                marker.setAttribute('r', '3');
                marker.setAttribute('fill', '#8b7355');
            }
        });
    });
}

// ===== SCENARIO SIMULATION MINI-GAME =====
function initScenarioGame() {
    const gameContainer = document.getElementById('scenario-game');
    if (!gameContainer) return;

    const scenarios = [
        {
            situation: "It's 1938. You are 14 years old and all of your friends have joined Hitler Youth. They pressure you to join...",
            choices: [
                { text: "Join to fit in with friends", consequence: "You joined due to peer pressure, like millions of youths. Social pressure was a major recruitment tool." },
                { text: "Refuse and face social isolation", consequence: "You faced isolation and potential legal consequences. By 1939, membership became mandatory with legal penalties for refusal." },
                { text: "Join but remain internally critical", consequence: "Some youths joined outwardly but maintained private doubts. This was risky as the organization encouraged reporting of dissenters." }
            ]
        },
        {
            situation: "It's 1943. You are asked to help with war efforts by collecting supplies and working in factories.",
            choices: [
                { text: "Participate in war support activities", consequence: "Many youths contributed to war efforts through civilian support roles, believing they were helping their country." },
                { text: "Find ways to avoid participation", consequence: "Avoiding participation was dangerous and could lead to punishment or accusations of disloyalty." },
                { text: "Help but question the ideology", consequence: "Some maintained internal resistance while outwardly complying, though this was psychologically difficult." }
            ]
        },
        {
            situation: "It's 1945. As Germany faces defeat, older teens are being sent to combat roles.",
            choices: [
                { text: "Follow orders to fight", consequence: "Many teens were sent to the front lines. Thousands died in the final months of the war in what were essentially suicide missions." },
                { text: "Attempt to desert", consequence: "Desertion was extremely dangerous and often resulted in execution. However, some youths did attempt to flee." },
                { text: "Surrender to Allied forces", consequence: "Some surrendered when possible. After the war, former Hitler Youth members underwent denazification programs." }
            ]
        }
    ];

    let currentScenario = 0;

    function renderScenario() {
        const scenario = scenarios[currentScenario];
        const gameHTML = `
            <div class="scenario-content">
                <div class="scenario-header">
                    <h3>Historical Scenario ${currentScenario + 1} of ${scenarios.length}</h3>
                    <div class="scenario-disclaimer">This simulation helps understand the difficult choices faced by youths during this period.</div>
                </div>
                <div class="scenario-situation">
                    <p>${scenario.situation}</p>
                </div>
                <div class="scenario-choices">
                    ${scenario.choices.map((choice, index) => `
                        <button class="scenario-choice-btn" data-choice="${index}">
                            ${choice.text}
                        </button>
                    `).join('')}
                </div>
                <div class="scenario-result" style="display: none;">
                    <h4>Historical Context:</h4>
                    <p class="scenario-consequence"></p>
                    <div class="scenario-nav">
                        ${currentScenario < scenarios.length - 1 
                            ? '<button class="scenario-next-btn">Next Scenario →</button>'
                            : '<button class="scenario-restart-btn">Restart Simulation</button>'}
                    </div>
                </div>
            </div>
        `;
        gameContainer.innerHTML = gameHTML;

        // Add event listeners
        const choiceButtons = gameContainer.querySelectorAll('.scenario-choice-btn');
        const resultDiv = gameContainer.querySelector('.scenario-result');
        const consequenceP = gameContainer.querySelector('.scenario-consequence');
        
        choiceButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const choiceIndex = parseInt(btn.dataset.choice);
                const choice = scenario.choices[choiceIndex];
                
                // Hide choices, show result
                gameContainer.querySelector('.scenario-choices').style.display = 'none';
                resultDiv.style.display = 'block';
                consequenceP.textContent = choice.consequence;
            });
        });

        const nextBtn = gameContainer.querySelector('.scenario-next-btn');
        const restartBtn = gameContainer.querySelector('.scenario-restart-btn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentScenario++;
                renderScenario();
            });
        }
        
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                currentScenario = 0;
                renderScenario();
            });
        }
    }

    renderScenario();
}

// ===== IMAGE LIGHTBOX =====
function initImageLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const zoomInBtn = lightbox.querySelector('.lightbox-zoom-in');
    const zoomOutBtn = lightbox.querySelector('.lightbox-zoom-out');
    const zoomResetBtn = lightbox.querySelector('.lightbox-zoom-reset');

    let currentImageIndex = 0;
    let images = [];
    let zoomLevel = 1;

    // Gather all images from image-container
    function gatherImages() {
        const imageContainers = document.querySelectorAll('.image-container');
        images = Array.from(imageContainers).map(container => {
            const img = container.querySelector('img');
            const caption = container.querySelector('figcaption');
            return {
                src: img.src,
                alt: img.alt,
                caption: caption ? caption.textContent : ''
            };
        });
    }

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxContent();
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            zoomLevel = 1;
            lightboxImg.style.transform = 'scale(1)';
            lightboxImg.classList.remove('zoomed');
        }, 300);
    }

    // Update content
    function updateLightboxContent() {
        const image = images[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightboxCaption.textContent = image.caption;
        
        // Show/hide navigation buttons
        prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';
        
        // Reset zoom
        zoomLevel = 1;
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.classList.remove('zoomed');
    }

    // Navigate
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxContent();
        }
    }

    function showNextImage() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateLightboxContent();
        }
    }

    // Zoom functions
    function zoomIn() {
        zoomLevel = Math.min(zoomLevel + 0.25, 3);
        lightboxImg.style.transform = `scale(${zoomLevel})`;
        lightboxImg.classList.add('zoomed');
    }

    function zoomOut() {
        zoomLevel = Math.max(zoomLevel - 0.25, 1);
        lightboxImg.style.transform = `scale(${zoomLevel})`;
        if (zoomLevel === 1) {
            lightboxImg.classList.remove('zoomed');
        }
    }

    function resetZoom() {
        zoomLevel = 1;
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.classList.remove('zoomed');
    }

    // Event listeners
    gatherImages();

    // Make images clickable
    document.querySelectorAll('.image-container').forEach((container, index) => {
        const img = container.querySelector('img');
        img.addEventListener('click', () => openLightbox(index));
    });

    // Click on image to toggle zoom
    lightboxImg.addEventListener('click', () => {
        if (zoomLevel === 1) {
            zoomIn();
        } else {
            resetZoom();
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    zoomResetBtn.addEventListener('click', resetZoom);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'none') return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case '+':
            case '=':
                zoomIn();
                break;
            case '-':
            case '_':
                zoomOut();
                break;
            case '0':
                resetZoom();
                break;
        }
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ===== ANIMATED STATISTICS =====
function initAnimatedStats() {
    const statsContainer = document.getElementById('membership-stats');
    if (!statsContainer) return;

    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function formatNumber(num, target) {
        // For millions (5.4M, 7.2M), show decimal
        if (target >= 1000000) {
            return (num / 1000000).toFixed(1);
        }
        // For thousands, add commas
        return num.toLocaleString();
    }

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = formatNumber(Math.floor(current), target);
        }, 16);
    }

    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(statsContainer);
}

// ===== IMAGE CAROUSEL =====
function initImageCarousel() {
    const carousel = document.getElementById('activities-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let autoPlayInterval = null;
    const autoPlayDelay = 5000; // 5 seconds

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Wrap around
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay(); // Restart after manual navigation
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay(); // Restart after manual navigation
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay(); // Restart after manual navigation
        });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only handle if carousel is in view
        const rect = carousel.getBoundingClientRect();
        const inView = rect.bottom > 0 && rect.top < window.innerHeight;
        
        if (!inView) return;

        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // Start auto-play
    startAutoPlay();
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initTimeline();
    initHoverFacts();
    initFlipCards();
    initInteractiveMap();
    initScenarioGame();
    initImageLightbox();
    initAnimatedStats();
    initImageCarousel();
});
