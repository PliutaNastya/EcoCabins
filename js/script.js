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



window.addEventListener('scroll', function () {
	const header = document.querySelector('.header'); // Замените '.header' на ваш селектор шапки
	if (window.scrollY > 0) {
		header.classList.add('scrolled'); // Добавляем класс, когда прокрутка начинается
	} else {
		header.classList.remove('scrolled'); // Убираем класс, если прокрутка на нуле
	}
});




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


document.addEventListener("DOMContentLoaded", function () {
	const slider = document.querySelector('.materials__slider');
	const slides = slider.querySelector('.slider__slides');
	const dots = slider.querySelectorAll('.dots__dot');
	const slideCount = slides.children.length;
	let currentSlide = 0;
	let interval;
	let touchStartX = 0;
	let touchEndX = 0;

	// Функция для обновления активного слайда и точек
	function updateSlider() {
		slides.style.transform = `translateX(-${currentSlide * 100}%)`;

		dots.forEach(dot => dot.classList.remove('active'));
		if (dots[currentSlide]) {
			dots[currentSlide].classList.add('active');
		}
	}

	// Функция для переключения слайда
	function nextSlide() {
		currentSlide = (currentSlide + 1) % slideCount;
		updateSlider();
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + slideCount) % slideCount;
		updateSlider();
	}

	// Автопрокрутка слайдов
	function startAutoplay() {
		interval = setInterval(nextSlide, 3000); // 3 секунды
	}

	// Остановка автопрокрутки
	function stopAutoplay() {
		clearInterval(interval);
	}

	// Переключение слайда по точке
	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			currentSlide = parseInt(dot.getAttribute('data-index'));
			updateSlider();
		});
	});

	// Обработчик событий для свайпа
	slider.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	slider.addEventListener('touchmove', (e) => {
		touchEndX = e.changedTouches[0].screenX;
	});

	slider.addEventListener('touchend', () => {
		const swipeThreshold = 50; // Порог для распознавания свайпа
		if (touchStartX - touchEndX > swipeThreshold) {
			nextSlide(); // Свайп влево
		} else if (touchEndX - touchStartX > swipeThreshold) {
			prevSlide(); // Свайп вправо
		}
	});

	// Инициализация слайдера
	updateSlider();
	startAutoplay();

	// Запуск автопрокрутки на фокус
	slider.addEventListener('mouseenter', stopAutoplay);
	slider.addEventListener('mouseleave', startAutoplay);
});