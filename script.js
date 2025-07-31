$(document).ready(function() {
    // Initialize portfolio functionality
    initializePortfolio();
    
    function initializePortfolio() {
        // Animate skill bars on page load
        animateSkillBars();
        
        // Setup headshot upload functionality
        setupHeadshotUpload();
        
        // Setup project interactions
        setupProjectInteractions();
        
        // Setup smooth scrolling (if navigation is added later)
        setupSmoothScrolling();
        
        // Add scroll animations
        setupScrollAnimations();
    }
    
    // Animate skill bars with actual percentages
    function animateSkillBars() {
        setTimeout(function() {
            $('.skill-bar').each(function() {
                const level = $(this).data('level');
                $(this).css('width', level + '%');
            });
        }, 500);
    }
    
    // Setup headshot upload functionality
    function setupHeadshotUpload() {
        $('#headshotUpload').click(function() {
            // Create a hidden file input
            const fileInput = $('<input type="file" accept="image/*" style="display: none;">');
            
            fileInput.on('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const imgUrl = e.target.result;
                        $('#headshot').attr('src', imgUrl).show();
                        $('#headshotUpload').hide();
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            fileInput.click();
        });
        
        // If headshot image exists, show it and hide upload text
        $('#headshot').on('load', function() {
            if (this.complete && this.naturalHeight !== 0) {
                $(this).show();
                $('#headshotUpload').hide();
            }
        });
        
        // Handle missing headshot image
        $('#headshot').on('error', function() {
            $(this).hide();
            $('#headshotUpload').show();
        });
        
        // Check if image is already loaded (for cached images)
        if ($('#headshot')[0].complete) {
            if ($('#headshot')[0].naturalHeight !== 0) {
                $('#headshot').show();
                $('#headshotUpload').hide();
            } else {
                $('#headshot').hide();
                $('#headshotUpload').show();
            }
        }
    }
    
    // Setup project interactions
    function setupProjectInteractions() {
        $('.project-card').hover(
            function() {
                $(this).find('.tech-tag').each(function(index) {
                    $(this).delay(index * 50).animate({
                        opacity: 0.8
                    }, 200);
                });
            },
            function() {
                $(this).find('.tech-tag').stop().animate({
                    opacity: 1
                }, 200);
            }
        );
        
        // Click to expand project details (placeholder functionality)
        $('.project-card').click(function() {
            const projectName = $(this).data('project');
            const card = $(this);
            
            // Toggle expanded state
            if (card.hasClass('expanded')) {
                card.removeClass('expanded');
                card.find('.project-details').slideUp(300, function() {
                    $(this).remove();
                });
            } else {
                // Remove any other expanded cards
                $('.project-card.expanded').each(function() {
                    $(this).removeClass('expanded');
                    $(this).find('.project-details').slideUp(300, function() {
                        $(this).remove();
                    });
                });
                
                // Add expanded content
                card.addClass('expanded');
                const details = getProjectDetails(projectName);
                const detailsHtml = $('<div class="project-details" style="display: none;">' + details + '</div>');
                card.append(detailsHtml);
                detailsHtml.slideDown(300);
            }
        });
    }
    
    // Get detailed project information
    function getProjectDetails(projectName) {
        const details = {
            'p2p-chat': `
                <div class="project-expanded">
                    <h4>Technical Details</h4>
                    <ul>
                        <li>Implemented WebRTC for direct peer connections</li>
                        <li>Built signaling server with Node.js and Socket.io</li>
                        <li>Added end-to-end encryption for secure messaging</li>
                        <li>Supports file sharing up to 100MB</li>
                    </ul>
                    <div class="project-links">
                        <a href="#" class="project-link">View Demo</a>
                        <a href="#" class="project-link">Source Code</a>
                    </div>
                </div>
            `,
            'sql-filesystem': `
                <div class="project-expanded">
                    <h4>Technical Details</h4>
                    <ul>
                        <li>PostgreSQL database with optimized file metadata storage</li>
                        <li>RESTful API built with FastAPI framework</li>
                        <li>Role-based access control and permission system</li>
                        <li>File versioning with delta compression</li>
                    </ul>
                    <div class="project-links">
                        <a href="#" class="project-link">View Demo</a>
                        <a href="#" class="project-link">Documentation</a>
                    </div>
                </div>
            `,
            'ai-content': `
                <div class="project-expanded">
                    <h4>Technical Details</h4>
                    <ul>
                        <li>Integration with OpenAI GPT models</li>
                        <li>Custom training on business-specific content</li>
                        <li>SEO optimization and keyword analysis</li>
                        <li>Automated content scheduling and publishing</li>
                    </ul>
                    <div class="project-links">
                        <a href="#" class="project-link">Case Study</a>
                        <a href="#" class="project-link">Contact</a>
                    </div>
                </div>
            `
        };
        
        return details[projectName] || '<p>More details coming soon...</p>';
    }
    
    // Setup smooth scrolling for navigation
    function setupSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $($(this).attr('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 20
                }, 800);
            }
        });
    }
    
    // Setup scroll animations
    function setupScrollAnimations() {
        $(window).scroll(function() {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            // Animate elements when they come into view
            $('.project-card, .skill-category').each(function() {
                const elementTop = $(this).offset().top;
                if (scrollTop + windowHeight > elementTop + 100) {
                    $(this).addClass('in-view');
                }
            });
        });
    }
    
    // Add some interactive effects
    function addInteractiveEffects() {
        // Typing effect for the name (optional enhancement)
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.html('');
            
            function type() {
                if (i < text.length) {
                    element.html(element.html() + text.charAt(i));
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }
        
        // Uncomment to enable typing effect
        // typeWriter($('.personal-statement h1'), 'Ved J', 150);
    }
    
    // Skills filter functionality (enhancement)
    function setupSkillsFilter() {
        // Add filter buttons if needed
        const filterButtons = `
            <div class="skills-filter">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="programming">Programming</button>
                <button class="filter-btn" data-filter="ml">ML/Data</button>
                <button class="filter-btn" data-filter="tools">Tools</button>
            </div>
        `;
        
        // This can be uncommented and positioned as needed
        // $('.skills-section h2').after(filterButtons);
        
        $('.filter-btn').on('click', function() {
            const filter = $(this).data('filter');
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            
            if (filter === 'all') {
                $('.skill-category').show();
            } else {
                $('.skill-category').hide();
                $(`.skill-category[data-category="${filter}"]`).show();
            }
        });
    }
    
    // Contact form handling (if contact section is added)
    function setupContactForm() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.text();
            
            submitBtn.text('Sending...').prop('disabled', true);
            
            setTimeout(function() {
                submitBtn.text('Message Sent!').css('background', '#28a745');
                setTimeout(function() {
                    submitBtn.text(originalText).css('background', '').prop('disabled', false);
                    $('#contactForm')[0].reset();
                }, 2000);
            }, 1000);
        });
    }
    
    // Initialize additional features
    addInteractiveEffects();
    
    // Console message for developers
    console.log('%c🚀 Portfolio loaded successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS, and jQuery', 'color: #764ba2; font-size: 12px;');
});
