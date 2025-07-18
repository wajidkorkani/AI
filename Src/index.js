// WARNING: Do NOT expose your API key directly in production client-side code.
// For demonstration purposes only. In a real application, use a backend server
// to interact with the API securely.
const API_KEY = "";

const sendIcon = document.querySelector(".send");
const loadingIcon = document.querySelector(".loading");
const responseBox = document.getElementById("response");
const promptInput = document.getElementById("prompt");
const submitButton = document.querySelector(".form button"); // Get the button element

/**
 * Toggles the visibility of the send icon and loading GIF.
 * @param {boolean} isLoading - True to show loading, false to show send icon.
 */
function setLoading(isLoading) {
    if (isLoading) {
        sendIcon.classList.add("hide");
        sendIcon.classList.remove("show"); // Ensure 'show' is removed if it was there
        loadingIcon.classList.remove("hide");
        loadingIcon.classList.add("show");
        submitButton.disabled = true; // Disable button while loading
    } else {
        loadingIcon.classList.add("hide");
        loadingIcon.classList.remove("show"); // Ensure 'show' is removed if it was there
        sendIcon.classList.remove("hide");
        sendIcon.classList.add("show");
        submitButton.disabled = false; // Enable button
    }
}

// Initialize the loading state (hide loading, show send)
setLoading(false);

let model; // Declare model outside to be accessible

// This block ensures the GoogleGenerativeAI library is loaded before we try to use it
document.addEventListener('DOMContentLoaded', async () => {
    // // Check if the API key is set
    if (API_KEY === "your api key") {
        responseBox.textContent = "⚠️ Please replace 'YOUR_API_KEY' in script.js with your actual API key.";
        setLoading(false); // Ensure loading is off
        submitButton.disabled = true; // Disable button
        return; // Stop further execution
    }

    try {
        // Access GoogleGenerativeAI from the global window object (loaded via CDN)
        const { GoogleGenerativeAI } = window;
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Use gemini-pro as gemini-2.0-flash might not be publicly available via API yet
        model = genAI.getGenerativeModel({ model: "gemini-pro" });
        responseBox.textContent = "Ready! Ask me anything.";
    } catch (error) {
        console.error("Failed to initialize GoogleGenerativeAI:", error);
        responseBox.textContent = "Error initializing AI. Please check your API key and network connection.";
        setLoading(false);
        submitButton.disabled = true;
    }
});


/**
 * Function to call the Google AI when the button is clicked.
 * This function is called by the `onclick="callGoogleAI()"` in your HTML.
 */
async function callGoogleAI() {
    const prompt = promptInput.value.trim();

    if (!prompt) {
        responseBox.textContent = "Please enter something to ask! 🤖";
        return;
    }

    setLoading(true); // Show loading spinner
    responseBox.textContent = "Thinking... 🤔"; // Provide immediate feedback

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        responseBox.textContent = text;
    } catch (error) {
        console.error("Error generating content:", error);
        responseBox.textContent = `Error: ${error.message}. Please try again or check your API key. 😔`;
    } finally {
        setLoading(false); // Hide loading spinner, show send button
    }
}

// Optional: Allow pressing Enter to submit the prompt
promptInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        callGoogleAI();
    }
});