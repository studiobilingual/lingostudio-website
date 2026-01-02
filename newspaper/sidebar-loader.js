/**
 * LingoStudio Newspaper - Sidebar Loader
 * ======================================
 * 
 * שימוש: הוסף שורה אחת לפני </body>
 * <script src="sidebar-loader.js"></script>
 * 
 * זהו! הסיידבר יתווסף אוטומטית.
 */

(function() {
    // Google Sheet URL
    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSNzQO_iTRWc9Z1JZji_mTowczOTTH5geTdb__JEq_9BTeCHLvWq4MSQUq2alMjElUzw3F4wIDtdhj/pub?output=csv";

    // הוסף CSS
    const css = `
        .sidebar-layout { display: flex; min-height: 100vh; }
        .sidebar-main { flex: 1; margin-right: 260px; }
        .sidebar { width: 260px; background: #1a1a2e; position: fixed; right: 0; top: 0; height: 100vh; overflow-y: auto; padding: 20px 15px; z-index: 1000; }
        .sidebar-logo { color: white; font-size: 1.4em; font-weight: bold; text-decoration: none; display: block; padding-bottom: 20px; margin-bottom: 20px; border-bottom: 1px solid #333; }
        .sidebar-logo:hover { color: #667eea; }
        .nav-section { margin-bottom: 5px; }
        .nav-section-title { color: #667eea; font-weight: bold; padding: 10px 12px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; border-radius: 8px; }
        .nav-section-title:hover { background: rgba(255,255,255,0.05); }
        .nav-section-title::after { content: "▼"; font-size: 0.7em; transition: transform 0.3s; }
        .nav-section.collapsed .nav-section-title::after { transform: rotate(-90deg); }
        .nav-items { padding-right: 10px; max-height: 1000px; overflow: hidden; transition: max-height 0.3s; }
        .nav-section.collapsed .nav-items { max-height: 0 !important; }
        .nav-item { display: block; color: #aaa; text-decoration: none; padding: 8px 12px; border-radius: 6px; margin-bottom: 2px; font-size: 0.95em; }
        .nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
        .nav-item.active { background: #667eea; color: white; }
        .nav-sub-section { margin-right: 10px; margin-top: 5px; }
        .nav-sub-title { color: #888; font-size: 0.9em; padding: 6px 12px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; border-radius: 6px; }
        .nav-sub-title:hover { background: rgba(255,255,255,0.05); }
        .nav-sub-title::after { content: "›"; transition: transform 0.2s; }
        .nav-sub-section.collapsed .nav-sub-title::after { transform: rotate(-90deg); }
        .nav-sub-items { padding-right: 10px; max-height: 500px; overflow: hidden; transition: max-height 0.3s; }
        .nav-sub-section.collapsed .nav-sub-items { max-height: 0; }
        .sidebar-back { display: flex; align-items: center; color: #888; text-decoration: none; padding: 12px; margin-top: 20px; border-top: 1px solid #333; font-size: 0.9em; }
        .sidebar-back:hover { color: white; }
        .sidebar-toggle { display: none; position: fixed; top: 15px; right: 15px; z-index: 1001; background: #1a1a2e; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-size: 1.2em; }
        @media (max-width: 900px) {
            .sidebar { transform: translateX(100%); transition: transform 0.3s ease; }
            .sidebar.open { transform: translateX(0); }
            .sidebar-main { margin-right: 0; }
            .sidebar-toggle { display: block; }
        }
    `;

    // הוסף את ה-CSS לדף
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    // עטוף את תוכן הדף
    function wrapContent() {
        // צור את המבנה החדש
        const layout = document.createElement("div");
        layout.className = "sidebar-layout";

        // כפתור מובייל
        const toggle = document.createElement("button");
        toggle.className = "sidebar-toggle";
        toggle.innerHTML = "☰";
        toggle.onclick = function() {
            document.getElementById("sidebar").classList.toggle("open");
        };

        // סיידבר
        const sidebar = document.createElement("nav");
        sidebar.className = "sidebar";
        sidebar.id = "sidebar";
        sidebar.innerHTML = '<a href="https://www.lingostudio.ch" class="sidebar-logo">LingoStudio</a><p style="color:#888;padding:10px;">טוען...</p>';

        // תוכן ראשי
        const main = document.createElement("div");
        main.className = "sidebar-main";

        // העבר את כל התוכן הקיים ל-main
        while (document.body.firstChild) {
            main.appendChild(document.body.firstChild);
        }

        // בנה את המבנה החדש
        layout.appendChild(toggle);
        layout.appendChild(sidebar);
        layout.appendChild(main);
        document.body.appendChild(layout);

        // טען את התפריט
        loadSidebar();
    }

    // טען תפריט מ-Google Sheets
    async function loadSidebar() {
        try {
            const response = await fetch(SHEET_URL);
            const csvText = await response.text();
            const menuData = parseCSV(csvText);
            const menuStructure = buildMenuStructure(menuData);
            renderSidebar(menuStructure);
        } catch (error) {
            console.error("Error loading sidebar:", error);
            document.getElementById("sidebar").innerHTML = '<a href="https://www.lingostudio.ch" class="sidebar-logo">LingoStudio</a><p style="color:#888;padding:20px;">שגיאה בטעינת התפריט</p><a href="index.html" class="nav-item">🏠 Home</a>';
        }
    }

    function parseCSV(csv) {
        const lines = csv.trim().split("\n");
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",");
            if (values.length >= 4) {
                data.push({
                    level: parseInt(values[0]) || 1,
                    parent: values[1] ? values[1].trim() : "",
                    title: values[2] ? values[2].trim() : "",
                    href: values[3] ? values[3].trim() : ""
                });
            }
        }
        return data;
    }

    function buildMenuStructure(data) {
        const menu = [];
        const sections = {};
        
        data.filter(function(item) { return item.level === 1; }).forEach(function(item) {
            const section = { title: item.title, href: item.href, items: [], subsections: {} };
            sections[item.title] = section;
            menu.push(section);
        });
        
        data.filter(function(item) { return item.level === 2; }).forEach(function(item) {
            const parent = sections[item.parent];
            if (parent) {
                if (item.href) {
                    parent.items.push({ title: item.title, href: item.href });
                } else {
                    parent.subsections[item.title] = { title: item.title, items: [] };
                }
            }
        });
        
        data.filter(function(item) { return item.level === 3; }).forEach(function(item) {
            for (const key in sections) {
                if (sections[key].subsections[item.parent]) {
                    sections[key].subsections[item.parent].items.push({ title: item.title, href: item.href });
                    break;
                }
            }
        });
        
        return menu;
    }

    function renderSidebar(menu) {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        
        let html = '<a href="https://www.lingostudio.ch" class="sidebar-logo">LingoStudio</a>';
        html += '<div class="nav-section"><a href="index.html" class="nav-item ' + (currentPage === "index.html" ? "active" : "") + '">🏠 Home</a></div>';
        
        menu.forEach(function(section) {
            const hasActiveChild = section.items.some(function(item) { return item.href === currentPage; });
            
            if (section.href && section.items.length === 0 && Object.keys(section.subsections).length === 0) {
                html += '<div class="nav-section"><a href="' + section.href + '" class="nav-item ' + (currentPage === section.href ? "active" : "") + '">' + section.title + '</a></div>';
                return;
            }
            
            html += '<div class="nav-section' + (hasActiveChild ? "" : " collapsed") + '">';
            html += '<div class="nav-section-title">' + section.title + '</div>';
            html += '<div class="nav-items">';
            
            section.items.forEach(function(item) {
                html += '<a href="' + item.href + '" class="nav-item ' + (currentPage === item.href ? "active" : "") + '">' + item.title + '</a>';
            });
            
            for (const key in section.subsections) {
                const sub = section.subsections[key];
                const subHasActive = sub.items.some(function(item) { return item.href === currentPage; });
                html += '<div class="nav-sub-section' + (subHasActive ? "" : " collapsed") + '">';
                html += '<div class="nav-sub-title">' + sub.title + '</div>';
                html += '<div class="nav-sub-items">';
                sub.items.forEach(function(item) {
                    html += '<a href="' + item.href + '" class="nav-item ' + (currentPage === item.href ? "active" : "") + '">' + item.title + '</a>';
                });
                html += '</div></div>';
            }
            
            html += '</div></div>';
        });
        
        html += '<a href="https://www.lingostudio.ch" class="sidebar-back">← Zurück zur Hauptseite</a>';
        
        document.getElementById("sidebar").innerHTML = html;
        
        // הוסף אירועי לחיצה
        document.querySelectorAll(".nav-section-title").forEach(function(el) {
            el.addEventListener("click", function() {
                el.parentElement.classList.toggle("collapsed");
            });
        });
        
        document.querySelectorAll(".nav-sub-title").forEach(function(el) {
            el.addEventListener("click", function() {
                el.parentElement.classList.toggle("collapsed");
            });
        });
    }

    // הפעל כשהדף נטען
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", wrapContent);
    } else {
        wrapContent();
    }
})();
