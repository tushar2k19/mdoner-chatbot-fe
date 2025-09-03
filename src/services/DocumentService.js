// DocumentService.js - Handle document-related operations
export default {
  // Get available documents (when implemented)
  async getDocuments() {
    try {
      const response = await this.$http.secured.get("/api/documents");
      return response.data;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  }
};
