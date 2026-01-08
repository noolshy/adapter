// Функция для обработки ошибок загрузки аватарки
function handleAvatarError(img) {
    console.log('⚠️ Аватарка не найдена в img/avatar.jpg');
    
    // Показываем запасную аватарку
    const fallback = document.querySelector('.fallback-avatar');
    if (fallback) {
        fallback.style.display = 'flex';
    }
    
    // Меняем инструкцию
    const instruction = document.querySelector('.instruction-text');
    if (instruction) {
        instruction.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Аватарка не найдена!';
        instruction.style.color = '#ff0000';
    }
    
    // Предлагаем альтернативу
    const details = document.querySelector('.instruction-details');
    if (details) {
        details.innerHTML = 'Создайте папку "img" и поместите туда файл "avatar.jpg"';
        details.style.color = '#990000';
    }
}

// В начале initAvatarAnimation добавьте:
function initAvatarAnimation() {
    const avatar = document.getElementById('avatar');
    if (!avatar) return;
    
    // Проверяем, загрузилась ли аватарка
    if (avatar.complete && avatar.naturalHeight === 0) {
        handleAvatarError(avatar);
    }
    
    avatar.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.transform = 'rotate(5deg) scale(1.05)';
        
        // Эффект свечения аватара
        const glow = document.querySelector('.avatar-glow');
        if (glow) {
            glow.style.opacity = '0.8';
            glow.style.animation = 'glowPulse 0.5s infinite alternate';
        }
    });
    
    avatar.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
        
        // Сброс свечения
        const glow = document.querySelector('.avatar-glow');
        if (glow) {
            glow.style.opacity = '0.5';
            glow.style.animation = 'glowPulse 3s infinite alternate';
        }
    });
    
    // Динамическое изменение кровавого эффекта
    setInterval(() => {
        const blood = document.querySelector('.avatar-blood');
        if (blood) {
            const x = 20 + Math.random() * 60;
            const y = 20 + Math.random() * 60;
            blood.style.background = `
                radial-gradient(circle at ${x}% ${y}%, 
                    transparent 30%, 
                    rgba(139, 0, 0, ${0.3 + Math.random() * 0.3}) 60%,
                    transparent 70%),
                radial-gradient(circle at ${100 - x}% ${100 - y}%, 
                    transparent 40%, 
                    rgba(255, 0, 0, ${0.2 + Math.random() * 0.2}) 65%,
                    transparent 75%)
            `;
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🩸 Мрачный киберпанк активирован');
    
    initBloodEffects();
    initAvatarAnimation();
    initAudioEffects();
    initBloodCursor();
    createBloodRain();
    initGlitchEffects();
    initTextEffects();
    
    // Инициализация эффектов статуса
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(() => {
            statusDot.style.boxShadow = `
                0 0 ${15 + Math.random() * 10}px #8b0000,
                inset 0 0 ${5 + Math.random() * 5}px #000
            `;
        }, 1000);
    }
    
    // Инициализация текстовых эффектов
    const nickname = document.querySelector('.nickname');
    if (nickname) {
        setInterval(() => {
            nickname.style.textShadow = `
                2px 2px 0 #000,
                4px 4px 0 #220000,
                0 0 ${20 + Math.random() * 20}px rgba(139, 0, 0, ${0.3 + Math.random() * 0.3}),
                0 0 ${40 + Math.random() * 20}px rgba(139, 0, 0, ${0.2 + Math.random() * 0.2})
            `;
        }, 2000);
    }
});

function initBloodEffects() {
    const buttons = document.querySelectorAll('.blood-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('active');
            createDarkParticles(this);
            playDarkSound();
            
            // Усиление пульсации
            const pulse = this.querySelector('.btn-pulse');
            if (pulse) {
                pulse.style.animation = 'darkPulse 1s infinite';
            }
            
            // Эффект напряжения
            const glow = this.querySelector('.btn-glow-red');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            
            // Возвращение обычной пульсации
            const pulse = this.querySelector('.btn-pulse');
            if (pulse) {
                pulse.style.animation = 'darkPulse 3s infinite';
            }
            
            // Сброс эффекта напряжения
            const glow = this.querySelector('.btn-glow-red');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Эффект нажатия
            this.style.transform = 'scale(0.95) rotate(10deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            logDarkClick(this.href);
            
            // Создание взрыва частиц
            createDarkExplosion(this);
            
            // Открытие ссылки через 300мс для завершения анимации
            setTimeout(() => {
                window.open(this.href, '_blank');
            }, 300);
        });
    });
}

function createDarkParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const particles = 12;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'dark-particle';
        
        particle.style.position = 'fixed';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.width = `${3 + Math.random() * 3}px`;
        particle.style.height = `${3 + Math.random() * 3}px`;
        particle.style.background = '#8b0000';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 8px #8b0000';
        particle.style.filter = 'blur(1px)';
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2;
        const distance = 50 + Math.random() * 70;
        
        particle.animate([
            {
                transform: `translate(0, 0) scale(1)`,
                opacity: 0.8
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 800,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1800);
    }
}

function createDarkExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const particles = 25;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'dark-explosion';
        
        particle.style.position = 'fixed';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.width = `${5 + Math.random() * 5}px`;
        particle.style.height = `${5 + Math.random() * 5}px`;
        particle.style.background = '#660000';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 12px #8b0000';
        particle.style.filter = 'blur(1.5px)';
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        const distance = 80 + Math.random() * 120;
        
        particle.animate([
            {
                transform: `translate(0, 0) scale(1)`,
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800 + Math.random() * 800,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1600);
    }
    
    // Создание текстового эффекта
    createBloodText('DARK', centerX, centerY);
}

function createBloodText(text, x, y) {
    const textEffect = document.createElement('div');
    textEffect.className = 'blood-text-effect';
    
    textEffect.style.position = 'fixed';
    textEffect.style.top = `${y}px`;
    textEffect.style.left = `${x}px`;
    textEffect.style.transform = 'translate(-50%, -50%)';
    textEffect.style.color = '#8b0000';
    textEffect.style.fontSize = '2.5rem';
    textEffect.style.fontWeight = '900';
    textEffect.style.fontFamily = "'Orbitron', sans-serif";
    textEffect.style.zIndex = '10000';
    textEffect.style.pointerEvents = 'none';
    textEffect.style.textShadow = '0 0 20px #8b0000';
    textEffect.style.opacity = '0';
    textEffect.style.letterSpacing = '5px';
    textEffect.textContent = text;
    
    document.body.appendChild(textEffect);
    
    textEffect.animate([
        { 
            opacity: 0, 
            transform: 'translate(-50%, -50%) scale(0.5)',
            filter: 'blur(10px)'
        },
        { 
            opacity: 1, 
            transform: 'translate(-50%, -50%) scale(1.2)',
            filter: 'blur(0)'
        },
        { 
            opacity: 0, 
            transform: 'translate(-50%, -50%) scale(2)',
            filter: 'blur(5px)'
        }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    
    setTimeout(() => {
        if (textEffect.parentNode) {
            textEffect.parentNode.removeChild(textEffect);
        }
    }, 1200);
}

function initAudioEffects() {
    try {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            window.audioContext = new (AudioContext || webkitAudioContext)();
        }
    } catch (e) {
        console.log('Аудио не поддерживается');
    }
}

function playDarkSound() {
    const audio = document.getElementById('hover-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.1;
        audio.play().catch(e => {
            console.log('Автовоспроизведение заблокировано');
        });
    }
}

function initBloodCursor() {
    const cursor = document.getElementById('blood-cursor');
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    document.querySelectorAll('a, .blood-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '36px';
            cursor.style.height = '36px';
            cursor.style.borderColor = '#990000';
            cursor.style.boxShadow = 
                '0 0 25px #8b0000, ' +
                'inset 0 0 15px rgba(0, 0, 0, 0.8)';
            cursor.style.background = 'rgba(139, 0, 0, 0.15)';
            cursor.style.filter = 'blur(0)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '24px';
            cursor.style.height = '24px';
            cursor.style.borderColor = 'rgba(139, 0, 0, 0.8)';
            cursor.style.boxShadow = 
                '0 0 20px rgba(139, 0, 0, 0.6), ' +
                'inset 0 0 10px rgba(0, 0, 0, 0.7)';
            cursor.style.background = 'rgba(20, 0, 0, 0.3)';
        });
    });
}

function logDarkClick(url) {
    console.log(`🩸 Мрачный клик: ${url}`);
}

function createBloodRain() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const drop = document.createElement('div');
            drop.className = 'blood-rain-drop';
            
            drop.style.position = 'fixed';
            drop.style.top = '-10px';
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.width = `${1 + Math.random() * 1.5}px`;
            drop.style.height = `${15 + Math.random() * 25}px`;
            drop.style.background = 'linear-gradient(to bottom, rgba(139, 0, 0, 0.6), transparent)';
            drop.style.pointerEvents = 'none';
            drop.style.zIndex = '3';
            drop.style.filter = 'blur(0.5px)';
            
            document.body.appendChild(drop);
            
            drop.animate([
                { transform: 'translateY(0)', opacity: 0.6 },
                { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
            ], {
                duration: 2500 + Math.random() * 1500,
                easing: 'linear'
            });
            
            setTimeout(() => {
                if (drop.parentNode) {
                    drop.parentNode.removeChild(drop);
                }
            }, 4000);
        }
    }, 150);
}

function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.nickname, .username, .status-text, .price-line');
    
    glitchElements.forEach(el => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                const originalText = el.textContent;
                const glitchDuration = 100 + Math.random() * 200;
                
                // Эффект глитча
                el.style.transform = `translateX(${(Math.random() - 0.5) * 3}px)`;
                el.style.opacity = '0.8';
                
                setTimeout(() => {
                    el.style.transform = '';
                    el.style.opacity = '';
                }, glitchDuration);
            }
        }, 2000);
    });
}

function initTextEffects() {
    const priceDetails = document.querySelector('.price-details');
    if (!priceDetails) return;
    
    setInterval(() => {
        priceDetails.style.textShadow = `
            1px 1px 2px #000,
            0 0 ${10 + Math.random() * 10}px rgba(139, 0, 0, ${0.3 + Math.random() * 0.2})
        `;
    }, 3000);
}

// Добавление CSS для эффектов
const style = document.createElement('style');
style.textContent = `
    .dark-particle, .dark-explosion {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
    }
    
    .blood-rain-drop {
        position: fixed;
        pointer-events: none;
        z-index: 3;
    }
    
    .blood-text-effect {
        position: fixed;
        pointer-events: none;
        z-index: 10000;
    }
    
    @media (max-width: 768px) {
        .dark-particle, .dark-explosion, .blood-text-effect {
            display: none;
        }
    }
    
    body {
        cursor: none;
    }
    
    a, button, .blood-btn {
        cursor: none !important;
    }
    
    @media (max-width: 768px) {
        body, a, button, .blood-btn {
            cursor: default !important;
        }
    }
`;
document.head.appendChild(style);

// Запуск анимации статуса
setInterval(() => {
    const status = document.querySelector('.status');
    if (status) {
        status.style.borderColor = `rgba(${80 + Math.random() * 40}, 0, 0, 0.6)`;
    }
}, 3000);
