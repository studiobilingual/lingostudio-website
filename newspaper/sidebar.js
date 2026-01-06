/** 
 * LingoStudio Newspaper - Dynamic Sidebar
 * =======================================
 * התפריט נטען אוטומטית מ-Google Sheets!
 * 
 * לעדכון התפריט:
 * 1. פתח את ה-Google Sheet
 * 2. ערוך את הטבלה
 * 3. רענן את הדף - זהו!
 */

// === הגדרות ===
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSNzQO_iTRWc9Z1JZji_mTowczOTTH5geTdb__JEq_9BTeCHLvWq4MSQUq2alMjElUzw3F4wIDtdhj/pub?output=csv';

// === קוד - אין צורך לערוך מתחת לשורה הזו ===

async function loadSidebar() {
    try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        const menuData = parseCSV(csvText);
        const menuStructure = buildMenuStructure(menuData);
        renderSidebar(menuStructure);
    } catch (error) {
        console.error('Error loading sidebar:', error);
        renderFallbackSidebar();
    }
}

function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length >= 4) {
            data.push({
                level: parseInt(values[0]) || 1,
                parent: values[1]?.trim() || '',
                title: values[2]?.trim() || '',
                href: values[3]?.trim() || ''
            });
        }
    }
    return data;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

function buildMenuStructure(data) {
    const menu = [];
    const sections = {};
    
    // First pass: create sections (level 1)
    data.filter(item => item.level === 1).forEach(item => {
        const section = {
            title: item.title,
            href: item.href,
            items: [],
            subsections: {}
        };
        sections[item.title] = section;
        menu.push(section);
    });
    
    // Second pass: add items to sections (level 2)
    data.filter(item => item.level === 2).forEach(item => {
        const parent = sections[item.parent];
        if (parent) {
            if (item.href) {
                // It's a link
                parent.items.push({
                    title: item.title,
                    href: item.href
                });
            } else {
                // It's a subsection
                parent.subsections[item.title] = {
                    title: item.title,
                    items: []
                };
            }
        }
    });
    
    // Third pass: add items to subsections (level 3)
    data.filter(item => item.level === 3).forEach(item => {
        // Find the parent subsection
        for (const section of Object.values(sections)) {
            if (section.subsections[item.parent]) {
                section.subsections[item.parent].items.push({
                    title: item.title,
                    href: item.href
                });
                break;
            }
        }
    });
    
    return menu;
}

function renderSidebar(menu) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    let html = `
        <a href="https://www.lingostudio.ch" class="sidebar-logo">LingoStudio</a>
        <div class="nav-section">
            <a href="index.html" class="nav-item ${currentPage === 'index.html' ? 'active' : ''}">🏠 Home</a>
        </div>
    `;
    
    menu.forEach(section => {
        // Check if this section has active child
        const hasActiveChild = section.items.some(item => item.href === currentPage) ||
            Object.values(section.subsections).some(sub => 
                sub.items.some(item => item.href === currentPage)
            );
        
        // If section has a direct link (no children)
        if (section.href && section.items.length === 0 && Object.keys(section.subsections).length === 0) {
            html += `
                <div class="nav-section">
                    <a href="${section.href}" class="nav-item ${currentPage === section.href ? 'active' : ''}">${section.title}</a>
                </div>
            `;
            return;
        }
        
        // Section with children - COLLAPSED by default, open only if has active child
        html += `
            <div class="nav-section ${hasActiveChild ? '' : 'collapsed'}">
                <div class="nav-section-title">${section.title}</div>
                <div class="nav-items">
        `;
        
        // Regular items
        section.items.forEach(item => {
            html += `<a href="${item.href}" class="nav-item ${currentPage === item.href ? 'active' : ''}">${item.title}</a>`;
        });
        
        // Subsections
        Object.values(section.subsections).forEach(sub => {
            const subHasActive = sub.items.some(item => item.href === currentPage);
            html += `
                <div class="nav-sub-section ${subHasActive ? '' : 'collapsed'}">
                    <div class="nav-sub-title">${sub.title}</div>
                    <div class="nav-sub-items">
            `;
            sub.items.forEach(item => {
                html += `<a href="${item.href}" class="nav-item ${currentPage === item.href ? 'active' : ''}">${item.title}</a>`;
            });
            html += `</div></div>`;
        });
        
        html += `</div></div>`;
    });
    
    html += `<a href="https://www.lingostudio.ch" class="sidebar-back">← Zurück zur Hauptseite</a>`;
    
    document.getElementById('sidebar').innerHTML = html;
    
    // Add click handlers
    document.querySelectorAll('.nav-section-title').forEach(el => {
        el.addEventListener('click', () => el.parentElement.classList.toggle('collapsed'));
    });
    
    document.querySelectorAll('.nav-sub-title').forEach(el => {
        el.addEventListener('click', () => el.parentElement.classList.toggle('collapsed'));
    });
}

function renderFallbackSidebar() {
    document.getElementById('sidebar').innerHTML = `
        <a href="https://www.lingostudio.ch" class="sidebar-logo">LingoStudio</a>
        <div class="nav-section">
            <a href="index.html" class="nav-item">🏠 Home</a>
        </div>
        <p style="color:#888;padding:20px;font-size:0.9em;">Fehler beim Laden des Menüs. Bitte aktualisieren.</p>
              <a href="https://www.lingostudio.ch" class="sidebar-back">← Zurück zur Hauptseite</a>
    `;
}

// Mobile toggle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Initialize
document.addEventListener('DOMContentLoaded', loadSidebar);
