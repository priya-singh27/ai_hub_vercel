document.addEventListener('DOMContentLoaded', function() {
  createBubbles();
  
  const toolCards = document.querySelectorAll('.tool-card');
  
  toolCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.add('animate__animated', 'animate__pulse');
      
      const url = this.getAttribute('data-url');
      
      if (url) {
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      }
    });
    
    card.addEventListener('mouseenter', function() {
      const iconContainer = this.querySelector('.icon-container');
      iconContainer.style.transform = 'scale(1.1)';
      
      playHoverSound();
      
      this.style.boxShadow = '0 10px 30px rgba(106, 17, 203, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      const iconContainer = this.querySelector('.icon-container');
      iconContainer.style.transform = 'scale(1)';
      
      this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.07)';
    });
  });
  
  function setGreeting() {
    const header = document.querySelector('header p');
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
      greeting = '🌅 Good morning! Explore these amazing AI tools to start your day';
    } else if (hour < 18) {
      greeting = '☀️ Good afternoon! Your gateway to the exciting world of artificial intelligence';
    } else {
      greeting = '🌙 Good evening! Discover AI magic tonight';
    }
    
    header.textContent = greeting;
  }
  
  setGreeting();
  
  setInterval(setGreeting, 3600000); 
  
  toolCards.forEach(card => {
    card.addEventListener('click', function() {
      const toolName = this.querySelector('h2').textContent;
      
      chrome.storage.local.get(['toolClicks'], function(result) {
        const toolClicks = result.toolClicks || {};
        
        toolClicks[toolName] = (toolClicks[toolName] || 0) + 1;
        
        chrome.storage.local.set({ toolClicks: toolClicks });
      });
    });
  });
  
  setTimeout(showConfetti, 1000);
});

function createBubbles() {
  const container = document.querySelector('.container');
  const bubbleCount = 15;
  
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;
    
    bubble.style.animationDelay = `${Math.random() * 20}s`;
    
    container.appendChild(bubble);
  }
  
  const style = document.createElement('style');
  style.textContent = `
    .bubble {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      pointer-events: none;
      z-index: -1;
      animation: float 15s linear infinite;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.5;
      }
      90% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function playHoverSound() {
  if (!window.audioContext) {
    try {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported.');
      return;
    }
  }
  
  const oscillator = window.audioContext.createOscillator();
  const gainNode = window.audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(2000, window.audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1500, window.audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.01, window.audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, window.audioContext.currentTime + 0.1);
  
  oscillator.connect(gainNode);
  gainNode.connect(window.audioContext.destination);
  
  oscillator.start();
  oscillator.stop(window.audioContext.currentTime + 0.1);
}

function showConfetti() {
  for (let i = 0; i < 100; i++) {
    createConfettiPiece();
  }
}

function createConfettiPiece() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  const colors = ['#FF9A8B', '#FF6A88', '#FF99AC', '#FCB69F', '#FFECD2', '#A1C4FD', '#C2E9FB', '#D4FC79', '#96E6A1'];
  const size = Math.random() * 8 + 6;
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.backgroundColor = color;
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.top = `-10px`;
  
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  
  const animationDuration = Math.random() * 3 + 2;
  const animationDelay = Math.random() * 2;
  
  confetti.style.animation = `confettiFall ${animationDuration}s ease-in ${animationDelay}s forwards`;
  
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    document.body.removeChild(confetti);
  }, (animationDuration + animationDelay) * 1000);
}

const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
  .confetti {
    position: fixed;
    z-index: 1000;
    border-radius: 2px;
    pointer-events: none;
  }
  
  @keyframes confettiFall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyles);