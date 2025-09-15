const chatbot = document.getElementById('chatbot');

const messages = [
  { question: 'hi', answer: 'Hello! How are you feeling today?' },
  { question: 'sad', answer: 'I\'m sorry you feel sad. Want to talk about it?' },
  { question: 'anxious', answer: 'Anxiety can be tough, but you\'re not alone.' },
  { question: 'help', answer: 'I\'m here for you. What\'s on your mind?' },
  { question: 'thanks', answer: 'You\'re welcome! Remember, you matter.' },
];

function addMessage(text, fromUser) {
  const msg = document.createElement('p');
  msg.textContent = (fromUser ? "You: " : "ShaktiSpace: ") + text;
  msg.style.background = fromUser ? '#d0f0fd' : '#e9f5ff';
  msg.style.padding = '5px 10px';
  msg.style.borderRadius = '10px';
  msg.style.margin = '10px';
  msg.style.maxWidth = '80%';
  msg.style.alignSelf = fromUser ? 'flex-end' : 'flex-start';
  chatbot.appendChild(msg);
  chatbot.scrollTop = chatbot.scrollHeight;
}

// Prompt user to enter input
function promptUser() {
  const input = prompt("Say something to ShaktiSpace:");
  if (!input) return;
  addMessage(input, true);
  const lowerInput = input.toLowerCase();
  const found = messages.find(m => lowerInput.includes(m.question));
  if (found) {
    setTimeout(() => addMessage(found.answer, false), 800);
  } else {
    setTimeout(() => addMessage("I'm here to listen. Tell me more.", false), 800);
  }
}

// Initial welcome message
addMessage("Hi! I'm ShaktiSpace. Let's chat whenever you want to share.", false);

// Add chat prompt button below chatbot box
const chatButton = document.createElement('button');
chatButton.textContent = 'Talk to ShaktiSpace';
chatButton.style.marginTop = '10px';
chatButton.onclick = promptUser;
document.body.appendChild(chatButton);
