// Run this in your terminal: node check-models.js
const API_KEY = "AIzaSyA-CSrybaoKEgF2jXVegXHtiQPccAjuYQQ"; // Paste your actual key here temporarily

async function check() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("=== YOUR AVAILABLE MODELS ===");
    if (data.models) {
      data.models.forEach((m) => {
        // Only show models that can generate text
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(m.name.replace("models/", ""));
        }
      });
    } else {
      console.error("Error:", data);
    }
  } catch (e) {
    console.error(e);
  }
}

check();
