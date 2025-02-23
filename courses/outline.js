// outline.js

///////////////////////////////////////////
// 1) LOADING / DISPLAYING SUB-CHAPTER CONTENT
///////////////////////////////////////////
function loadSubChapterContent(key) {
    const container = document.getElementById('outlineContentPlaceholder');
    if (!container) return;

    // subChapterData is assumed to be defined globally in each page
    const data = subChapterData[key];
    if (data) {
        container.innerHTML = `
        <h2>${data.title}</h2>
        ${data.text}
      `;
        attachTermClickHandlers();
        setActiveSubChapter(key); // highlight the clicked link
    } else {
        container.innerHTML = `<p>No content found for this sub-chapter.</p>`;
    }
}

function setActiveSubChapter(key) {
    // Remove 'active' from all sub-chapter links
    document.querySelectorAll('.accordion-body a').forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' to the clicked link
    const activeLink = document.querySelector(`.accordion-body a[data-key="${key}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

///////////////////////////////////////////
// 2) TERM CLICK HANDLERS / GLOSSARY
///////////////////////////////////////////
function attachTermClickHandlers() {
    const terms = document.querySelectorAll('.term');
    terms.forEach(term => {
        term.addEventListener('click', () => {
            const glossaryKey = term.getAttribute('data-term');
            displayTermInfo(glossaryKey);
        });
    });
}

// Expects "glossary" to be defined globally in each page
function displayTermInfo(key) {
    const infoContainer = document.getElementById('infoContent');
    if (!infoContainer || typeof glossary === 'undefined') return;

    const entry = glossary[key];
    if (entry) {
        let html = `<h6>${entry.heading}</h6><p>${entry.content}</p>`;
        if (entry.image && entry.image.trim() !== "") {
            html += `
          <div class="image-container">
            <img src="${entry.image}" 
                 alt="${entry.heading}" 
                 class="img-fluid mt-2" />
          </div>
        `;
        }
        infoContainer.innerHTML = html;
    } else {
        infoContainer.innerHTML = `<p class="text-muted">No info available for this term.</p>`;
    }
}

///////////////////////////////////////////
// 3) SIDEBAR TOGGLE (SHOW / HIDE)
///////////////////////////////////////////
function toggleLeftSidebar() {
    const sidebar = document.getElementById('leftSidebar');
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    if (!sidebar || !toggleBtn) return;

    sidebar.classList.toggle('collapsed');

    // Update button icon / text
    const isCollapsed = sidebar.classList.contains('collapsed');
    toggleBtn.innerHTML = isCollapsed
        ? '<i class="fas fa-eye-slash me-1"></i>'
        : '<i class="fas fa-eye me-1"></i>';
}

///////////////////////////////////////////
// 4) INITIALIZATION ON DOM LOAD
///////////////////////////////////////////
// We'll do two separate DOMContentLoaded handlers

// 4a) Auto-collapse left sidebar if on mobile
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 768) {
        const sidebar = document.getElementById('leftSidebar');
        const toggleBtn = document.getElementById('toggleSidebarBtn');
        if (sidebar) sidebar.classList.add('collapsed');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-bars me-1"></i>';
        }
    }

    // For each sub-chapter link, load content
    document.querySelectorAll('.accordion-body a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const key = link.getAttribute('data-key');
            loadSubChapterContent(key);
        });
    });
});

///////////////////////////////////////////
// 5) RIGHT SIDEBAR RESIZING
///////////////////////////////////////////
let isResizingRight = false;
let startXRight = 0;
let startWidthRight = 0;

const rightSidebar = document.getElementById('rightSidebar');
const rightResizeHandle = document.getElementById('rightResizeHandle');

if (rightSidebar && rightResizeHandle) {
    rightResizeHandle.addEventListener('mousedown', e => {
        isResizingRight = true;
        startXRight = e.clientX;
        startWidthRight = parseInt(window.getComputedStyle(rightSidebar).width, 10);
        document.addEventListener('mousemove', onMouseMoveRight);
        document.addEventListener('mouseup', onMouseUpRight);
        e.preventDefault();
    });
}

function onMouseMoveRight(e) {
    if (!isResizingRight) return;
    const dx = e.clientX - startXRight;
    let newWidth = startWidthRight - dx;
    newWidth = Math.max(180, Math.min(window.innerWidth * 0.5, newWidth));
    rightSidebar.style.width = newWidth + 'px';
}

function onMouseUpRight() {
    isResizingRight = false;
    document.removeEventListener('mousemove', onMouseMoveRight);
    document.removeEventListener('mouseup', onMouseUpRight);
}

///////////////////////////////////////////
// 6) LEFT SIDEBAR RESIZING
///////////////////////////////////////////
let isResizingLeft = false;
let startXLeft = 0;
let startWidthLeft = 0;

const leftSidebar = document.getElementById('leftSidebar');
const leftResizeHandle = document.getElementById('leftResizeHandle');

if (leftSidebar && leftResizeHandle) {
    leftResizeHandle.addEventListener('mousedown', e => {
        isResizingLeft = true;
        startXLeft = e.clientX;
        startWidthLeft = parseInt(window.getComputedStyle(leftSidebar).width, 10);
        document.addEventListener('mousemove', onMouseMoveLeft);
        document.addEventListener('mouseup', onMouseUpLeft);
        e.preventDefault();
    });
}

function onMouseMoveLeft(e) {
    if (!isResizingLeft) return;
    const dx = e.clientX - startXLeft;
    let newWidth = startWidthLeft + dx;
    newWidth = Math.max(180, Math.min(window.innerWidth * 0.5, newWidth));
    leftSidebar.style.width = newWidth + 'px';
}

function onMouseUpLeft() {
    isResizingLeft = false;
    document.removeEventListener('mousemove', onMouseMoveLeft);
    document.removeEventListener('mouseup', onMouseUpLeft);
}

///////////////////////////////////////////
// 7) LIGHT / DARK MODE
///////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');

    // Check if there's a saved theme preference in localStorage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
});

// Tooltips
document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
