// 1. Плавний скролінг та активне меню
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Знімаємо 'active' з усіх і встановлюємо на поточний
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav a');

// Функція для оновлення активного пункту меню при скролі
const updateActiveNav = () => {
    let current = '';
    sections.forEach(section => {
        // Використовуємо 50% висоти вікна для точнішого визначення, де зараз користувач
        const sectionTop = section.offsetTop - window.innerHeight / 2; 
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);
// Викликаємо один раз при завантаженні для коректного старту
window.addEventListener('load', updateActiveNav); 


// 2. AJAX Відправка Форми, Сповіщення та Очищення Полів
const form = document.getElementById('booking-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Зупиняємо стандартне перенаправлення Formspree
    const formData = new FormData(form);

    try {
        // Відправляємо дані на Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' 
            }
        });

        if (response.ok) {
            // 1. Показати повідомлення про успіх
            successMessage.classList.add('visible');
            
            // 2. Очистити поля форми
            form.reset();

            // 3. Сховати повідомлення через 4 секунди
            setTimeout(() => {
                successMessage.classList.remove('visible');
            }, 4000);

        } else {
            alert("На жаль, виникла помилка при відправці. Перевірте введені дані.");
        }

    } catch (error) {
        console.error('Помилка відправки форми:', error);
        alert("Помилка сервера. Спробуйте пізніше або зв'яжіться з нами напряму.");
    }
});