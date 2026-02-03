
document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('submit', function(e) {
        if (e.target.id === 'contactForm') {
            e.preventDefault();
            handleContactForm(e.target);
        }
    });
    

    document.addEventListener('input', function(e) {

        if (e.target.matches('#contactForm input, #contactForm textarea')) {
            validateField(e.target);
        }
    });
});


async function handleContactForm(form) {
    // Получаем данные из формы
    const phone = document.getElementById('phone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    
    // Простая валидация
    if (!phone || !message) {
        alert('Заполните телефон и сообщение');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    try {
        // Отправляем данные на сервер
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                email: email,
                message: message
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Показываем уведомление об успехе
            showNotification('success', 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            form.reset();
            
            // Убираем классы валидации
            form.querySelectorAll('.valid, .invalid').forEach(field => {
                field.classList.remove('valid', 'invalid');
            });
        } else {
            // Показываем ошибку
            showNotification('error', result.error || 'Ошибка при отправке');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        showNotification('error', 'Ошибка соединения с сервером');
    } finally {
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('invalid', 'valid');
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Введите корректный email адрес';
        }
    } else if (field.id === 'phone' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Введите корректный номер телефона';
        }
    }
    if (!isValid && errorMessage) {
        field.classList.add('invalid');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        field.parentElement.appendChild(errorElement);
    } else if (value) {
        field.classList.add('valid');
    }
    
    return isValid;
}
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    });
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}