const chatbot = document.getElementById('chatbot');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Predefined articles/stories URLs for redirection by keyword
const resources = {
  anxiety: "https://www.mentalhealth.org/anxiety-helpful-resources",
  depression: "https://www.mentalhealth.org/depression-guide",
  stress: "https://www.mentalhealth.org/stress-management",
  loneliness: "https://www.mentalhealth.org/combating-loneliness",
  stigma: "https://www.mentalhealth.org/ending-stigma",
};

// Friendly humor lines when bot doesn’t understand
const humorReplies = [
  "Hmm, I’m just a humble bot, but I’m learning every day! Can you try saying that differently?",
  "I’m all ears… or circuits? Let’s try again.",
  "I might need a coffee break 🤖☕, but tell me more!",
];

// Add a chat message to chat area with side alignment
function addMessage(text, fromUser) {
  const msg = document.createElement('div');
  msg.className = 'message ' + (fromUser ? 'user-message' : 'bot-message');
  msg.textContent = text;
  chatbot.appendChild(msg);
  chatbot.scrollTop = chatbot.scrollHeight;
}

// Redirect user to article with friendly bot message
function redirectUser(topic) {
  const url = resources[topic];
  addMessage(`I found some helpful information on ${topic}. You can check it out here:`, false);
  const link = document.createElement('a');
  link.href = url;
  link.target = "_blank";
  link.className = 'resource-link';
  link.textContent = `${topic.charAt(0).toUpperCase() + topic.slice(1)} Resources`;
  chatbot.appendChild(link);
  chatbot.scrollTop = chatbot.scrollHeight;
}

// Bot response logic with humor and redirection
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();

  // Redirect if recognized topic keywords
  for (const key in resources) {
    if (lowerInput.includes(key))
      return { type: 'redirect', topic: key };
  }

  // Simple Q&A with humor
  if (lowerInput.includes('hi') || lowerInput.includes('hello'))
    return { type: 'text', text: 'Hello! Ready to chat and share your thoughts?' };
  if (lowerInput.includes('how are you'))
    return { type: 'text', text: 'Thanks for asking! My circuits are buzzing fine 🤖' };
  if (lowerInput.includes('joke'))
    return { type: 'text', text: 'Why did the computer go to therapy? Because it had too many bytes of anxiety!' };
  if (lowerInput.includes('help'))
    return { type: 'text', text: 'I’m here to listen and support. What’s on your mind?' };

  // Default humorous reply if nothing else matches
  const randomHumor = humorReplies[Math.floor(Math.random() * humorReplies.length)];
  return { type: 'text', text: randomHumor };
}

// Send message handler
function sendMessage() {
  const input = userInput.value.trim();
  if (input === '') return; 
  addMessage(input, true); // user message
  userInput.value = '';
  
  const response = getBotResponse(input);

  setTimeout(() => {
    if (response.type === 'redirect') {
      redirectUser(response.topic);
    } else {
      addMessage(response.text, false);
    }
  }, 800);
}

// Initial greeting from bot
addMessage("Hi! I'm ShaktiSpace 🤖 — chat with me or type your mental wellness concerns.", false);

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});
