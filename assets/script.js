// Initialize Zendesk client
var client = ZAFClient.init();
client.invoke('resize', { width: '100%', height: '475px' });

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const summaryButton = document.getElementById('summary-button');
const autoreplyButton = document.getElementById('autoreply-button');

// Function to add a message to the chat
function addMessage(text, isUser = false) {
  // Add temporary notice before the first message
  if (chatMessages.children.length === 1) { // Only the initial bot message exists
    const noticeDiv = document.createElement('div');
    noticeDiv.classList.add('message', 'notice-message');
    noticeDiv.textContent = 'Note: This conversation is temporary and will be lost when you leave.';
    chatMessages.insertBefore(noticeDiv, chatMessages.firstChild.nextSibling); // Insert after initial message
  }

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

  // Convert newlines to 2 <br> tags
  messageDiv.innerHTML = text.replace(/\n/g, '<br> <br>');

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

  // Scroll to the bottom of the chat container with smooth behavior
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: 'smooth'
  });
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

  // Scroll to the bottom of the chat container with smooth behavior
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: 'smooth'
  });

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
    
    // Reset textarea height
    messageInput.style.height = 'auto';

    // Check for special commands
    if (message.startsWith('/summary')) {
      client.get('ticket.id').then(function (data) {
        var ticketId = data['ticket.id'];
        handleSummaryRequest({
          ticketId: ticketId,
        });
      });
      return;
    } else if (message.startsWith('/autoreply')) {
      client.get('ticket.id').then(function (data) {
        var ticketId = data['ticket.id'];
        handleAutoreplyRequest({
          ticketId: ticketId,
        });
      });
      return;
    } else {
      handleDocsRequest(message);
    }

    // Delay showing the loading indicator by 500ms
    const loadingTimeout = setTimeout(() => {
      showLoadingIndicator();
    }, 500);

    // Simulate bot response after a short delay
    setTimeout(() => {
      clearTimeout(loadingTimeout); // Clear timeout if response is fast
      hideLoadingIndicator();
      addMessage("Thanks for your message! This is a simulated response.");
    }, 1500);
  }
}

// New function to handle summary requests via n8n
async function handleSummaryRequest(ticketData) {
  const loadingIndicator = showLoadingIndicator();

  try {
    const response = await sendToN8nWebhook(SUMMARY_WEBHOOK_URL, ticketData);
    const summary = processSummaryResponse(response);

    hideLoadingIndicator();
    addMessage(summary?.output);
  } catch (error) {
    hideLoadingIndicator();
    addMessage("Sorry, I couldn't generate a summary at the moment.");
    console.error('Summary error:', error);
  }
}

// New function to handle autoreply requests via n8n
async function handleAutoreplyRequest(ticketData) {
  const loadingIndicator = showLoadingIndicator();

  try {
    const autoreplyText = "Thank you for contacting us. We've received your ticket and will get back to you shortly.";
    const response = await sendToN8nWebhook(AUTOREPLY_WEBHOOK_URL, ticketData);
    const autoreply = processSummaryResponse(response) || autoreplyText;

    hideLoadingIndicator();
    client.invoke('ticket.comment.appendText', autoreply?.output).then(function () {
      addMessage("Autoreply has been added to the ticket comment.");
    }).catch(function (error) {
      addMessage("Failed to add autoreply to ticket comment.");
      console.error('Error setting comment:', error);
    });
  } catch (error) {
    hideLoadingIndicator();
    addMessage("Sorry, I couldn't generate an autoreply at the moment.");
    console.error('Autoreply error:', error);
  }
}

async function handleDocsRequest(message) {
  const loadingIndicator = showLoadingIndicator();
  try {
    const response = await sendToN8nWebhook(DOCS_WEBHOOK_URL, { message: message });
    const result = processSummaryResponse(response);

    console.log("DOCS_RESULT", result);

    hideLoadingIndicator();
    addMessage(result);
  } catch (error) {
    hideLoadingIndicator();
    addMessage("Sorry, I couldn't find any relevant documentation at the moment.");
    console.error('Docs error:', error);
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

// Function to handle autoreply button click
function handleAutoreplyClick() {
  // Add the /autoreply message as if the user typed it
  addMessage('/autoreply', true);

  client.get('ticket.id').then(function (data) {
    var ticketId = data['ticket.id'];
    handleAutoreplyRequest({
      ticketId: ticketId,
    });
  });
}

// Function to automatically resize textarea based on content
function autoResizeTextarea() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 150) + 'px'; // Max height of 150px
}

// Event listeners
autoreplyButton.addEventListener('click', handleAutoreplyClick);
sendButton.addEventListener('click', sendMessage);
summaryButton.addEventListener('click', handleSummaryClick);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
messageInput.addEventListener('input', autoResizeTextarea); // Add auto-resize on input

// Initialize with welcome message
addMessage("Welcome to the AI Chat Assistant! Ask me anything.");