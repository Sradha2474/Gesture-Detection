document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const quickReplies = document.getElementById('quick-replies');
    const chatbotClose = document.getElementById('chatbot-close');
    
    // FAQ data
    const faqs = {
        "whatsapp": {
            "send photo": {
                steps: [
                    "1. Open WhatsApp and go to the chat where you want to send the photo",
                    "2. Tap the '+' or paperclip icon (Android) or the '+' icon (iPhone)",
                    "3. Select 'Gallery' or 'Photos'",
                    "4. Choose the photo you want to send",
                    "5. Tap the send button (arrow icon)"
                ],
                video: "https://www.youtube.com/embed/example1"
            },
            "create group": {
                steps: [
                    "1. Open WhatsApp and tap the three dots menu (Android) or 'Chats' tab (iPhone)",
                    "2. Select 'New group'",
                    "3. Select contacts to add to the group (minimum 2)",
                    "4. Tap the green arrow/checkmark",
                    "5. Enter a group name and tap 'Create'"
                ],
                video: "https://www.youtube.com/embed/example2"
            }
        },
        "paytm": {
            "send money": {
                steps: [
                    "1. Open Paytm app and login",
                    "2. Tap on 'Pay' or 'Bank Transfer'",
                    "3. Enter the mobile number or scan QR code",
                    "4. Enter the amount and add a note (optional)",
                    "5. Tap 'Proceed to Pay' and enter your UPI PIN"
                ],
                video: "https://www.youtube.com/embed/example3"
            },
            "recharge mobile": {
                steps: [
                    "1. Open Paytm app and login",
                    "2. Tap on 'Mobile Recharge'",
                    "3. Enter mobile number and select operator",
                    "4. Choose a recharge plan or enter custom amount",
                    "5. Tap 'Proceed to Recharge' and make payment"
                ],
                video: "https://www.youtube.com/embed/example4"
            }
        },
        "google maps": {
            "find directions": {
                steps: [
                    "1. Open Google Maps app",
                    "2. Tap the directions button (blue arrow in circle)",
                    "3. Enter your starting location or use 'Your location'",
                    "4. Enter your destination",
                    "5. Choose travel mode (car, public transport, walking, etc.)",
                    "6. Tap 'Start' to begin navigation"
                ],
                video: "https://www.youtube.com/embed/example5"
            },
            "save home address": {
                steps: [
                    "1. Open Google Maps app",
                    "2. Tap your profile picture in the top right",
                    "3. Select 'Settings' then 'Edit home or work'",
                    "4. Tap 'Home' and enter your address",
                    "5. Tap 'Save'"
                ],
                video: "https://www.youtube.com/embed/example6"
            }
        }
    };
    
    // Default quick replies
    const defaultQuickReplies = [
        "How to send photo on WhatsApp?",
        "How to create WhatsApp group?",
        "How to send money via Paytm?",
        "How to recharge mobile on Paytm?",
        "How to find directions on Google Maps?",
        "How to save home address in Google Maps?"
    ];
    
    // Greeting message
    setTimeout(() => {
        addBotMessage("Hello! I'm your Digital Literacy Assistant. How can I help you today?");
        showQuickReplies(defaultQuickReplies);
    }, 1000);
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            processUserMessage(message);
        }
    }
    
    // Add user message to chat
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add bot message to chat
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }
    
    // Show quick reply buttons
    function showQuickReplies(replies) {
        quickReplies.innerHTML = '';
        replies.forEach(reply => {
            const button = document.createElement('div');
            button.className = 'quick-reply';
            button.textContent = reply;
            button.addEventListener('click', () => {
                addUserMessage(reply);
                processUserMessage(reply);
            });
            quickReplies.appendChild(button);
        });
    }
    
    // Process user message and generate response
    function processUserMessage(message) {
        showTypingIndicator();
        
        // Simple delay to simulate processing
        setTimeout(() => {
            hideTypingIndicator();
            
            const lowerMessage = message.toLowerCase();
            let foundMatch = false;
            
            // Check for app mentions
            const apps = ['whatsapp', 'paytm', 'google maps'];
            const mentionedApp = apps.find(app => lowerMessage.includes(app));
            
            if (mentionedApp) {
                // Check for specific actions
                const appFaqs = faqs[mentionedApp.replace(' ', '')];
                for (const action in appFaqs) {
                    if (lowerMessage.includes(action)) {
                        foundMatch = true;
                        const tutorial = appFaqs[action];
                        addBotMessage(`Here's how to ${action} on ${mentionedApp}:`);
                        tutorial.steps.forEach(step => {
                            addBotMessage(step);
                        });
                        if (tutorial.video) {
                            addBotMessage(`Watch this video for more help: ${tutorial.video}`);
                        }
                        break;
                    }
                }
            }
            
            if (!foundMatch) {
                // General help response
                if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
                    addBotMessage("Hello! I can help you learn how to use WhatsApp, Paytm, and Google Maps. What would you like to know?");
                } else if (lowerMessage.includes('thank')) {
                    addBotMessage("You're welcome! Is there anything else I can help you with?");
                } else {
                    addBotMessage("I can help you with WhatsApp, Paytm, and Google Maps. Try asking something like:");
                    addBotMessage("- How to send a photo on WhatsApp?");
                    addBotMessage("- How to send money via Paytm?");
                    addBotMessage("- How to find directions on Google Maps?");
                }
            }
            
            // Show quick replies based on context
            if (mentionedApp) {
                const appQuickReplies = Object.keys(faqs[mentionedApp.replace(' ', '')]).map(
                    action => `How to ${action} on ${mentionedApp}?`
                );
                showQuickReplies(appQuickReplies);
            } else {
                showQuickReplies(defaultQuickReplies);
            }
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    chatbotClose.addEventListener('click', function() {
        document.getElementById('chatbot').style.display = 'none';
    });
});