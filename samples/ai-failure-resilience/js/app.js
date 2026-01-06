/**
 * AI Failure Resilience Demo
 * 
 * This app demonstrates how to build resilient AI applications that gracefully
 * handle various LLM failure modes simulated by Dev Proxy's LanguageModelFailurePlugin.
 * 
 * NOTE: This demo uses a CDN-loaded OpenAI library for simplicity.
 * For production applications, use npm packages with proper bundling.
 */

import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.98.0/+esm";
import { apiKey } from "./env.js";

// Configuration
const llmUrl = "https://api.openai.com/v1";
const model = "gpt-4";

// Initialize OpenAI client
// WARNING: dangerouslyAllowBrowser exposes API keys in the browser.
// This is acceptable for demos but should NOT be used in production.
// For production, make API calls from a secure backend server.
const openai = new OpenAI({
  baseURL: llmUrl,
  apiKey,
  dangerouslyAllowBrowser: true,
});

// DOM elements
const messagesContainer = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

/**
 * Add a message to the chat
 * @param {string} content - Message content
 * @param {string} role - 'user', 'assistant', or 'error'
 */
function addMessage(content, role) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;
  
  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";
  contentDiv.innerHTML = `<p>${escapeHtml(content)}</p>`;
  
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show loading indicator
 * @returns {HTMLElement} The loading element
 */
function showLoading() {
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message assistant";
  loadingDiv.innerHTML = `
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  messagesContainer.appendChild(loadingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return loadingDiv;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Send a message to the LLM API
 * @param {string} message - User message
 */
async function sendMessage(message) {
  if (!message.trim()) return;

  // Add user message to chat
  addMessage(message, "user");
  
  // Clear input
  userInput.value = "";
  sendButton.disabled = true;

  // Show loading
  const loadingElement = showLoading();

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Answer questions clearly and concisely."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    // Remove loading indicator
    loadingElement.remove();

    // Get the response content
    const assistantMessage = response.choices[0].message.content;
    
    // Add assistant response to chat
    addMessage(assistantMessage, "assistant");

  } catch (error) {
    // Remove loading indicator
    loadingElement.remove();

    // Handle different error types gracefully
    let errorMessage = "Sorry, something went wrong. Please try again.";
    
    if (error.status === 429) {
      errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
    } else if (error.status === 401) {
      errorMessage = "Authentication error. Please check your API key.";
    } else if (error.status === 500) {
      errorMessage = "Server error. The AI service is temporarily unavailable.";
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }

    addMessage(errorMessage, "error");
    console.error("API Error:", error);
  }

  sendButton.disabled = false;
  userInput.focus();
}

// Event listeners
sendButton.addEventListener("click", () => {
  sendMessage(userInput.value);
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage(userInput.value);
  }
});

// Focus input on load
document.addEventListener("DOMContentLoaded", () => {
  userInput.focus();
});
