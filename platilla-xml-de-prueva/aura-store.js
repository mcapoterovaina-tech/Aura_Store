
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSearch();
    
    // Detect if we are on a Single Post (Detail View) or Home (Grid View)
    const detailContext = document.querySelector('.app-detail-context');
    if (detailContext) {
        hydrateAppDetail(detailContext);
    } else {
        hydrateAppCards();
    }
});

// --- 1. THEME LOGIC (Dark/Light Mode) ---
function initTheme() {
    const html = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const yearSpan = document.getElementById('year');

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Check Storage or System Preference
    const isDark = localStorage.getItem('aura-theme') === 'dark' || 
                   (!('aura-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
        html.classList.add('dark');
        if(sunIcon) sunIcon.classList.remove('hidden');
        if(moonIcon) moonIcon.classList.add('hidden');
    } else {
        html.classList.remove('dark');
        if(sunIcon) sunIcon.classList.add('hidden');
        if(moonIcon) moonIcon.classList.remove('hidden');
    }

    // Toggle Click Event
    if (toggle) {
        toggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const current = html.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('aura-theme', current);
            
            if (current === 'dark') {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        });
    }
}

// --- 2. SEARCH LOGIC ---
function initSearch() {
    window.toggleSearch = function() {
        const overlay = document.getElementById('search-overlay');
        if (!overlay) return;
        
        if(overlay.classList.contains('hidden')) {
            overlay.classList.remove('hidden');
            const input = overlay.querySelector('input');
            if(input) setTimeout(() => input.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

// --- 3. GRID VIEW LOGIC (Home/Category Pages) ---
function hydrateAppCards() {
    const cards = document.querySelectorAll('.app-card');
    cards.forEach(card => {
        const metaContainer = card.querySelector('.hidden-meta');
        if (!metaContainer) return;

        // Extract info from Labels
        const labels = Array.from(metaContainer.querySelectorAll('.meta-label')).map(l => l.textContent.trim());
        let price = 'GET';
        let rating = '4.5';
        let category = 'App';

        labels.forEach(label => {
            const lower = label.toLowerCase();
            if (lower.startsWith('price:')) {
                const val = label.split(':')[1];
                price = (val === '0' || val.toLowerCase() === 'free') ? 'GET' : '$' + val;
            } else if (lower.startsWith('rating:')) {
                rating = label.split(':')[1];
            } else if (!lower.includes(':') && label !== 'Notice') {
                category = label;
            }
        });

        // Update Card UI
        const priceBtn = card.querySelector('.app-price-btn');
        const ratingEl = card.querySelector('.app-rating');
        const catEl = card.querySelector('.app-category');

        if (priceBtn) priceBtn.textContent = price;
        if (ratingEl) ratingEl.textContent = rating;
        if (catEl) catEl.textContent = category;
    });
}

// --- 4. DETAIL VIEW LOGIC (Single Post Page) ---
function hydrateAppDetail(context) {
    const rawPayload = document.getElementById('raw-post-payload');
    
    // UI Elements to Populate
    const els = {
        icon: document.getElementById('app-icon'),
        desc: document.getElementById('app-description'),
        dev: document.querySelector('.app-dev'),
        size: document.querySelector('.app-size'),
        compat: document.querySelector('.app-compat'),
        carousel: document.getElementById('screenshots-container'),
        downloadBtn: document.getElementById('main-download-btn'),
        previewSec: document.getElementById('preview-section'),
        tagline: document.getElementById('app-tagline'),
        category: document.querySelector('.app-category-detail'),
        age: document.querySelector('.app-age')
    };

    // A. Parse Metadata from Labels (Price, Category, Tagline)
    const metaContainer = context.querySelector('.hidden-meta');
    if (metaContainer) {
        const labels = Array.from(metaContainer.querySelectorAll('.meta-label')).map(l => l.textContent.trim());
        let price = 'GET';
        let category = 'App';
        let tagline = '';

        labels.forEach(label => {
            const lower = label.toLowerCase();
            if (lower.startsWith('price:')) {
                const val = label.split(':')[1];
                price = (val === '0' || val.toLowerCase() === 'free') ? 'GET' : '$' + val;
            } else if (lower.startsWith('tagline:')) {
                tagline = label.split(':')[1];
            } else if (!lower.includes(':') && label !== 'Notice') {
                category = label;
            }
        });

        // Update UI Metadata
        if(els.downloadBtn) els.downloadBtn.textContent = price;
        if(els.tagline && tagline) els.tagline.textContent = tagline;
        if(els.category) els.category.textContent = category;
    }

    // B. Parse HTML Content from Raw Payload (Your Specific Structure)
    if (rawPayload) {
        
        // --- 1. Extract Images (Icon & Carousel) ---
        const images = rawPayload.querySelectorAll('img');
        
        if (images.length > 0) {
            // Set Icon (First Image found in post)
            if (els.icon) els.icon.src = images[0].src;

            // Populate Carousel (All Images)
            images.forEach(img => {
                const imgClone = document.createElement('img');
                imgClone.src = img.src;
                imgClone.className = "h-[300px] md:h-[450px] rounded-[1.75rem] shadow-soft snap-center border border-gray-100 dark:border-white/10 object-cover shrink-0 select-none bg-gray-100 dark:bg-white/5";
                if(els.carousel) els.carousel.appendChild(imgClone);
            });
            if (els.previewSec) els.previewSec.classList.remove('hidden');
        }

        // --- 2. Extract Description (.tm-single-desc__wrap) ---
        const sourceDesc = rawPayload.querySelector('.tm-single-desc__wrap');
        if (sourceDesc && els.desc) {
            // Copy HTML
            els.desc.innerHTML = sourceDesc.innerHTML;
            
            // CLEANUP: Remove inline styles (background-color: white) to fix Dark Mode
            const allElements = els.desc.querySelectorAll('*');
            allElements.forEach(el => {
                el.removeAttribute('style'); // Removes white background, fixed colors, etc.
                el.classList.add('mb-4', 'leading-relaxed', 'text-slate-600', 'dark:text-slate-300');
            });
        } else {
            // Fallback if class not found, take all text
             if(els.desc) els.desc.innerHTML = rawPayload.innerHTML;
        }

        // --- 3. Extract Information (.info-section) ---
        const sourceInfo = rawPayload.querySelector('.info-section');
        if (sourceInfo) {
            const listItems = sourceInfo.querySelectorAll('li');
            listItems.forEach(li => {
                const text = li.textContent || li.innerText;
                const lowerText = text.toLowerCase();
                // Safe split
                const parts = text.split(':');
                const val = parts.length > 1 ? parts[1].trim() : '';
                
                if (lowerText.includes('developer:') && els.dev) els.dev.textContent = val;
                if (lowerText.includes('size:') && els.size) els.size.textContent = val;
                if (lowerText.includes('compatibility:') && els.compat) els.compat.textContent = val;
            });
        }

        // --- 4. Extract Download Link (a.item-download) ---
        const sourceDownload = rawPayload.querySelector('a.item-download');
        if (sourceDownload && els.downloadBtn) {
            // Clone the href to the main button
            els.downloadBtn.onclick = function(e) {
                e.preventDefault();
                window.open(sourceDownload.href, '_blank');
            };
        } else if (els.downloadBtn) {
            // Fallback: Scroll to description if no link found
            els.downloadBtn.onclick = function() {
                els.desc.scrollIntoView({behavior: 'smooth'});
            };
        }
    }
}
