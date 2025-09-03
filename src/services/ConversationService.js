// ConversationService.js - Handle all conversation-related API calls
export default {
  // Get all conversations for the current user
  async getConversations() {
    try {
      const response = await this.$http.secured.get("/api/conversations");
      return response.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },

  // Create a new conversation
  async createConversation(title = "New Conversation") {
    try {
      const response = await this.$http.secured.post("/api/conversations", {
        title: title
      });
      return response.data;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  },

  // Delete a conversation
  async deleteConversation(conversationId) {
    try {
      const response = await this.$http.secured.delete(
        `/api/conversations/${conversationId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting conversation:", error);
      throw error;
    }
  }
};
