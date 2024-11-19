// Burger menu
function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (e.target.closest('.icon-menu')) {
				document.documentElement.classList.toggle("menu-open");
			}
			if (e.target.closest('.menu') && document.documentElement.classList.contains("menu-open")) {
				document.documentElement.classList.remove("menu-open");
			}
		});
	}
}
menuInit();


// Header scroll
window.addEventListener('scroll', function () {
	const header = document.querySelector('.header'); 
	if (window.scrollY > 0) {
		header.classList.add('scrolled'); 
	} else {
		header.classList.remove('scrolled');
	}
});



// Video play
function playVideo() {
	const video = document.getElementById("video");
	video.play();
	document.querySelector(".hero__play-button").style.display = "none";
	document.querySelector(".hero__pause-button").style.display = "flex";
}

function pauseVideo() {
	const video = document.getElementById("video");
	video.pause();
	document.querySelector(".hero__play-button").style.display = "flex";
	document.querySelector(".hero__pause-button").style.display = "none";
}

// Добавляем обработчики событий на кнопки
document.querySelector(".hero__play-button").addEventListener("click", playVideo);
document.querySelector(".hero__pause-button").addEventListener("click", pauseVideo);


// Slider
document.addEventListener("DOMContentLoaded", function () {
	const slider = document.querySelector('.materials__slider');
	const slides = slider.querySelector('.slider__slides');
	const dots = slider.querySelectorAll('.dots__dot');
	const slideCount = slides.children.length;
	let currentSlide = 0;
	let interval;
	let touchStartX = 0;
	let touchEndX = 0;

	function updateSlider() {
		slides.style.transform = `translateX(-${currentSlide * 100}%)`;

		dots.forEach(dot => dot.classList.remove('active'));
		if (dots[currentSlide]) {
			dots[currentSlide].classList.add('active');
		}
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % slideCount;
		updateSlider();
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + slideCount) % slideCount;
		updateSlider();
	}

	function startAutoplay() {
		interval = setInterval(nextSlide, 5000);
	}

	function stopAutoplay() {
		clearInterval(interval);
	}

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			currentSlide = parseInt(dot.getAttribute('data-index'));
			updateSlider();
		});
	});

	slider.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	slider.addEventListener('touchmove', (e) => {
		touchEndX = e.changedTouches[0].screenX;
	});

	slider.addEventListener('touchend', () => {
		const swipeThreshold = 50; 
		if (touchStartX - touchEndX > swipeThreshold) {
			nextSlide(); 
		} else if (touchEndX - touchStartX > swipeThreshold) {
			prevSlide(); 
		}
	});

	updateSlider();
	startAutoplay();

	slider.addEventListener('mouseenter', stopAutoplay);
	slider.addEventListener('mouseleave', startAutoplay);
});