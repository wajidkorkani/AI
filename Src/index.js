const send = document.querySelector(".send");
const loading = document.querySelector(".loading");
const responseBox = document.getElementById("response");
const promptInput = document.getElementById("prompt");

function setLoading(isLoading) {
  if (isLoading) {
    send.classList.add("hide");
    send.classList.remove("show");
    loading.classList.remove("hide");
    loading.classList.add("show");
  } else {
    loading.classList.add("hide");
    loading.classList.remove("show");
    send.classList.remove("hide");
    send.classList.add("show");
  }
}

setLoading(false)

async function callGoogleAI() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    responseBox.innerText = "Please enter a question.";
    return;
  }

  setLoading(true); // Show loader

  const apiKey = "AIzaSyDsq-zKDF_C4W3uKzbn-5NlkYVAOuk9qdU"; // ⚠️ Do NOT expose in production
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      responseBox.innerText = "⚠️ Error from API.";
      return;
    }

    const data = await response.json();
    console.log("API Response:", data);

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No valid response.";
    responseBox.innerText = result;
    document.querySelector("h1").classList.add("hide");
  } catch (err) {
    console.error("Fetch failed:", err);
    responseBox.innerText = "⚠️ Something went wrong.";
  } finally {
    setLoading(false); // Hide loader
    promptInput.value = ""; // Optional: Clear input after response
  }
}
