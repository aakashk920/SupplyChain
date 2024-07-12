import { LightningElement, track } from 'lwc';

export default class AiChatbot extends LightningElement {
    @track userMessage = '';
    @track messages = [];

    // Your Story ID
    storyId = '66827369950e15000776edca';
    // Your developer access token
    apiKey = 'LRUCzipPYJi1ypd0md6ZetU_z4oe7pRZ';

    handleMessageChange(event) {
        this.userMessage = event.target.value;
    }

    async handleSendMessage() {
        if (this.userMessage.trim() === '') {
            return;
        }

        // Add the user's message to the conversation
        this.messages = [...this.messages, { id: Date.now(), text: this.userMessage, type: 'user-message' }];

        // Call the AI service and get the response
        const response = await this.getAIResponse(this.userMessage);

        // Add the AI's response to the conversation
        this.messages = [...this.messages, { id: Date.now() + 1, text: response, type: 'ai-message' }];

        // Clear the input field
        this.userMessage = '';
    }

    async getAIResponse(message) {
        const apiUrl = `https://api.chatbot.com/v2/stories/${this.storyId}/message`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('API Response:', data); // Log the response for debugging

            // Extract the reply from the response data
            return data.reply || 'Sorry, I did not understand that.';

        } catch (error) {
            console.error('Error fetching AI response:', error);
            return 'Sorry, there was an error.';
        }
    }
}
