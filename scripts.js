document.addEventListener('DOMContentLoaded', function() {
  initializeToolCards();
  
  setGreeting();
  
  setInterval(setGreeting, 3600000);
});

function initializeToolCards() {
  const toolCards = document.querySelectorAll('.tool-card');
  
  toolCards.forEach(card => {
    card.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      
      if (url) {
        this.classList.add('animate__animated', 'animate__pulse');
        
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      }
    });
    
    card.addEventListener('click', function() {
      const toolName = this.querySelector('h2').textContent;
      
      try {
        const toolClicksJSON = localStorage.getItem('toolClicks');
        let toolClicks = {};
        
        if (toolClicksJSON) {
          toolClicks = JSON.parse(toolClicksJSON);
        }
        
        toolClicks[toolName] = (toolClicks[toolName] || 0) + 1;
        
        localStorage.setItem('toolClicks', JSON.stringify(toolClicks));
      } catch (e) {
        console.log('Error saving click data to localStorage', e);
      }
    });
  });
}

function setGreeting() {
  const header = document.querySelector('header p');
  const hour = new Date().getHours();
  let greeting;
  
  if (hour < 12) {
    greeting = 'Your AI solutions hub to start a productive day';
  } else if (hour < 18) {
    greeting = 'Your gateway to professional AI tools and solutions';
  } else {
    greeting = 'Discover AI innovations to enhance your workflow';
  }
  
  if (header.textContent !== greeting) {
    header.style.opacity = 0;
    
    setTimeout(() => {
      header.textContent = greeting;
      header.style.opacity = 1;
    }, 300);
  }
}