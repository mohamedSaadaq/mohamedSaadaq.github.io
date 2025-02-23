/************************************************************
 * main.js
 ************************************************************/

/* GLOBALS / ARRAYS */
let currentCourses = [];
let isGridView = true;
let favorites = [];
let learning = [];
let calendarEvents = []; // { courseId, title, dueDate, img }
let notes = [];          // { noteId, title, body, created }
let courseStatusMap = {}; // { courseId: "Not Started" | "In Progress" | "Completed" }

//------------------------------
// 1) LocalStorage
//------------------------------
function loadLocalStorageData() {
    const favData = localStorage.getItem('favorites');
    const learnData = localStorage.getItem('learning');
    if (favData) favorites = JSON.parse(favData);
    if (learnData) learning = JSON.parse(learnData);
}

function saveLocalStorageData() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('learning', JSON.stringify(learning));
}

function loadStatusData() {
    const stored = localStorage.getItem('courseStatusMap');
    if (stored) courseStatusMap = JSON.parse(stored);
}
function saveStatusData() {
    localStorage.setItem('courseStatusMap', JSON.stringify(courseStatusMap));
}

function loadCalendarData() {
    const data = localStorage.getItem('calendarEvents');
    if (data) calendarEvents = JSON.parse(data);
}
function saveCalendarData() {
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
}

function loadNotesData() {
    const data = localStorage.getItem('notes');
    if (data) notes = JSON.parse(data);
}
function saveNotesData() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//------------------------------
// 2) On DOMContentLoaded
//------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle logic (for main site pages)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // On small screens => top bar approach
                sidebar.classList.toggle('collapsed');
            } else {
                // Large => 260px -> 80px
                sidebar.classList.toggle('collapsed');
                localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
                const icon = sidebarToggle.querySelector('i');
                icon.style.transform = sidebar.classList.contains('collapsed') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
        // Load initial collapse state
        const collapsedState = localStorage.getItem('sidebarCollapsed') === 'true';
        if (collapsedState && window.innerWidth > 768) {
            sidebar.classList.add('collapsed');
            sidebarToggle.querySelector('i').style.transform = 'rotate(180deg)';
        }
    }

    // Dark mode toggle (for main site pages)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark', themeToggle.checked);
        });
    }

    // Load all localStorage data
    loadLocalStorageData();
    loadStatusData();
    loadCalendarData();
    loadNotesData();

    // If we have a #homePage => init the catalog
    if (document.getElementById('homePage')) {
        initCatalog();
    }
});

//------------------------------
// 3) Page Display Toggles (Home, Favorites, etc.)
//------------------------------
function showHomePage() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('favoritesPage').style.display = 'none';
    document.getElementById('learningPage').style.display = 'none';
    document.getElementById('activityPage').style.display = 'none';
    document.getElementById('calendarPage').style.display = 'none';
    document.getElementById('notesPage').style.display = 'none';
}

function showFavoritesPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('favoritesPage').style.display = 'block';
    document.getElementById('learningPage').style.display = 'none';
    document.getElementById('activityPage').style.display = 'none';
    document.getElementById('calendarPage').style.display = 'none';
    document.getElementById('notesPage').style.display = 'none';
    fillFavoritesAsCards();
}

function showLearningPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('favoritesPage').style.display = 'none';
    document.getElementById('learningPage').style.display = 'block';
    document.getElementById('activityPage').style.display = 'none';
    document.getElementById('calendarPage').style.display = 'none';
    document.getElementById('notesPage').style.display = 'none';
    fillLearningAsCards();
}

function showActivityPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('favoritesPage').style.display = 'none';
    document.getElementById('learningPage').style.display = 'none';
    document.getElementById('activityPage').style.display = 'block';
    document.getElementById('calendarPage').style.display = 'none';
    document.getElementById('notesPage').style.display = 'none';
    fillActivityCourses();
}

function showCalendarPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('favoritesPage').style.display = 'none';
    document.getElementById('learningPage').style.display = 'none';
    document.getElementById('activityPage').style.display = 'none';
    document.getElementById('calendarPage').style.display = 'block';
    document.getElementById('notesPage').style.display = 'none';
    fillCalendarCards();
}

function showNotesPage() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('favoritesPage').style.display = 'none';
    document.getElementById('learningPage').style.display = 'none';
    document.getElementById('activityPage').style.display = 'none';
    document.getElementById('calendarPage').style.display = 'none';
    document.getElementById('notesPage').style.display = 'block';
    fillNotesCards();
}

//------------------------------
// 4) Catalog Initialization (Home Page)
//------------------------------
function initCatalog() {
    const courses = [
        {
            id: "networking",
            academy: "Hurbad Institute",
            courseType: "Self-paced",
            level: "CompTIA A+ Core 1",
            title: "CompTIA A+ Core 1 – 2.0 Networking",
            desc: "Dive into essential networking modules, from cable types to wireless and beyond.",
            img: "https://picsum.photos/600/300?random=1",
            outlineLink: "networking-outline.html"
        },
        {
            id: "hardware",
            academy: "Hurbad Institute",
            courseType: "Instructor-led",
            level: "CompTIA A+ Core 1",
            title: "CompTIA A+ Core 1 – 3.0 Hardware",
            desc: "Explore PC hardware modules, including cable connectors, CPU, memory, and more.",
            img: "https://picsum.photos/600/300?random=2",
            outlineLink: "hardware-outline.html"
        },
        {
            id: "core2-os",
            academy: "Hurbad Institute",
            courseType: "Self-paced",
            level: "CompTIA A+ Core 2",
            title: "CompTIA A+ Core 2 – 1.0 – Operating Systems",
            desc: "Windows, macOS, Linux: Installation, tools, and OS troubleshooting.",
            img: "https://picsum.photos/600/300?random=5",
            outlineLink: "core2-os.html"
        },
        {
            id: "core2-software",
            academy: "Hurbad Institute",
            courseType: "Instructor-led",
            level: "CompTIA A+ Core 2",
            title: "CompTIA A+ Core 2 – 3.0 – Software Troubleshooting",
            desc: "Diagnose and resolve software-related issues across multiple OS environments.",
            img: "https://picsum.photos/600/300?random=6",
            outlineLink: "core2-software.html"
        },
        {
            id: "core1-mobile",
            academy: "Hurbad Institute",
            courseType: "Self-paced",
            level: "CompTIA A+ Core 1",
            title: "CompTIA A+ Core 1 – 1.0 – Mobile Devices",
            desc: "Explore smartphones, tablets, and other mobile devices in the A+ Core 1 exam domain.",
            img: "https://picsum.photos/600/300?random=7",
            outlineLink: "core1-mobile.html"
        },
        {
            id: "core1-hardware-troubleshooting",
            academy: "Hurbad Institute",
            courseType: "Instructor-led",
            level: "CompTIA A+ Core 1",
            title: "CompTIA A+ Core 1 – 5.0 – Hardware and Network Troubleshooting",
            desc: "Learn how to troubleshoot hardware and network issues with practical scenarios.",
            img: "https://picsum.photos/600/300?random=8",
            outlineLink: "core1-hardware-troubleshooting.html"
        },
        {
            id: "core1-virtualization",
            academy: "Hurbad Institute",
            courseType: "Self-paced",
            level: "CompTIA A+ Core 1",
            title: "CompTIA A+ Core 1 – 4.0 – Virtualization and Cloud Computing",
            desc: "Understand virtualization concepts and cloud computing models.",
            img: "https://picsum.photos/600/300?random=9",
            outlineLink: "core1-virtualization.html"
        },
        {
            id: "core2-security",
            academy: "Hurbad Institute",
            courseType: "Instructor-led",
            level: "CompTIA A+ Core 2",
            title: "CompTIA A+ Core 2 – 2.0 – Security",
            desc: "Learn security fundamentals, threats, vulnerabilities, and best practices.",
            img: "https://picsum.photos/600/300?random=10",
            outlineLink: "core2-security.html"
        },
        {
            id: "ccst-networking",
            academy: "Hurbad Institute",
            courseType: "Self-paced",
            level: "CompTIA Network+",
            title: "Cisco Certified Support Technician (CCST) Networking",
            desc: "Get started with CCST Networking fundamentals and troubleshooting.",
            img: "https://picsum.photos/600/300?random=11",
            outlineLink: "ccst-networking.html"
        },
        {
            id: "network-essentials",
            academy: "other",
            courseType: "Instructor-led",
            level: "CompTIA Network+",
            title: "Guide to Network Essentials",
            desc: "Essential knowledge for setting up and securing small business networks.",
            img: "https://picsum.photos/600/300?random=12",
            outlineLink: "network-essentials.html"
        }
    ];
    currentCourses = [...courses];
    isGridView = true;

    loadLocalStorageData();
    loadStatusData();

    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    const academySelect = document.getElementById('academySelect');
    const typeSelect = document.getElementById('typeSelect');
    const gridIcon = document.getElementById('gridIcon');
    const listIcon = document.getElementById('listIcon');
    const courseTilesContainer = document.getElementById('courseTiles');

    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            clearSearch.classList.remove('d-none');
        } else {
            clearSearch.classList.add('d-none');
        }
        filterCourses();
    });
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        clearSearch.classList.add('d-none');
        filterCourses();
    });

    function displayCourses(list) {
        courseTilesContainer.innerHTML = '';
        if (isGridView) {
            courseTilesContainer.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4';
            list.forEach(course => createCourseCard(courseTilesContainer, course, true));
        } else {
            courseTilesContainer.className = 'row row-cols-1 g-4';
            list.forEach(course => createCourseCard(courseTilesContainer, course, false));
        }
    }

    function createCourseCard(container, course, isGrid) {
        const col = document.createElement('div');
        col.className = 'col';
        col.setAttribute('data-aos', 'fade-up');

        const card = document.createElement('div');
        card.className = isGrid ? 'card grid-card position-relative' : 'card list-card';

        if (!isGrid) {
            // List layout
            const row = document.createElement('div');
            row.className = 'row g-0';

            const colImg = document.createElement('div');
            colImg.className = 'col-md-3';
            const img = document.createElement('img');
            img.src = course.img;
            img.alt = 'Course Thumbnail';
            img.className = 'img-left w-100 h-100';
            colImg.appendChild(img);

            const colBody = document.createElement('div');
            colBody.className = 'col-md-9 d-flex align-items-center';

            const cardBody = buildCardBody(course);
            colBody.appendChild(cardBody);

            row.appendChild(colImg);
            row.appendChild(colBody);
            card.appendChild(row);
        } else {
            // Grid layout
            const img = document.createElement('img');
            img.src = course.img;
            img.alt = 'Course Thumbnail';
            img.className = 'card-img-top';

            const cardBody = buildCardBody(course);
            card.appendChild(img);
            card.appendChild(cardBody);
        }

        col.appendChild(card);
        container.appendChild(col);
    }

    function buildCardBody(course) {
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Badge
        const badge = document.createElement('span');
        if (course.level.indexOf("CompTIA A+ Core 1") === 0) {
            badge.className = 'badge badge-core1';
        } else if (course.level.indexOf("CompTIA A+ Core 2") === 0) {
            badge.className = 'badge badge-core2';
        } else if (course.level.indexOf("CompTIA Network+") === 0) {
            badge.className = 'badge badge-networkplus';
        } else {
            badge.className = 'badge';
        }
        badge.textContent = course.level;

        const title = document.createElement('h5');
        title.className = 'card-title mt-2';
        title.textContent = course.title;

        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = course.desc;

        // Outline link
        const outlineBtn = document.createElement('a');
        outlineBtn.className = 'btn btn-outline-light';
        outlineBtn.textContent = 'View Outline';
        outlineBtn.href = course.outlineLink;

        // Toggle Favorites
        const favBtn = document.createElement('button');
        favBtn.className = 'btn btn-sm btn-outline-light ms-2';
        favBtn.innerHTML = '<i class="fas fa-star"></i>';
        favBtn.title = 'Toggle Favorites';
        favBtn.addEventListener('click', () => {
            if (isInFavorites(course)) {
                favorites = favorites.filter(c => c.id !== course.id);
                showBootstrapToast(`"${course.title}" removed from Favorites!`, 'danger');
            } else {
                favorites.push(course);
                showBootstrapToast(`"${course.title}" added to Favorites!`, 'success');
            }
            saveLocalStorageData();
            updateFavIconColor(course, favBtn);
        });
        updateFavIconColor(course, favBtn);

        // Toggle My Learning
        const learnBtn = document.createElement('button');
        learnBtn.className = 'btn btn-sm btn-outline-light ms-2';
        learnBtn.innerHTML = '<i class="fas fa-book-open"></i>';
        learnBtn.title = 'Toggle My Learning';
        learnBtn.addEventListener('click', () => {
            if (isInLearning(course)) {
                learning = learning.filter(c => c.id !== course.id);
                showBootstrapToast(`"${course.title}" removed from My Learning!`, 'danger');
            } else {
                learning.push(course);
                showBootstrapToast(`"${course.title}" added to My Learning!`, 'success');
            }
            saveLocalStorageData();
            updateLearningIconColor(course, learnBtn);
        });
        updateLearningIconColor(course, learnBtn);

        // Calendar button
        const calendarBtn = document.createElement('button');
        calendarBtn.className = 'btn btn-sm btn-outline-light ms-2';
        calendarBtn.innerHTML = '<i class="fas fa-calendar-alt"></i>';
        calendarBtn.title = 'Add to Calendar';
        calendarBtn.addEventListener('click', () => {
            showCalendarModal(course);
        });
        if (calendarEvents.find(ev => ev.courseId === course.id)) {
            const calIcon = calendarBtn.querySelector('i');
            calIcon.style.color = 'orange';
        }

        cardBody.appendChild(badge);
        cardBody.appendChild(title);
        cardBody.appendChild(desc);
        cardBody.appendChild(outlineBtn);
        cardBody.appendChild(favBtn);
        cardBody.appendChild(learnBtn);
        cardBody.appendChild(calendarBtn);

        return cardBody;
    }

    function filterCourses() {
        const query = searchInput.value.toLowerCase();
        const selectedAcademy = academySelect.value;
        const selectedType = typeSelect.value;

        currentCourses = courses.filter(course => {
            const inTitle = course.title.toLowerCase().includes(query);
            const inDesc = course.desc.toLowerCase().includes(query);
            const matchesSearch = inTitle || inDesc;

            const matchesAcademy = (selectedAcademy === 'All') || (course.academy === selectedAcademy);

            let matchesType = false;
            if (selectedType === 'All') {
                matchesType = true;
            } else if (selectedType === 'Self-paced' || selectedType === 'Instructor-led') {
                matchesType = (course.courseType === selectedType);
            } else {
                matchesType = (course.level === selectedType);
            }
            return matchesSearch && matchesAcademy && matchesType;
        });
        displayCourses(currentCourses);
    }

    document.getElementById('searchInput').addEventListener('input', filterCourses);
    academySelect.addEventListener('change', filterCourses);
    typeSelect.addEventListener('change', filterCourses);
    gridIcon.addEventListener('click', () => {
        isGridView = true;
        displayCourses(currentCourses);
    });
    listIcon.addEventListener('click', () => {
        isGridView = false;
        displayCourses(currentCourses);
    });

    filterCourses();
}

//------------------------------
// 5) Outline Initialization
//------------------------------
function initOutline(subChapterData) {
    // We assume each outline page has #outlineContentPlaceholder
    const contentArea = document.getElementById('outlineContentPlaceholder');
    if (!contentArea) return;

    // Each link in .accordion-body => load content
    document.querySelectorAll('.accordion-body a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const key = link.getAttribute('data-key');
            if (subChapterData[key]) {
                contentArea.innerHTML = `
          <a href="index.html" class="btn btn-outline-light back-btn mb-3">
            <i class="fas fa-arrow-left"></i> Back to Catalog
          </a>
          <h2>${subChapterData[key].title}</h2>
          <p>${subChapterData[key].text}</p>
        `;
            } else {
                contentArea.innerHTML = `
          <a href="index.html" class="btn btn-outline-light back-btn mb-3">
            <i class="fas fa-arrow-left"></i> Back to Catalog
          </a>
          <p>No content found for this sub-chapter.</p>
        `;
            }
        });
    });
}

//------------------------------
// 6) Favorites & My Learning
//------------------------------
function isInFavorites(course) {
    return favorites.some(c => c.id === course.id);
}
function isInLearning(course) {
    return learning.some(c => c.id === course.id);
}
function updateFavIconColor(course, favBtn) {
    const icon = favBtn.querySelector('i');
    icon.style.color = isInFavorites(course) ? 'gold' : '';
}
function updateLearningIconColor(course, learnBtn) {
    const icon = learnBtn.querySelector('i');
    icon.style.color = isInLearning(course) ? '#FFA500' : '';
}

function fillFavoritesAsCards() {
    const container = document.getElementById('favoritesCards');
    if (!container) return;

    container.innerHTML = '';
    if (favorites.length === 0) {
        container.innerHTML = `<p class="text-muted">No favorites yet.</p>`;
        return;
    }

    favorites.forEach(course => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        col.setAttribute('data-aos', 'fade-up');

        const card = document.createElement('div');
        card.className = 'card grid-card position-relative';

        const img = document.createElement('img');
        img.src = course.img || 'https://picsum.photos/600/300';
        img.alt = 'Course Thumbnail';
        img.className = 'card-img-top';

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = course.title;

        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = course.desc;

        const outlineBtn = document.createElement('a');
        outlineBtn.href = course.outlineLink;
        outlineBtn.className = 'btn btn-outline-light me-2';
        outlineBtn.textContent = 'View Outline';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-outline-light';
        removeBtn.textContent = 'Remove';
        removeBtn.title = 'Remove from Favorites';
        removeBtn.addEventListener('click', () => {
            favorites = favorites.filter(c => c.id !== course.id);
            saveLocalStorageData();
            fillFavoritesAsCards();
        });

        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(outlineBtn);
        body.appendChild(removeBtn);

        card.appendChild(img);
        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}

function fillLearningAsCards() {
    const container = document.getElementById('learningCards');
    if (!container) return;

    container.innerHTML = '';
    if (learning.length === 0) {
        container.innerHTML = `<p class="text-muted">No courses in My Learning yet.</p>`;
        return;
    }

    learning.forEach(course => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        col.setAttribute('data-aos', 'fade-up');

        const card = document.createElement('div');
        card.className = 'card grid-card position-relative';

        const img = document.createElement('img');
        img.src = course.img || 'https://picsum.photos/600/300';
        img.alt = 'Course Thumbnail';
        img.className = 'card-img-top';

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = course.title;

        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = course.desc;

        const outlineBtn = document.createElement('a');
        outlineBtn.href = course.outlineLink;
        outlineBtn.className = 'btn btn-outline-light me-2';
        outlineBtn.textContent = 'View Outline';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-outline-light';
        removeBtn.textContent = 'Remove';
        removeBtn.title = 'Remove from My Learning';
        removeBtn.addEventListener('click', () => {
            learning = learning.filter(c => c.id !== course.id);
            saveLocalStorageData();
            fillLearningAsCards();
        });

        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(outlineBtn);
        body.appendChild(removeBtn);

        card.appendChild(img);
        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}

//------------------------------
// 7) Activity Page
//------------------------------
function fillActivityCourses() {
    const container = document.getElementById('activityCoursesContainer');
    if (!container) return;

    container.innerHTML = '';
    const allCourses = currentCourses;
    if (!allCourses || allCourses.length === 0) {
        container.innerHTML = `<p class="text-muted">No courses found.</p>`;
        return;
    }

    allCourses.forEach(course => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        col.setAttribute('data-aos', 'fade-up');

        const card = document.createElement('div');
        card.className = 'card grid-card position-relative';

        const img = document.createElement('img');
        img.src = course.img || 'https://picsum.photos/600/300';
        img.alt = 'Course Thumbnail';
        img.className = 'card-img-top';
        card.appendChild(img);

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = course.title;

        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = course.desc || '';

        const status = courseStatusMap[course.id] || 'Not Started';

        // A small <select> to pick status
        const select = document.createElement('select');
        select.className = 'form-select form-select-sm mt-2';
        const statuses = ['Not Started', 'In Progress', 'Completed'];
        statuses.forEach(st => {
            const opt = document.createElement('option');
            opt.value = st;
            opt.textContent = st;
            select.appendChild(opt);
        });
        select.value = status;
        select.addEventListener('change', () => {
            courseStatusMap[course.id] = select.value;
            saveStatusData();
            updateProgressBar(progressBar, select.value);
            fillActivityCourses(); // re-render
        });

        // Progress bar
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress mt-2';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        progressBarContainer.appendChild(progressBar);
        updateProgressBar(progressBar, status);

        const outlineBtn = document.createElement('a');
        outlineBtn.href = course.outlineLink;
        outlineBtn.className = 'btn btn-outline-light mt-2 me-2';
        outlineBtn.textContent = 'View Outline';

        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(select);
        body.appendChild(progressBarContainer);
        body.appendChild(outlineBtn);

        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}

function updateProgressBar(barElem, status) {
    let val = 0;
    if (status === 'In Progress') val = 50;
    if (status === 'Completed') val = 100;
    barElem.style.width = val + '%';
    barElem.textContent = val + '%';
    if (val === 100) {
        barElem.classList.add('bg-success');
    } else {
        barElem.classList.remove('bg-success');
    }
}

//------------------------------
// 8) Calendar Page
//------------------------------
function showCalendarModal(course) {
    window.currentCalendarCourse = course;
    // If using <input type="date">, just do:
    const calInput = document.getElementById('calendarModalInput');
    if (calInput) calInput.value = '';
    const calendarModal = new bootstrap.Modal(document.getElementById('calendarModal'));
    calendarModal.show();
}

function saveCalendarModalDate() {
    const calInput = document.getElementById('calendarModalInput');
    if (!calInput) return;

    // If it's type="date", it might produce "YYYY-MM-DD"
    const inputVal = calInput.value.trim();
    if (!inputVal) {
        alert('Please select a valid date.');
        return;
    }

    // Convert "YYYY-MM-DD" => "MM/DD/YYYY" if you want:
    const [yyyy, mm, dd] = inputVal.split('-');
    const finalDate = `${mm}/${dd}/${yyyy}`;

    const course = window.currentCalendarCourse;
    addCourseToCalendar(course, finalDate);

    const modalEl = document.getElementById('calendarModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    if (document.getElementById('calendarPage') && document.getElementById('calendarPage').style.display === 'block') {
        fillCalendarCards();
    }

    showBootstrapToast(`"${course.title}" added to Calendar!`, 'calendar');
}

function addCourseToCalendar(course, dueDate) {
    const existing = calendarEvents.find(ev => ev.courseId === course.id);
    if (!existing) {
        calendarEvents.push({
            courseId: course.id,
            title: course.title,
            dueDate: dueDate,
            img: course.img || 'https://picsum.photos/600/300'
        });
    } else {
        existing.dueDate = dueDate;
    }
    // Possibly color the calendar icon if present
    const iconButton = document.querySelector(`.card-body button[title="Add to Calendar"] i`);
    if (iconButton) iconButton.style.color = 'orange';
    saveCalendarData();
}

function fillCalendarCards() {
    const container = document.getElementById('calendarCardsContainer');
    if (!container) return;

    container.innerHTML = '';
    if (!calendarEvents || calendarEvents.length === 0) {
        container.innerHTML = `<p class="text-muted">No events in your calendar yet.</p>`;
        return;
    }

    calendarEvents.forEach(ev => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        col.setAttribute('data-aos', 'fade-up');

        const card = document.createElement('div');
        card.className = 'card grid-card position-relative';

        const img = document.createElement('img');
        img.src = ev.img;
        img.alt = 'Course Thumbnail';
        img.className = 'card-img-top';
        card.appendChild(img);

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = ev.title;

        const dueInfo = document.createElement('p');
        dueInfo.className = 'card-text';
        dueInfo.innerHTML = `<strong>Due Date:</strong> ${ev.dueDate}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-outline-light mt-2';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            calendarEvents = calendarEvents.filter(e => e.courseId !== ev.courseId);
            saveCalendarData();
            fillCalendarCards();
        });

        body.appendChild(title);
        body.appendChild(dueInfo);
        body.appendChild(removeBtn);

        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}

//------------------------------
// 9) Notes Page
//------------------------------
function addNote() {
    const titleInput = document.getElementById('noteTitleInput');
    const bodyInput = document.getElementById('noteBodyInput');
    const titleVal = titleInput ? titleInput.value.trim() : '';
    const bodyVal = bodyInput ? bodyInput.value.trim() : '';

    if (!titleVal && !bodyVal) {
        alert('Please enter a note title or body.');
        return;
    }

    const noteObj = {
        noteId: Date.now().toString(),
        title: titleVal,
        body: bodyVal,
        created: new Date().toLocaleDateString('en-US')
    };
    notes.push(noteObj);
    saveNotesData();

    if (titleInput) titleInput.value = '';
    if (bodyInput) bodyInput.value = '';

    fillNotesCards();
}

function fillNotesCards() {
    const container = document.getElementById('notesCardsContainer');
    if (!container) return;

    container.innerHTML = '';
    if (notes.length === 0) {
        container.innerHTML = `<p class="text-muted">No notes yet. Add one above!</p>`;
        return;
    }

    notes.forEach(nt => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        col.setAttribute('data-aos', 'fade-up');

        const card = document.createElement('div');
        card.className = 'card grid-card notes-card position-relative';

        // Card header (bold)
        const header = document.createElement('div');
        header.className = 'card-header fw-bold';
        header.textContent = nt.title || 'Untitled';

        // Body (no .lead)
        const body = document.createElement('div');
        body.className = 'card-body';

        const text = document.createElement('p');
        text.className = 'card-text';
        text.textContent = nt.body || 'No content';
        body.appendChild(text);

        // Footer => created date + delete
        const footer = document.createElement('div');
        footer.className = 'card-footer d-flex justify-content-between align-items-center';

        const createdSpan = document.createElement('span');
        createdSpan.textContent = `Created: ${nt.created}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-outline-light';
        removeBtn.textContent = 'Delete Note';
        removeBtn.addEventListener('click', () => {
            notes = notes.filter(n => n.noteId !== nt.noteId);
            saveNotesData();
            fillNotesCards();
        });

        footer.appendChild(createdSpan);
        footer.appendChild(removeBtn);

        card.appendChild(header);
        card.appendChild(body);
        card.appendChild(footer);

        col.appendChild(card);
        container.appendChild(col);
    });
}

//------------------------------
// 10) Toast Notifications
//------------------------------
function showBootstrapToast(message, type) {
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toastMessage');
    if (!toastEl || !toastBody) return;

    toastEl.classList.remove('bg-success', 'bg-info', 'bg-danger', 'bg-warning');

    if (type === 'calendar') {
        toastEl.style.background = '';
        toastEl.classList.add('bg-success');
    } else if (type === 'danger') {
        toastEl.style.background = '';
        toastEl.classList.add('bg-danger'); // red for removal
    } else if (type === 'warning') {
        toastEl.style.background = 'linear-gradient(45deg, #FFA500, lime)';
        toastEl.classList.add('bg-info');
    } else {
        // 'success' or anything else
        toastEl.style.background = '';
        toastEl.classList.add(`bg-${type}`);
    }

    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}
