// Initialize Zendesk client
var client = ZAFClient.init();
client.invoke('resize', { width: '100%', height: '475px' });

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const summaryButton = document.getElementById('summary-button');

// Function to add a message to the chat
function addMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);

  // Add animation
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(10px)';
  messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  // Trigger the animation
  setTimeout(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
  }, 10);
}

// Function to show a loading indicator
function showLoadingIndicator() {
  const loadingDiv = document.createElement('div');
  loadingDiv.classList.add('message', 'bot-message', 'loading');
  loadingDiv.id = 'loading-indicator';
  loadingDiv.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(loadingDiv);

  // Add animation
  loadingDiv.style.opacity = '0';
  loadingDiv.style.transform = 'translateY(10px)';
  loadingDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  // Trigger the animation
  setTimeout(() => {
    loadingDiv.style.opacity = '1';
    loadingDiv.style.transform = 'translateY(0)';
  }, 10);

  return loadingDiv;
}

// Function to hide the loading indicator
function hideLoadingIndicator() {
  const loadingDiv = document.getElementById('loading-indicator');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

// Function to send a message
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    // Add user message
    addMessage(message, true);
    messageInput.value = '';
    
    // Check for special commands
    if (message.startsWith('/summary')) {
      client.get('ticket.id').then(function (data) {
        var ticketId = data['ticket.id'];
        handleSummaryRequest({
          ticketId: ticketId,
        });
      });
      return;
    }

    // Show loading indicator
    const loadingIndicator = showLoadingIndicator();

    // Simulate bot response after a short delay
    setTimeout(() => {
      hideLoadingIndicator();
      addMessage("Thanks for your message! This is a simulated response.");
    }, 500);
  }
}

// New function to handle summary requests via n8n
async function handleSummaryRequest(ticketData) {
  const loadingIndicator = showLoadingIndicator();

  try {
    const response = await sendToN8nWebhook(ticketData);
    const summary = processSummaryResponse(response);

    hideLoadingIndicator();
    addMessage(summary?.output);
  } catch (error) {
    hideLoadingIndicator();
    addMessage("Sorry, I couldn't generate a summary at the moment.");
    console.error('Summary error:', error);
  }
}

// Function to handle summary button click
function handleSummaryClick() {
  // Add the /summary message as if the user typed it
  addMessage('/summary', true);

  // Trigger the summary functionality
  client.get('ticket.id').then(function (data) {
    var ticketId = data['ticket.id'];
    handleSummaryRequest({
      ticketId: ticketId,
    });
  });
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
summaryButton.addEventListener('click', handleSummaryClick);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Initialize with welcome message
addMessage("Welcome to the AI Chat Assistant! Ask me anything.");