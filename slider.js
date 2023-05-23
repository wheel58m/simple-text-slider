// Store Key Elements in Memory
const slider = document.querySelector('.text-slider');
const slides = Array.prototype.slice.call(document.getElementsByClassName('slide'));
const slideCount = slides.length;
const nextBtn = document.querySelector('.next-control');
const prevBtn = document.querySelector('.previous-control');

// Set Initial Variable Values
let currentIndex = 0;
let autoplay = true;
let slideInterval = null;

// Check If Slider Has More Than One Slide
if (slideCount > 1) {
    // Function to Show Current Slide ---------------------------//
    function showSlide() {
        slides.forEach(slide => slide.classList.remove('active', 'next', 'previous')); // Reset Slides (Classes)
        slides[currentIndex].classList.add('active'); // Set Current Slide as Active

        // Set Next & Previous Slides Classes
        const nextIndex = (currentIndex + 1) % slideCount;
        const previousIndex = (currentIndex - 1 + slideCount) % slideCount;

        slides[nextIndex].classList.add('next');
        slides[previousIndex].classList.add('previous');
    }

    // Function to Change Slide ---------------------------------//
    function changeSlide(index) {
        currentIndex = (currentIndex + index + slideCount) % slideCount;
        showSlide();
        slideInterval = resetInterval(slideInterval); // Resest Timer When Slide Changes
    }

    // Event Listeners for Previous & Next Buttons --------------//
    nextBtn.addEventListener('click', () => changeSlide(1));
    prevBtn.addEventListener('click', () => changeSlide(-1));

    // Reset Interval Function ----------------------------------//
    function resetInterval(slideInterval) {
        clearInterval(slideInterval);
        if (autoplay) {
            return setInterval(() => changeSlide(1), 5000);
        } else {
            return null;
        }
    }

    // Initialize Slider ----------------------------------------//
    // Set the Initial Slide Interval (If Autoplay Is Enabled)
    if (autoplay) {
        slideInterval = resetInterval(slideInterval);
    }
    showSlide();

} else {
    // Hide Controls
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
}

// Set Slider Height --------------------------------------------//
// If you prefer a fixed height slider, remove this code block and adjust the height of .text-slider in your CSS file.

setSliderHeight(); // Initially Set Slider Height

function setSliderHeight() {
    let maxHeight = 0;

    slides.forEach(slide => {
        const slideHeight = slide.offsetHeight + getVerticalMargin(slide);
        if (slideHeight > maxHeight) {
            maxHeight = slideHeight;
        }
    });

    slider.style.height = `${maxHeight}px`;
}

function getVerticalMargin(element) {
    const style = window.getComputedStyle(element);
    const marginTop = parseInt(style.marginTop);
    const marginBottom = parseInt(style.marginBottom);
    return marginTop + marginBottom;
}

// Update Slider Height When Window Is Resized
window.addEventListener('resize', setSliderHeight);