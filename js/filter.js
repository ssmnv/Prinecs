function initServiceFilter() {
    console.log('Инициализация фильтрации услуг...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesGrid = document.getElementById('servicesGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    console.log('Найдено кнопок фильтрации:', filterButtons.length);
    console.log('Найдено карточек услуг:', serviceCards.length);
    
    if (!filterButtons.length || !serviceCards.length) {
        console.error('Элементы фильтрации не найдены!');
        return;
    }
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Нажата кнопка фильтра:', this.getAttribute('data-filter'));
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            filterServices(filterValue, serviceCards, servicesGrid, resultsCount);
        });
    });
    
    console.log('Фильтрация инициализирована успешно');
}

function filterServices(filterValue, serviceCards, servicesGrid, resultsCount) {
    console.log('Фильтрация по категории:', filterValue);
    
    let visibleCount = 0;
    serviceCards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    setTimeout(() => {
        serviceCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category');
            if (filterValue === 'all' || (cardCategories && cardCategories.includes(filterValue))) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'all 0.5s ease';
                }, 100 * visibleCount);
                
                visibleCount++;
            }
        });
        if (resultsCount) {
            resultsCount.innerHTML = `Найдено: <span>${visibleCount}</span> ${getServiceWord(visibleCount)}`;
        }
        showNoResultsMessage(visibleCount, servicesGrid);
        
        if (servicesGrid) {
            servicesGrid.style.animation = 'none';
            setTimeout(() => {
                servicesGrid.style.animation = 'fadeInGrid 0.8s ease forwards';
            }, 50);
        }
        
        console.log('Отфильтровано карточек:', visibleCount);
    }, 50);
}
function getServiceWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return 'услуга';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return 'услуги';
    } else {
        return 'услуг';
    }
}
function showNoResultsMessage(visibleCount, servicesGrid) {
    const existingMessage = servicesGrid.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }
    if (visibleCount === 0 && servicesGrid) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>Услуги не найдены</h3>
            <p>Попробуйте выбрать другую категорию или <a href="#" data-page="contacts">свяжитесь с нами</a> для индивидуального заказа</p>
        `;
        servicesGrid.appendChild(noResultsDiv);
        const contactLink = noResultsDiv.querySelector('a[data-page="contacts"]');
        if (contactLink) {
            contactLink.addEventListener('click', function(e) {
                e.preventDefault();
                loadPage('contacts');
            });
        }
    }
}
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    console.log('Инициализация формы контактов...');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !phone || !message) {
            alert('Пожалуйста, заполните обязательные поля: Имя, Телефон и Сообщение');
            return;
        }
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }
        }
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        setTimeout(() => {
            console.log('Данные формы:', { name, phone, email, message });
            alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время по телефону ${phone}.`);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 1500);
    });
}
window.loadPage = loadPage;