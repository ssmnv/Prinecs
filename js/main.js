
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт типографии "Принтекс" загружен');
    
    loadPage('home');
    
    initAnimations();
});

function initAnimations() {

    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeIn 0.8s ease forwards';
            }
        });
    }
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
}

function loadPageContent(pageId) {
    const pageContent = document.getElementById('page-content');
    
    pageContent.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        fetchPage(pageId)
            .then(html => {
                pageContent.innerHTML = html;
                initAnimations();
            })
            .catch(error => {
                console.error('Ошибка загрузки страницы:', error);
                pageContent.innerHTML = '<div class="container"><h2>Ошибка загрузки страницы</h2><p>Пожалуйста, попробуйте позже.</p></div>';
            });
    }, 300);
}


function fetchPage(pageId) {

    return new Promise((resolve) => {
        const pages = {
            'home': `
                <section class="hero">
                    <div class="container">
                        <h1 class="fade-in">Типография "Printecs" в Йошкар-Оле</h1>
                        <p class="fade-in">Полный спектр полиграфических услуг: от визиток до объемных изданий. Качественная печать, оперативное исполнение и индивидуальный подход к каждому клиенту.</p>
                        <a href="#" class="btn fade-in" data-page="services">Наши услуги</a>
                    </div>
                </section>

                <section class="services-preview">
                    <div class="container">
                        <h2>Наши услуги</h2>
                        <p class="text-center">Мы предлагаем широкий спектр полиграфических услуг для бизнеса и частных клиентов.</p>
                        
                        <div class="services-grid">
                            <div class="service-card fade-in">
                                <div class="service-img">
                                    <img src="vizitki.jpg" alt="Печать визиток">
                                </div>
                                <div class="service-content">
                                    <h3>Визитки и бейджи</h3>
                                    <p>Изготовление визиток, бейджей, пропусков и другой представительской продукции.</p>
                                </div>
                            </div>
                            
                            <div class="service-card fade-in">
                                <div class="service-img">
                                    <img src="banner.jpgы" alt="Широкоформатная печать">
                                </div>
                                <div class="service-content">
                                    <h3>Широкоформатная печать</h3>
                                    <p>Печать баннеров, плакатов, постеров, стендов и другой рекламной продукции.</p>
                                </div>
                            </div>
                            
                            <div class="service-card fade-in">
                                <div class="service-img">
                                    <img src="jurnali.jpg" alt="Печать каталогов">
                                </div>
                                <div class="service-content">
                                    <h3>Каталоги и брошюры</h3>
                                    <p>Создание каталогов, брошюр, журналов и другой многостраничной продукции.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-center" style="margin-top: 40px;">
                            <a href="#" class="btn btn-secondary" data-page="services">Все услуги</a>
                        </div>
                    </div>
                </section>

                <section class="about-preview">
                    <div class="container about-container">
                        <div class="about-img fade-in">
                            <img src="prr.jpg" alt="О компании Printecs">
                        </div>
                        <div class="about-content fade-in">
                            <h2>О компании "Printecs"</h2>
                            <p>Мы работаем на рынке полиграфических услуг Йошкар-Олы более 10 лет. За это время мы зарекомендовали себя как надежный партнер, который всегда выполняет обязательства в срок и с высоким качеством.</p>
                            <p>Наше современное оборудование позволяет выполнять заказы любой сложности: от простой черно-белой печати до полноцветных изданий с послепечатной обработкой.</p>
                            <p>Мы ценим каждого клиента и готовы предложить индивидуальный подход к реализации ваших проектов.</p>
                            <a href="#" class="btn" data-page="about">Подробнее о нас</a>
                        </div>
                    </div>
                </section>
            `,
            'about': `
                <div class="page-header">
                    <div class="container">
                        <h1>О компании</h1>
                        <div class="breadcrumb">
                            <a href="#" data-page="home">Главная</a>
                            <span class="separator">/</span>
                            <span>О компании</span>
                        </div>
                    </div>
                </div>
                
                <div class="page-content">
                    <div class="container">
                        <div class="about-container">
                            <div class="about-img">
                                <img src="print.jpg" alt="О компании Printecs">
                            </div>
                            <div class="about-content">
                                <h2>Наша история</h2>
                                <p>Типография "Принтекс" начала свою деятельность в 2010 году в Йошкар-Оле. Начиналась наша компания с небольшого цеха, оснащенного базовым полиграфическим оборудованием. С самого начала мы сделали ставку на качество и индивидуальный подход к каждому клиенту.</p>
                                <p>Благодаря этому подходу нам удалось быстро завоевать доверие клиентов и расширить производство. Сегодня мы обладаем современным парком оборудования, которое позволяет выполнять заказы любой сложности в кратчайшие сроки.</p>
                                
                                <h3 style="margin-top: 30px;">Наши преимущества</h3>
                                <ul style="list-style-type: disc; padding-left: 20px; margin-top: 15px;">
                                    <li style="margin-bottom: 10px;">Современное оборудование европейского производства</li>
                                    <li style="margin-bottom: 10px;">Опытная команда профессионалов</li>
                                    <li style="margin-bottom: 10px;">Широкий спектр услуг "под ключ"</li>
                                    <li style="margin-bottom: 10px;">Индивидуальный подход к каждому клиенту</li>
                                    <li style="margin-bottom: 10px;">Конкурентные цены при высоком качестве</li>
                                    <li>Соблюдение сроков выполнения заказов</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style="margin-top: 60px;">
                            <h2 class="text-center">Наша команда</h2>
                            <p class="text-center" style="max-width: 800px; margin: 0 auto 40px;">Над вашими проектами работают опытные специалисты с многолетним стажем в полиграфии. Мы постоянно повышаем квалификацию и следим за новейшими тенденциями в отрасли.</p>
                            
                            <div class="services-grid">
                                <div class="service-card">
                                    <div class="service-img">
                                        <img src="diz.jpg" alt="Дизайнер">
                                    </div>
                                    <div class="service-content">
                                        <h3>Отдел дизайна</h3>
                                        <p>Наши дизайнеры помогут создать макет, который будет эффективно решать ваши задачи и привлекать внимание целевой аудитории.</p>
                                    </div>
                                </div>
                                
                                <div class="service-card">
                                    <div class="service-img">
                                        <img src="cex.jpg" alt="Печатник">
                                    </div>
                                    <div class="service-content">
                                        <h3>Печатный цех</h3>
                                        <p>Опытные печатники работают на современном оборудовании, обеспечивая высокое качество печати и цветопередачи.</p>
                                    </div>
                                </div>
                                
                                <div class="service-card">
                                    <div class="service-img">
                                        <img src="pocle.jpg" alt="Послепечатная обработка">
                                    </div>
                                    <div class="service-content">
                                        <h3>Послепечатная обработка</h3>
                                        <p>Специалисты по послепечатной обработке выполняют ламинацию, брошюровку, фальцовку и другие виды отделки.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            

'services': `
    <div class="page-header">
        <div class="container">
            <h1>Наши услуги</h1>
            <div class="breadcrumb">
                <a href="#" data-page="home">Главная</a>
                <span class="separator">/</span>
                <span>Услуги</span>
            </div>
        </div>
    </div>
    
    <div class="page-content">
        <div class="container">
            <h2 class="text-center">Полиграфические услуги в Йошкар-Оле</h2>
            <p class="text-center" style="max-width: 800px; margin: 0 auto 40px;">Мы предлагаем полный цикл полиграфических услуг от создания дизайна до послепечатной обработки. Работаем как с крупными тиражами, так и с единичными экземплярами.</p>
            
            <!-- Фильтры по категориям -->
            <div class="filter-buttons" id="serviceFilters">
                <button class="filter-btn active" data-filter="all">Все услуги</button>
                <button class="filter-btn" data-filter="business">Для бизнеса</button>
                <button class="filter-btn" data-filter="advertising">Реклама</button>
                <button class="filter-btn" data-filter="design">Дизайн</button>
                <button class="filter-btn" data-filter="postpress">Постпечать</button>
                <button class="filter-btn" data-filter="souvenir">Сувениры</button>
            </div>
            
            <div class="results-count" id="resultsCount">Найдено: <span>6</span> услуг</div>
            
            <div class="services-list">
                <div class="services-grid" id="servicesGrid">
                    <!-- Карточки услуг с атрибутами data-category -->
                    <div class="service-card" data-category="business design">
                        <div class="service-img">
                            <img src="vizitki.jpg" alt="Печать визиток">
                        </div>
                        <div class="service-content">
                            <h3>Визитки и бейджи</h3>
                            <p>Изготовление визиток, бейджей, пропусков и другой представительской продукции. Используем различные материалы и виды отделки.</p>
                            <ul class="service-features">
                                <li>Визитки стандартные и нестандартные</li>
                                <li>Бейджи для сотрудников</li>
                                <li>Пропуска и удостоверения</li>
                                <li>Карты лояльности</li>
                            </ul>
                            <div class="service-tags">
                                <span class="service-tag business">Для бизнеса</span>
                                <span class="service-tag design">Дизайн</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-card" data-category="advertising">
                        <div class="service-img">
                            <img src="banner.jpg" alt="Широкоформатная печать">
                        </div>
                        <div class="service-content">
                            <h3>Широкоформатная печать</h3>
                            <p>Печать баннеров, плакатов, постеров, стендов и другой рекламной продукции большого формата.</p>
                            <ul class="service-features">
                                <li>Баннеры</li>
                                <li>Плакаты и постеры</li>
                                <li>Стенды</li>
                                <li>Печать на самоклеющейся пленке</li>
                            </ul>
                            <div class="service-tags">
                                <span class="service-tag advertising">Реклама</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-card" data-category="business">
                        <div class="service-img">
                            <img src="jurnali.jpg" alt="Печать каталогов">
                        </div>
                        <div class="service-content">
                            <h3>Каталоги и брошюры</h3>
                            <p>Создание каталогов, брошюр, журналов и другой многостраничной продукции с различными видами переплета.</p>
                            <ul class="service-features">
                                <li>Каталоги продукции</li>
                                <li>Брошюры и буклеты</li>
                                <li>Журналы и газеты</li>
                                <li>Годовые отчеты</li>
                            </ul>
                            <div class="service-tags">
                                <span class="service-tag business">Для бизнеса</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-card" data-category="souvenir business">
                        <div class="service-img">
                            <img src="bloknot.jpg" alt="Сувенирная продукция">
                        </div>
                        <div class="service-content">
                            <h3>Сувенирная продукция</h3>
                            <p>Изготовление сувенирной продукции с нанесением логотипов и другой информации.</p>
                            <ul class="service-features">
                                <li>Календари различных форматов</li>
                                <li>Блокноты и ежедневники</li>
                                <li>Пакеты и сумки</li>
                                <li>Ручки с логотипом</li>
                            </ul>
                            <div class="service-tags">
                                <span class="service-tag souvenir">Сувениры</span>
                                <span class="service-tag business">Для бизнеса</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-card" data-category="design">
                        <div class="service-img">
                            <img src="verstca.jpg" alt="Дизайн и верстка">
                        </div>
                        <div class="service-content">
                            <h3>Дизайн и верстка</h3>
                            <p>Профессиональная разработка дизайна и верстка полиграфической продукции любой сложности.</p>
                            <ul class="service-features">
                                <li>Разработка фирменного стиля</li>
                                <li>Дизайн полиграфической продукции</li>
                                <li>Верстка многостраничных изданий</li>
                                <li>Подготовка макетов к печати</li>
                            </ul>
                            <div class="service-tags">
                                <span class="service-tag design">Дизайн</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="service-card" data-category="postpress">
                        <div class="service-img">
                            <img src="pocle.jpg" alt="Послепечатная обработка">
                        </div>
                        <div class="service-content">
                            <h3>Послепечатная обработка</h3>
                            <p>Полный спектр услуг по послепечатной обработке для придания продукции завершенного вида.</p>
                            <ul class="service-features">
                                <li>Ламинация и лакирование</li>
                                <li>Вырубка и биговка</li>
                                <li>Фальцовка и брошюровка</li>
                                <li>Тиснение и конгрев</li>
                            </ul>
                            <div class="service-tags">
                                <span class="service-tag postpress">Постпечать</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`,
            'portfolio': `
                <div class="page-header">
                    <div class="container">
                        <h1>Портфолио</h1>
                        <div class="breadcrumb">
                            <a href="#" data-page="home">Главная</a>
                            <span class="separator">/</span>
                            <span>Портфолио</span>
                        </div>
                    </div>
                </div>
                
                <div class="page-content">
                    <div class="container">
                        <h2 class="text-center">Наши работы</h2>
                        <p class="text-center" style="max-width: 800px; margin: 0 auto 40px;">За годы работы мы выполнили сотни заказов для компаний Йошкар-Олы и Марий Эл. Вот некоторые из наших работ.</p>
                        
                        <div class="portfolio-list">
                            <div class="portfolio-grid">
                                <div class="portfolio-card">
                                    <div class="portfolio-img">
                                        <img src="korpvizit.jpg" alt="Корпоративные визитки">
                                    </div>
                                    <div class="portfolio-content">
                                        <h3>Корпоративные визитки</h3>
                                    </div>
                                </div>
                                
                                <div class="portfolio-card">
                                    <div class="portfolio-img">
                                        <img src="reklbanner.jpg" alt="Рекламный баннер">
                                    </div>
                                    <div class="portfolio-content">
                                        <h3>Рекламный баннер</h3>
                                    </div>
                                </div>
                                
                                <div class="portfolio-card">
                                    <div class="portfolio-img">
                                        <img src="katalog.jpg" alt="Каталог продукции">
                                    </div>
                                    <div class="portfolio-content">
                                        <h3>Каталог продукции</h3>
                                    </div>
                                </div>
                                
                                <div class="portfolio-card">
                                    <div class="portfolio-img">
                                        <img src="kalendari.jpg" alt="Фирменные календари">
                                    </div>
                                    <div class="portfolio-content">
                                        <h3>Фирменные календари</h3>
                                    </div>
                                </div>
                                
                                <div class="portfolio-card">
                                    <div class="portfolio-img">
                                        <img src="listovki.jpg" alt="Листовки и флаеры">
                                    </div>
                                    <div class="portfolio-content">
                                        <h3>Листовки и флаеры</h3>
                                    </div>
                                </div>
                                
                                <div class="portfolio-card">
                                    <div class="portfolio-img">
                                        <img src="ypokovki.jpg" alt="Упаковка и этикетки">
                                    </div>
                                    <div class="portfolio-content">
                                        <h3>Упаковка и этикетки</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,

            'contacts': `
                <div class="page-header">
                    <div class="container">
                        <h1>Контакты</h1>
                        <div class="breadcrumb">
                            <a href="#" data-page="home">Главная</a>
                            <span class="separator">/</span>
                            <span>Контакты</span>
                        </div>
                    </div>
                </div>
                
                <div class="page-content">
                    <div class="container">
                        <div class="contact-container">
                            <div class="contact-info">
                                <h2>Свяжитесь с нами</h2>
                                <p>Мы всегда рады помочь вам с выбором полиграфических услуг и ответить на все вопросы. Приезжайте к нам в офис в Йошкар-Оле или свяжитесь любым удобным способом.</p>
                                
                                <div class="contact-item">
                                    <div class="contact-icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <h3>Адрес</h3>
                                        <p>г. Йошкар-Ола, ул. Суворова, 15А</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <div class="contact-icon">
                                        <i class="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <h3>Телефоны</h3>
                                        <p>+7 (8362) 38-56-56</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <div class="contact-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>@printecs.com.</p>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <div class="contact-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div>
                                        <h3>Режим работы</h3>
                                        <p>Пн-Пт: 9:00 - 18:00</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="contact-form">
                                <h3>Отправить сообщение</h3>
                                <form id="contactForm">
                                    <div class="form-group">
                                        <label for="name">Ваше имя *</label>
                                        <input type="text" id="name" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="phone">Телефон *</label>
                                        <input type="tel" id="phone" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="message">Сообщение *</label>
                                        <textarea id="message" required></textarea>
                                    </div>
                                    
                                    <button type="submit" class="btn">Отправить сообщение</button>
                                </form>
                            </div>
                        </div>
                        
                       
                    </div>
                </div>
            `
        };
        
        resolve(pages[pageId] || pages['home']);
    });
}