/* =============================================
   LingoStudio Newspaper - Scripts
   ============================================= */

// Page navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const pageId = this.dataset.page;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Dictionary modal
document.querySelectorAll('.dict-word').forEach(word => {
    word.addEventListener('click', function() {
        openModal(this.dataset.word);
    });
});

function openModal(word) {
    // dictionary is defined in dictionary.js
    if (typeof dictionary === 'undefined') {
        console.error('Dictionary not loaded');
        return;
    }
    
    const entry = dictionary[word];
    if (!entry) {
        console.warn('Word not found:', word);
        return;
    }
    
    document.getElementById('modal-word').textContent = word;
    document.getElementById('modal-phonetic').textContent = `(${entry.phonetic})`;
    
    let contentHtml = `
        <div class="modal-row">
            <span class="label-hebrew">${entry.type_he}</span>
            <span class="label-english">${entry.type_en}</span>
        </div>
        <div class="modal-row">
            <strong>משמעות:</strong>
            ${entry.meanings.map(m => 
                `<div class="meaning-item ${m.highlight ? 'highlight' : ''}">${m.text}</div>`
            ).join('')}
        </div>
        <div class="modal-row">
            <strong>דוגמאות:</strong>
            ${entry.examples.map(ex => 
                `<div class="example-item ${ex.inText ? 'in-text' : ''}">
                    <div class="example-hebrew">${ex.hebrew}</div>
                    <div class="example-english">${ex.english}</div>
                </div>`
            ).join('')}
        </div>
    `;
    
    document.getElementById('modal-content').innerHTML = contentHtml;
    document.getElementById('modal-overlay').classList.add('show');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('show');
}

// Close modal on overlay click
document.getElementById('modal-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// Quiz functions
function checkQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let correct = 0;
    
    questions.forEach((q, i) => {
        const correctAnswer = q.dataset.correct;
        const selected = q.querySelector(`input[name="q${i+1}"]:checked`);
        
        q.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('correct', 'wrong');
        });
        
        if (selected) {
            const opt = selected.closest('.quiz-option');
            if (selected.value === correctAnswer) {
                opt.classList.add('correct');
                correct++;
            } else {
                opt.classList.add('wrong');
                q.querySelectorAll('.quiz-option').forEach(o => {
                    if (o.querySelector('input').value === correctAnswer) {
                        o.classList.add('correct');
                    }
                });
            }
        }
    });
    
    const result = document.getElementById('quizResult');
    const total = questions.length;
    const pct = Math.round((correct / total) * 100);
    
    result.classList.add('show');
    result.className = `quiz-result show ${pct >= 80 ? 'good' : 'needs-work'}`;
    result.innerHTML = pct >= 80 
        ? `🎉 מְצוּיָּן! ${correct}/${total} (${pct}%)`
        : `📚 ${correct}/${total} (${pct}%) - נַסֶּה שׁוּב!`;
}

function resetQuiz() {
    document.querySelectorAll('.quiz-question input').forEach(i => i.checked = false);
    document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('correct', 'wrong'));
    document.getElementById('quizResult').classList.remove('show');
}
