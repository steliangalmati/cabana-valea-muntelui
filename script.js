document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Language data
    const translations = {
        en: {
            title: "Valea Muntelui Cabin - Băișoara",
            heroTitle: "Valea Muntelui Cabin",
            heroSubtitle: "Perfect relaxation in the heart of Băișoara mountains",
            reserveNow: "Reserve now",
            navHome: "Home",
            navAbout: "About us",
            navFacilities: "Facilities",
            navLocation: "Location",
            navContact: "Contact",
            aboutTitle: "About Valea Muntelui Cabin",
            aboutText1: "Valea Muntelui Cabin offers you an unforgettable experience in the heart of Băișoara mountains, located just 16 km from Băișoara ski slope and only 35 km from Cluj-Napoca. It's the perfect place for a relaxing vacation with family or friends, regardless of the season.",
            aboutText2: "With generous accommodation capacity and modern facilities, our cabin perfectly combines comfort with the rustic charm of the mountains.",
            feature1Title: "4 Bedrooms",
            feature1Desc: "Each with private bathroom",
            feature2Title: "Attic",
            feature2Desc: "With two extendable sofas",
            feature3Title: "Spacious Living Room",
            feature3Desc: "With table for 12 people",
            facilitiesTitle: "Facilities",
            facility1Title: "Complete Kitchen",
            facility1Desc: "Fully furnished kitchen with refrigerator, coffee machine, stove and dishwasher",
            facility2Title: "Heated Pool",
            facility2Desc: "Outdoor heated pool for relaxation in any season",
            facility3Title: "Barbecue Area",
            facility3Desc: "Barbecue area with outdoor stove, sink and dining area",
            facility4Title: "Free WiFi",
            facility4Desc: "High-speed wireless internet throughout the cabin (Starlink)",
            facility5Title: "Near Ski Slope",
            facility5Desc: "Just 16 km from Băișoara ski slope",
            facility6Title: "Large Capacity",
            facility6Desc: "Can comfortably accommodate up to 12 people",
            facility7Title: "Riverside Location",
            facility7Desc: "Direct access to Ierța river",
            locationTitle: "Location",
            locationSubtitle: "Băișoara 309D, Cluj",
            locationText: "Valea Muntelui Cabin is located in the immediate vicinity of Băișoara locality in Cluj county, in a dreamlike natural setting, just 16 km from the ski slope.",
            viewOnMaps: "View on Google Maps",
            contactTitle: "Contact",
            contactSubtitle: "Reservations & Information",
            contactHours: "Reservation hours: 08:00 - 22:00",
            contactCTATitle: "Ready to relax?",
            contactCTAText: "Contact us to make a reservation or for more information about our cabin.",
            callNow: "Call now",
            placeholderText: "Add images to the /img directory to see them here",
            altText: "Valea Muntelui Cabin - Image"
        },
        ro: {
            title: "Cabana Valea Muntelui - Băișoara",
            heroTitle: "Cabana Valea Muntelui",
            heroSubtitle: "Relaxare perfectă în inima munților din Băișoara",
            reserveNow: "Rezervă acum",
            navHome: "Acasă",
            navAbout: "Despre noi",
            navFacilities: "Facilități",
            navLocation: "Locația",
            navContact: "Contact",
            aboutTitle: "Despre Cabana Valea Muntelui",
            aboutText1: "Cabana Valea Muntelui vă oferă o experiență de neuitat în inima munților din Băișoara, situată la doar 16 km de pârtia de schi Băișoara si la doar 35 km de Cluj-Napoca. Este locul perfect pentru o vacanță relaxantă cu familia sau prietenii, indiferent de anotimp.",
            aboutText2: "Cu o capacitate de cazare generoasă și facilități moderne, cabana noastră combină perfect confortul cu farmecul rustic al muntelui.",
            feature1Title: "4 Dormitoare",
            feature1Desc: "Fiecare cu baie proprie",
            feature2Title: "Mansardă",
            feature2Desc: "Cu două canapele extensibile",
            feature3Title: "Living Spațios",
            feature3Desc: "Cu masă pentru 12 persoane",
            facilitiesTitle: "Facilități",
            facility1Title: "Bucătărie Completă",
            facility1Desc: "Bucătărie complet mobilată cu frigider, aparat de cafea, plită și mașină de spălat vase",
            facility2Title: "Piscină Încălzită",
            facility2Desc: "Piscină exterioară încălzită pentru relaxare în orice anotimp",
            facility3Title: "Loc de Grătar",
            facility3Desc: "Zonă de grătar cu plită exterioară, chiuvetă și loc de luat masa",
            facility4Title: "WiFi Gratuit",
            facility4Desc: "Internet wireless de înaltă viteză în toată cabana (Starlink)",
            facility5Title: "Aproape de Pârtie",
            facility5Desc: "La doar 16 km de pârtia de schi din Băișoara",
            facility6Title: "Capacitate Mare",
            facility6Desc: "Poate găzdui confortabil până la 12 persoane",
            facility7Title: "Pe malul raului",
            facility7Desc: "Acces direct la râul Ierța",
            locationTitle: "Locația",
            locationSubtitle: "Băișoara 309D, Cluj",
            locationText: "Cabana Valea Muntelui este situată în imediata proximitate a localități Băișoara din județul Cluj, într-un cadru natural de vis, la doar 16 km de pârtia de schi.",
            viewOnMaps: "Vezi pe Google Maps",
            contactTitle: "Contact",
            contactSubtitle: "Rezervări & Informații",
            contactHours: "Program rezervări: 08:00 - 22:00",
            contactCTATitle: "Gata să vă relaxați?",
            contactCTAText: "Contactați-ne pentru a face o rezervare sau pentru mai multe informații despre cabana noastră.",
            callNow: "Sună acum",
            placeholderText: "Adăugați imagini în directorul /img pentru a le vedea aici",
            altText: "Cabana Valea Muntelui - Imagine"
        }
    };
    
    // Current language (default: Romanian)
    let currentLanguage = localStorage.getItem('language') || 'ro';
    
    let images = [];
    let currentSlide = 0;
    let slideInterval;

    // Load images from the img directory
    async function loadImages() {
        try {
            // Define the specific renamed images
            const imageFiles = [
                'cabin_hero_01.png',
                'mountain_view_02.png',
                'interior_cozy_03.png',
                'outdoor_space_04.png',
                'winter_scene_05.png'
            ];
            
            const imagePromises = imageFiles.map(filename => 
                checkImageExists(`img/${filename}`)
            );
            
            const results = await Promise.allSettled(imagePromises);
            images = results
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value);
            
            if (images.length > 0) {
                createCarousel();
                startSlideshow();
            } else {
                // If no images found, create a placeholder
                createPlaceholder();
            }
        } catch (error) {
            console.log('Error loading images:', error);
            createPlaceholder();
        }
    }

    // Check if an image exists
    function checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(null);
            img.src = src;
        });
    }

    // Create carousel slides
    function createCarousel() {
        carousel.innerHTML = '';
        
        images.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            if (index === 0) slide.classList.add('active');
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Cabana Valea Muntelui - Imagine ${index + 1}`;
            
            slide.appendChild(img);
            carousel.appendChild(slide);
        });
        
        // Show/hide navigation buttons based on number of images
        if (images.length > 1) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    // Create placeholder when no images are found
    function createPlaceholder() {
        carousel.innerHTML = `
            <div class="carousel-slide active">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; text-align: center;">
                    <div>
                        <h2 data-translate="heroTitle">Cabana Valea Muntelui</h2>
                        <p style="font-size: 1.2rem; margin-top: 20px; opacity: 0.9;" data-translate="placeholderText">Adăugați imagini în directorul /img pentru a le vedea aici</p>
                    </div>
                </div>
            </div>
        `;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        updateLanguage(); // Apply current language to placeholder
    }
    
    // Language switching functions
    function switchLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        updateLanguage();
        updateLanguageToggle();
    }
    
    function updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLanguage] && translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });
        
        // Update document title
        document.title = translations[currentLanguage].title;
        
        // Update image alt texts
        const carouselImages = document.querySelectorAll('.carousel-slide img');
        carouselImages.forEach((img, index) => {
            img.alt = `${translations[currentLanguage].altText} ${index + 1}`;
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;
    }
    
    function updateLanguageToggle() {
        const toggle = document.querySelector('.language-toggle');
        if (toggle) {
            toggle.textContent = currentLanguage === 'ro' ? 'EN' : 'RO';
            toggle.setAttribute('data-lang', currentLanguage === 'ro' ? 'en' : 'ro');
        }
    }

    // Navigate to next slide
    function nextSlide() {
        if (images.length === 0) return;
        
        const slides = document.querySelectorAll('.carousel-slide');
        slides[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % images.length;
        slides[currentSlide].classList.add('active');
    }

    // Navigate to previous slide
    function prevSlide() {
        if (images.length === 0) return;
        
        const slides = document.querySelectorAll('.carousel-slide');
        slides[currentSlide].classList.remove('active');
        
        currentSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        slides[currentSlide].classList.add('active');
    }

    // Start automatic slideshow
    function startSlideshow() {
        if (images.length <= 1) return;
        
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        setTimeout(startSlideshow, 10000); // Restart after 10 seconds
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        setTimeout(startSlideshow, 10000); // Restart after 10 seconds
    });

    // Pause slideshow on hover
    carousel.addEventListener('mouseenter', stopSlideshow);
    carousel.addEventListener('mouseleave', () => {
        if (images.length > 1) startSlideshow();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize language system
    function initializeLanguage() {
        // Add language toggle event listener
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('language-toggle')) {
                const newLang = e.target.getAttribute('data-lang');
                switchLanguage(newLang);
            }
        });
        
        // Initialize language on page load
        updateLanguage();
        updateLanguageToggle();
    }
    
    // Mobile menu functionality
    function initializeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Toggle mobile menu
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close mobile menu on window resize (when switching to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Initialize
    loadImages();
    initializeLanguage();
    initializeMobileMenu();
});