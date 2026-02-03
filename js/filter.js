// Логика фильтрации услуг
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация фильтрации при загрузке страницы услуг
    initServiceFilter();
});

// Функция инициализации фильтрации
function initServiceFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesGrid = document.getElementById('servicesGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!filterButtons.length || !serviceCards.length) return;
    
    // Добавляем обработчики для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Получаем выбранную категорию
            const filterValue = this.getAttribute('data-filter');
            
            // Применяем фильтрацию
            filterServices(filterValue, serviceCards, servicesGrid, resultsCount);
        });
    });
}

// Функция фильтрации услуг
function filterServices(filterValue, serviceCards, servicesGrid, resultsCount) {
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
            if (filterValue === 'all' || cardCategories.includes(filterValue)) {
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
                if (typeof window.loadPage === 'function') {
                    window.loadPage('contacts');
                }
            });
        }
    }
}

// Функция для инициализации фильтрации при динамической загрузке страницы
function initServiceFilterOnPageLoad() {
    // Ждем немного, чтобы DOM полностью обновился
    setTimeout(() => {
        initServiceFilter();
    }, 100);
}

// Экспортируем функцию для использования в основном скрипте
window.initServiceFilterOnPageLoad = initServiceFilterOnPageLoad;