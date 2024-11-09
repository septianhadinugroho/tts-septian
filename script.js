let score = 0;

function updateScoreDisplay() {
    document.getElementById('score-display').innerText = `Skor: ${score}`;
}

function resetScore() {
    score = 0;
    updateScoreDisplay();
}

function submitString(concat, tipe, tabel) {
    const correctAnswers = {
        t1: "HTML",
        t2: "JAVASCRIPT",
        t3: "SCRIPT",
        t4: "VALUE",
        t5: "BODY",
        d1: "CSS",
        d2: "BOOTSTRAP",
        d3: "AUDIO",
        d4: "TITLE",
        d5: "STYLE"
    };

    if (concat.toUpperCase() === correctAnswers[tipe]) {
        let message = "Selamat Jawaban Anda Benar!";
        showNotification('correct', message);
        
        const inputs = Array.from(tabel);
        const alreadyCorrect = inputs.every(input => input.disabled);

        if (!alreadyCorrect) {
            score += 10;
            updateScoreDisplay();
        }

        tableRepeat(tabel);
        return;
    }

    const allFilled = Array.from(tabel).every(input => input.value.trim() !== '');
    if (allFilled) {
        showNotification('incorrect', "Jawaban Anda Salah, Coba Lagi!");
    }
}

function tableRepeat(table) {
    for (let j = 0; j < table.length; j++) {
        table[j].disabled = true; 
    }
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);

    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
        document.body.removeChild(notification);
    }, 3000);
}

function autoNext(i, cn) {
    let d = document.querySelectorAll('.' + cn);
    for (let j = i + 1; j < d.length; j++) {
        if (!d[j].disabled) {
            d[j].select();
            return;
        }
    }
}

function catString(cn) {
    let concat = "";
    let d = document.querySelectorAll('.' + cn);
    for (let i = 0; i < d.length; i++) {
        concat += d[i].value;
    }
    return concat;
}

const btn = document.querySelectorAll("body button");
btn.forEach(function (pil) {
    pil.addEventListener('click', function () {
        let namebtn = pil.getAttribute('name');
        geserCek(namebtn);
    });
});

function geserCek(nbtn) {
    const table = document.querySelectorAll('.' + nbtn);
    if (table[0].disabled) {
        autoNext(0, nbtn);
    } else {
        table[0].select();
    }

    for (let i = 0; i < table.length; i++) {
        table[i].addEventListener('input', function () {
            if (i === table.length - 1) {
                let concatString = catString(nbtn);
                submitString(concatString, nbtn, table);
            } else {
                autoNext(i, nbtn);
            }
        });
    }
}

$(document).ready(function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    if (localStorage.getItem('showTTS') === 'true') {
        $(".target").show();
    } else {
        $(".target").hide();
    }

    $("#toggle").click(function() {
        $(".target").show();
        localStorage.setItem('showTTS', 'true');
    });

    $("#toggleHide").click(function() {
        $(".target").hide();
        $('input[type="text"]').val('');
        $('input[type="text"]').prop('disabled', false);
        resetScore();
        localStorage.setItem('showTTS', 'false');
        location.reload();
    });

    $('#toggleRestart').click(function() {
        $('input[type="text"]').val('');        
        $('input[type="text"]').prop('disabled', false); 
        resetScore();
        localStorage.setItem('showTTS', 'true');
        location.reload();
    });
});

document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});