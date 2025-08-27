document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let images = [];
    let currentSlide = 0;
    let slideInterval;

    // Load images from the img directory
    async function loadImages() {
        try {
            // Try to load a predefined list of common image extensions
            const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
            const imagePromises = [];
            
            // Try to load images with common naming patterns
            for (let i = 1; i <= 20; i++) {
                for (const ext of extensions) {
                    imagePromises.push(checkImageExists(`img/${i}.${ext}`));
                    imagePromises.push(checkImageExists(`img/image${i}.${ext}`));
                    imagePromises.push(checkImageExists(`img/cabana${i}.${ext}`));
                }
            }
            
            // Also try some common names
            const commonNames = ['exterior', 'interior', 'piscina', 'bucatarie', 'dormitor', 'living', 'gratar', 'iarna', 'vara', 'mansarda'];
            for (const name of commonNames) {
                for (const ext of extensions) {
                    imagePromises.push(checkImageExists(`img/${name}.${ext}`));
                }
            }
            
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
                        <h2>Cabana Valea Muntelui</h2>
                        <p style="font-size: 1.2rem; margin-top: 20px; opacity: 0.9;">Adăugați imagini în directorul /img pentru a le vedea aici</p>
                    </div>
                </div>
            </div>
        `;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
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

    // Initialize
    loadImages();
});