// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add floating bubble animation to the background
  createBubbles();
  
  // Get all tool cards
  const toolCards = document.querySelectorAll('.tool-card');
  
  // Add click event listeners to each card
  toolCards.forEach(card => {
    card.addEventListener('click', function() {
      // Add a nice click effect before redirecting
      this.classList.add('animate__animated', 'animate__pulse');
      
      // Get the URL from the data attribute
      const url = this.getAttribute('data-url');
      
      // Redirect to the URL after the animation completes
      if (url) {
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      }
    });
    
    // Add hover animation effect with sound
    card.addEventListener('mouseenter', function() {
      // Add a subtle pulse animation to the icon
      const iconContainer = this.querySelector('.icon-container');
      iconContainer.style.transform = 'scale(1.1)';
      
      // Play a subtle hover sound
      playHoverSound();
      
      // Add a light glow effect
      this.style.boxShadow = '0 10px 30px rgba(106, 17, 203, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset the icon animation
      const iconContainer = this.querySelector('.icon-container');
      iconContainer.style.transform = 'scale(1)';
      
      // Reset the shadow
      this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.07)';
    });
  });
  
  // Function to set the current time of day greeting with emoji
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
  
  // Set the initial greeting
  setGreeting();
  
  // Update the greeting every hour
  setInterval(setGreeting, 3600000); // 3600000 ms = 1 hour
  
  // Optional: Track which tools are clicked most frequently
  // This uses Chrome storage to save user preferences
  toolCards.forEach(card => {
    card.addEventListener('click', function() {
      const toolName = this.querySelector('h2').textContent;
      
      // Get existing click counts from storage
      chrome.storage.local.get(['toolClicks'], function(result) {
        const toolClicks = result.toolClicks || {};
        
        // Increment the click count for this tool
        toolClicks[toolName] = (toolClicks[toolName] || 0) + 1;
        
        // Save back to storage
        chrome.storage.local.set({ toolClicks: toolClicks });
      });
    });
  });
  
  // Add a fun confetti effect when the page loads
  setTimeout(showConfetti, 1000);
});

// Create floating background bubbles
function createBubbles() {
  const container = document.querySelector('.container');
  const bubbleCount = 15;
  
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random size
    const size = Math.random() * 60 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random position
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    bubble.style.animationDelay = `${Math.random() * 20}s`;
    
    // Add to container
    container.appendChild(bubble);
  }
  
  // Add bubble styles
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

// Play a subtle hover sound
function playHoverSound() {
  // Only create the audio context on first hover to avoid autoplay restrictions
  if (!window.audioContext) {
    try {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported.');
      return;
    }
  }
  
  // Create a short subtle sound
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

// Show confetti effect
function showConfetti() {
  // Create confetti elements
  for (let i = 0; i < 100; i++) {
    createConfettiPiece();
  }
}

function createConfettiPiece() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  // Random properties
  const colors = ['#FF9A8B', '#FF6A88', '#FF99AC', '#FCB69F', '#FFECD2', '#A1C4FD', '#C2E9FB', '#D4FC79', '#96E6A1'];
  const size = Math.random() * 8 + 6;
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.backgroundColor = color;
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.top = `-10px`;
  
  // Random rotation
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  
  // Animation properties
  const animationDuration = Math.random() * 3 + 2;
  const animationDelay = Math.random() * 2;
  
  confetti.style.animation = `confettiFall ${animationDuration}s ease-in ${animationDelay}s forwards`;
  
  document.body.appendChild(confetti);
  
  // Remove after animation
  setTimeout(() => {
    document.body.removeChild(confetti);
  }, (animationDuration + animationDelay) * 1000);
}

// Add confetti animation styles
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