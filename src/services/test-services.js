// Test file to verify our services work
import ConversationService from "./ConversationService.js";
import MessageService from "./MessageService.js";

// Test function
export async function testServices() {
  try {
    console.log("Testing ConversationService...");
    const conversations = await ConversationService.getConversations();
    console.log("Conversations:", conversations);

    console.log("Testing MessageService...");
    const messages = await MessageService.getMessages(1); // Replace 1 with actual conversation ID
    console.log("Messages:", messages);

    console.log("All services working!");
  } catch (error) {
    console.error("Service test failed:", error);
  }
}
