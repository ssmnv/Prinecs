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
    
    // Добавляем обработчики для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Нажата кнопка фильтра:', this.getAttribute('data-filter'));
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Получаем выбранную категорию
            const filterValue = this.getAttribute('data-filter');
            
            // Применяем фильтрацию
            filterServices(filterValue, serviceCards, servicesGrid, resultsCount);
        });
    });
    
    console.log('Фильтрация инициализирована успешно');
}

// Функция фильтрации услуг
function filterServices(filterValue, serviceCards, servicesGrid, resultsCount) {
    console.log('Фильтрация по категории:', filterValue);
    
    let visibleCount = 0;
    
    // Сначала скрываем все карточки
    serviceCards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    // Показываем соответствующие карточки
    setTimeout(() => {
        serviceCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category');
            
            // Проверяем, соответствует ли карточка фильтру
            if (filterValue === 'all' || (cardCategories && cardCategories.includes(filterValue))) {
                card.style.display = 'block';
                
                // Анимация появления с задержкой
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'all 0.5s ease';
                }, 100 * visibleCount);
                
                visibleCount++;
            }
        });
        
        // Обновляем счетчик результатов
        if (resultsCount) {
            resultsCount.innerHTML = `Найдено: <span>${visibleCount}</span> ${getServiceWord(visibleCount)}`;
        }
        
        // Если нет результатов, показываем сообщение
        showNoResultsMessage(visibleCount, servicesGrid);
        
        // Анимация для всей сетки
        if (servicesGrid) {
            servicesGrid.style.animation = 'none';
            setTimeout(() => {
                servicesGrid.style.animation = 'fadeInGrid 0.8s ease forwards';
            }, 50);
        }
        
        console.log('Отфильтровано карточек:', visibleCount);
    }, 50);
}

// Функция для правильного склонения слова "услуга"
function getServiceWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return 'услуга';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return 'услуги';
    } else {
        return 'услуг';
    }
}

// Функция для показа сообщения "Нет результатов"
function showNoResultsMessage(visibleCount, servicesGrid) {
    // Удаляем предыдущее сообщение, если оно есть
    const existingMessage = servicesGrid.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Если нет видимых карточек, добавляем сообщение
    if (visibleCount === 0 && servicesGrid) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>Услуги не найдены</h3>
            <p>Попробуйте выбрать другую категорию или <a href="#" data-page="contacts">свяжитесь с нами</a> для индивидуального заказа</p>
        `;
        servicesGrid.appendChild(noResultsDiv);
        
        // Добавляем обработчик для ссылки "свяжитесь с нами"
        const contactLink = noResultsDiv.querySelector('a[data-page="contacts"]');
        if (contactLink) {
            contactLink.addEventListener('click', function(e) {
                e.preventDefault();
                loadPage('contacts');
            });
        }
    }
}

// Функция для инициализации формы контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    console.log('Инициализация формы контактов...');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Простая валидация
        if (!name || !phone || !message) {
            alert('Пожалуйста, заполните обязательные поля: Имя, Телефон и Сообщение');
            return;
        }
        
        // Валидация телефона (простая)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }
        
        // Валидация email (если указан)
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }
        }
        
        // Показываем индикатор загрузки
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        // Имитация отправки на сервер
        setTimeout(() => {
            // В реальном проекте здесь будет отправка на сервер
            console.log('Данные формы:', { name, phone, email, message });
            
            // Показываем сообщение об успехе
            alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время по телефону ${phone}.`);
            
            // Восстанавливаем кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Очищаем форму
            contactForm.reset();
        }, 1500);
    });
}

// Экспортируем функцию loadPage для использования в других скриптах
window.loadPage = loadPage;