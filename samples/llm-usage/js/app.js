/**
 * Session Evaluations Web App
 *
 * This script fetches and displays session evaluations with classification
 * labels (pills) in a modern UI.
 */

const llmUrl = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

// Import OpenAI from CDN
import OpenAI from "https://cdn.jsdelivr.net/npm/openai@4.98.0/+esm";
import { apiKey } from "./env.js"; // Import API key from env.js

const openai = new OpenAI({
  baseURL: llmUrl,
  apiKey,
  dangerouslyAllowBrowser: true,
});

/**
 * Format a date string into a human-readable format
 * @param {string} dateString - ISO date string
 * @return {string} Formatted date string
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

/**
 * Get the display name and CSS class for a category
 * @param {string} category - The category identifier
 * @return {Object} Object containing display name and CSS class
 */
function getCategoryInfo(category) {
  switch (category) {
    case "for-organizers":
      return { display: "For Organizers", cssClass: "pill-organizer" };
    case "for-speakers":
      return { display: "For Speakers", cssClass: "pill-speaker" };
    case "useless":
      return { display: "Useless", cssClass: "pill-useless" };
    default:
      return { display: "Unknown", cssClass: "" };
  }
}

/**
 * Creates HTML for an evaluation item
 * @param {Object} evaluation - The evaluation data
 * @return {string} HTML string for the evaluation
 */
function createEvaluationHTML(evaluation) {
  const categoryInfo = getCategoryInfo(evaluation.category);

  return `
    <div class="evaluation-item" data-id="${evaluation.id}">
      <p class="evaluation-content">${evaluation.feedback}</p>
      <div class="evaluation-meta">
        <span class="evaluation-pill ${categoryInfo.cssClass}">${
    categoryInfo.display
  }</span>
        <span class="evaluation-date">${formatDate(evaluation.date)}</span>
      </div>
    </div>
  `;
}

/**
 * Fetches evaluations from the API
 * @return {Promise<Array>} Promise resolving to array of evaluations
 */
async function fetchEvaluations() {
  const response = await fetch("http://api.ecs.eu/feedback");
  return await response.json();
}

/**
 * Renders the evaluations to the DOM
 * @param {Array} evaluations - Array of evaluation objects
 */
function renderEvaluations(evaluations) {
  const container = document.getElementById("evaluations-list");

  // Sort evaluations by date (newest first)
  const sortedEvaluations = [...evaluations].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Generate HTML for all evaluations
  const evaluationsHTML = sortedEvaluations
    .map((evaluation) => createEvaluationHTML(evaluation))
    .join("");

  // Update the DOM
  container.innerHTML = evaluationsHTML;
}

/**
 * Retrieves the category of feedback using AI
 * @param {string} feedbackText - The feedback text to categorize
 * @return {Promise<string>} Promise resolving to the category
 */
async function getEvaluationCategory(feedbackText) {
  const validCategories = ["for-organizers", "for-speakers", "useless"];
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Call OpenAI with model
      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: `Classify the following piece of feedback into one of the following categories: ${validCategories.join(
              ", "
            )}. Respond with the category name only. The feedback is:`,
          },
          {
            role: "user",
            content: feedbackText,
          },
        ],
      });

      // Extract the category from the response
      const category = response.choices[0].message.content.trim().toLowerCase();

      // Check if it's a valid category
      if (validCategories.includes(category)) {
        return category;
      }

      console.log(
        `Attempt ${attempt}: Invalid category response "${category}". Retrying...`
      );
    } catch (error) {
      // If we're on the last attempt, rethrow the error
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(
        `Attempt ${attempt} failed with error: ${error.message}. Retrying...`
      );
    }
  }

  // If we've exhausted all retries, return a default category
  console.warn("Failed to get a valid category after maximum retries");
  return "unknown"; // Default fallback category after all retries fail
}

/**
 * Analyzes feedback content using AI to categorize it
 * Shows a loading state and then reveals the pills after analysis is complete
 * @param {Array} evaluations - Array of evaluation objects
 */
async function analyzeFeedback(evaluations) {
  const button = document.getElementById("analyze-button");
  const evaluationsContainer = document.querySelector(".evaluations-container");

  // Disable button and show loading state
  button.disabled = true;
  button.innerHTML = 'Analyzing <span class="loader"></span>';

  // Show pills container immediately
  evaluationsContainer.classList.add("pills-visible");

  // Create a copy of evaluations to work with
  const evaluationsCopy = [...evaluations];

  // Counter to track progress
  let processedCount = 0;
  const totalCount = evaluations.length;

  try {
    // Process each evaluation with OpenAI API
    const processingPromises = evaluations.map(async (evaluation, index) => {
      try {
        // Get category for this evaluation
        evaluation.category = await getEvaluationCategory(evaluation.feedback);

        // Update the counter
        processedCount++;

        // Update the button text to show progress
        button.innerHTML = `Analyzing ${processedCount}/${totalCount} <span class="loader"></span>`;

        // Re-render all evaluations with currently available categories
        renderEvaluations(evaluationsCopy);

        return evaluation;
      } catch (error) {
        console.error(`Error processing evaluation #${index}:`, error);
        // Set default category for failed analyses
        evaluation.category = "unknown";
        return evaluation;
      }
    });

    // Wait for all processing to complete
    await Promise.all(processingPromises);

    // Final render (should be the same as the last incremental render)
    renderEvaluations(evaluationsCopy);

    // Log the analyzed evaluations for reference
    console.log("Analyzed evaluations:", evaluationsCopy);

    // Update button state
    button.innerHTML = "Analysis Complete";
    // Keep button disabled as analysis is done
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    button.innerHTML = "Analysis Failed";
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = "Retry Analysis";
    }, 2000);
  }
}

/**
 * Initializes the application
 */
async function initApp() {
  try {
    // Show loading state (could add a spinner here)
    const evaluations = await fetchEvaluations();
    renderEvaluations(evaluations);

    // Add event listener to analyze button
    const analyzeButton = document.getElementById("analyze-button");
    analyzeButton.addEventListener("click", () => analyzeFeedback(evaluations));
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    document.getElementById("evaluations-list").innerHTML = `
            <div class="evaluation-item error">
                <p>Failed to load evaluations. Please try again later.</p>
            </div>
        `;
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
