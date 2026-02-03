
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .logo, .btn[data-page], .footer-links a[data-page]');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');
    
    let currentPage = 'home';
    
    function switchPage(pageId) {
        currentPage = pageId;

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        loadPageContent(pageId);

        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
        }

        history.pushState({ page: pageId }, '', `#${pageId}`);

        window.scrollTo(0, 0);
    }
    
    window.loadPage = function(pageId) {
        switchPage(pageId);
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
            }
        });
    });
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            switchPage(event.state.page);
        } else {
            switchPage('home');
        }
    });
    
    window.addEventListener('DOMContentLoaded', function() {
        const hash = window.location.hash.substring(1);
        if (hash && ['home', 'about', 'services', 'portfolio', 'contacts'].includes(hash)) {
            switchPage(hash);
        } else {
            history.replaceState({ page: 'home' }, '', '#home');
        }
    });
    
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinksContainer.contains(event.target) || mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
    });
});