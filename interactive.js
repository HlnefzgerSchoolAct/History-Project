// Interactive Features for Hitler Youth History Project

// ===== INTERACTIVE TIMELINE =====
function initTimeline() {
    const timelineContainer = document.getElementById('interactive-timeline');
    if (!timelineContainer) return;

    const timelineEvents = [
        { year: 1926, title: 'Formation', description: 'Groups came together called Hitler Youth' },
        { year: 1933, title: 'Nazi Power', description: 'After Nazis took power, independent youth groups were closed, such as boy scouts' },
        { year: 1936, title: 'Standardization', description: 'Laws made the organisation more official and standardized.' },
        { year: 1939, title: 'Mandatory Membership', description: 'Membership became mandatory for ages 10-18.' },
        { year: 1944, title: 'War Participation', description: 'Used more of the older teens in fighting roles for the war' },
        { year: 1945, title: 'Dissolution', description: 'After Germany lost the war, Hitler Youth was banned.' }
    ];

    let currentEvent = 0;

    const timelineHTML = `
        <div class="timeline-wrapper">
            <div class="timeline-line"></div>
            <div class="timeline-events">
                ${timelineEvents.map((event, index) => `
                    <div class="timeline-event ${index === 0 ? 'active' : ''}" data-index="${index}">
                        <div class="timeline-dot"></div>
                        <div class="timeline-year">${event.year}</div>
                    </div>
                `).join('')}
            </div>
            <div class="timeline-content">
                <h3 class="timeline-title">${timelineEvents[0].title}</h3>
                <p class="timeline-description">${timelineEvents[0].description}</p>
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
            situation: "It's 1938. You are 14 years old and your friends have joined the Hitler Youth. They pressure you to join.",
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

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initHoverFacts();
    initFlipCards();
    initInteractiveMap();
    initScenarioGame();
});
