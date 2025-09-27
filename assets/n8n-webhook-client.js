// n8n-webhook-client.js

const SUMMARY_WEBHOOK_URL = "https://n8n-service-2vj1.onrender.com/webhook/simple-summary";
const AUTOREPLY_WEBHOOK_URL = "https://n8n-service-2vj1.onrender.com/webhook/ticket-autoreply";
// DOCS_WEBHOOK_URL = "https://n8n-service-2vj1.onrender.com/webhook/docs";

/**
 * Sends a message to the n8n webhook for summarization
 * @param {string} message - The message to summarize
 * @param {string} webhookUrl - The n8n webhook URL
 * @returns {Promise<Object>} The response from the webhook
 */
async function sendToN8nWebhook(webhookUrl, ticketData) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending to n8n webhook:', error);
    throw error;
  }
}

/**
 * Processes a summary response from n8n
 * @param {Object} responseData - The response data from n8n
 * @returns {string} The summarized text
 */
function processSummaryResponse(responseData) {
  // Adjust this based on your n8n workflow response structure
  if (responseData && responseData.output) {
    return responseData.output;
  } else if (responseData && responseData.data) {
    return responseData.data.output;
  } else {
    return "Summary could not be generated.";
  }
}

// Example usage:
// const webhookUrl = 'https://your-n8n-instance.com/webhook/your-webhook-id';
// sendToN8nWebhook('Your message here', webhookUrl)
//   .then(response => {
//     const summary = processSummaryResponse(response);
//     console.log('Summary:', summary);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sendToN8nWebhook,
    processSummaryResponse,
    SUMMARY_WEBHOOK_URL,
    AUTOREPLY_WEBHOOK_URL,
  };
}