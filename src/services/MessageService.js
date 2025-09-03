// MessageService.js - Handle all message-related API calls
export default {
  // Get messages for a specific conversation
  async getMessages(conversationId, beforeId = null) {
    try {
      let url = `/api/conversations/${conversationId}/messages`;
      if (beforeId) {
        url += `?before_id=${beforeId}`;
      }

      const response = await this.$http.secured.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  // Send a message to a conversation
  async sendMessage(conversationId, content) {
    try {
      const response = await this.$http.secured.post(
        `/api/conversations/${conversationId}/messages`,
        {
          content: content
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
};
