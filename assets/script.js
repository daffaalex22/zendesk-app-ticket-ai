// Initialize Zendesk client
var client = ZAFClient.init();
client.invoke('resize', { width: '100%', height: '475px' });

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to add a message to the chat
function addMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  
  // Let Zendesk handle scrolling instead of manual scrolling
}

// Function to send a message
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    // Add user message
    addMessage(message, true);
    messageInput.value = '';
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      addMessage("Thanks for your message! This is a simulated response.");
    }, 1000);
  }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Initialize with welcome message
addMessage("Welcome to the AI Chat Assistant! Ask me anything.");