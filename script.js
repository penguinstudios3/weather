import { GoogleGenerativeAI } from "@google/generative-ai";

// ⛔ REPLACE with your actual Gemini API Key
const GEMINI_API_KEY = AIzaSyAd4mSn5pfywBp8W-O8ZnJtUkEjm644bOE;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleUserMessage(input) {
  appendMessage(input, "user");

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(
      `You are a weather assistant. Someone asked: "${input}". Respond with current weather info or forecast based on the city mentioned, and sound friendly.`
    );

    const response = result.response.text();
    appendMessage(response, "bot");
  } catch (error) {
    console.error(error);
    appendMessage("❌ Oops! Something went wrong. Try again later.", "bot");
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (input) {
    handleUserMessage(input);
    userInput.value = "";
  }
});
