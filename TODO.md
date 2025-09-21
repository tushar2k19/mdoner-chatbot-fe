# DPR Chatbot Project - TODO

## Project Overview
A prototype chatbot that answers questions from 5 DPR PDF documents. If no relevant answer is found, asks for consent to search the internet and returns responses with citations.

**Tech Stack:** Vue.js 2 (frontend), Ruby on Rails (backend), MySQL, OpenAI Assistants API

## Document Details (current prototype: 5 docs)
- **Nagaland_Innovation_Hub.pdf:** DPR for Nagaland Innovation Hub
- **Mizoram_Development_of_Helipads.pdf:** DPR for Mizoram Helipads development
- **Assam_Road_Project.pdf:** DPR for Assam Road Project
- **Khankawn_Rongura_Road_Project.pdf:** DPR for Khankawn Rongura Road Project
- **Coffee_Development_Nagaland.pdf:** DPR for Coffee Development Nagaland

Note: We currently ingest 5 DPR PDFs. More can be added later without changing schemas.

## Architecture

### Frontend (Vue.js 2) ✅
- Document selection dropdown (5 PDFs)
- Chat interface (messages, streaming, loading states)
- Session list sidebar (past conversations)
- Consent prompt for web search
- Document citation chips under assistant replies (shows selected document)
- Basic admin upload screen (optional)
- **NEW: Checklist Analyzer component with world-class UI**
- **NEW: Markdown rendering with tables and structured formatting**

### Backend (Rails API) ✅
- Authentication (JWT-based)
- OpenAI integration (Assistants API, Vector Store)
- S3 integration for PDF storage and viewing (LOWER PRIORITY)
- External search integration (Tavily/Perplexity)
- MySQL database for users, conversations, messages
- **NEW: Checklist analysis API endpoints**
- **NEW: Document mapper service for OpenAI file ID management**

### OpenAI Setup (Completed)
- ✅ One Assistant with `file_search` tool
- ✅ Vector Store containing the 5 DPR PDFs (auto-created)
- ✅ Threads for conversation management
- ✅ Strict JSON responses (document citations only; no URLs)
- ✅ If no DPR answer: set `needs_consent = true`; frontend asks for web search consent
- ✅ Model: gpt-4o-mini with temperature 0.1
- ✅ JSON response format with answer, citations, needs_consent, message fields
- **NEW: Enhanced instructions for structured markdown responses with tables**
- **NEW: Function calling support for checklist analysis**

## Step-by-Step Implementation Plan

### Phase 1: Setup & Infrastructure
- [✅] **1.1** Set up Rails API project with MySQL
- [✅] **1.2** Set up Vue.js 2 frontend project
- [✅] **1.3** Configure authentication (JWT)
- [✅] **1.4** Set up OpenAI API integration
- [✅] **1.5** Create database schema (users, conversations, messages, files)
- [✅] **1.6** Create comprehensive system design documentation
- [✅] **1.7** Create detailed API documentation
- [✅] **1.8** Create database schema documentation

### Phase 2: Document Processing & OpenAI Setup
- [✅] **2.1**  Create OpenAI Assistant with proper instructions
  - [✅] **2.1.1** Configure assistant with JSON response format
  - [✅] **2.1.2** Set up file_search tool
  - [✅] **2.1.3** Configure model (gpt-4o-mini) and temperature (0.1)
- [✅] **2.2** ✅Upload all 5 DPR PDFs to OpenAI Files
- [✅] **2.3**  Create OpenAI Vector Store (auto-created when files added)
- [✅] **2.4**  Add PDFs to Vector Store (completed automatically)
- [✅] **2.5**  Test assistant with sample queries
- [✅] **2.6**  Verify JSON response format and citation handling
- [✅] **2.7**  Document S3-based storage approach (no OCR needed)
- [✅] **2.8** **NEW: Enhanced OpenAI instructions for structured responses**
  - [✅] **2.8.1** Added mandatory markdown formatting requirements
  - [✅] **2.8.2** Implemented structured response templates
  - [✅] **2.8.3** Added table generation requirements
  - [✅] **2.8.4** Increased response length to 300-400 words minimum

### Phase 3: Core Chatbot (HIGH PRIORITY)
- [✅] **3.1** Create conversation system (no document selection needed)
  - [✅] **3.1.1** Create OpenAI Thread with access to all documents
  - [✅] **3.1.2** Store conversation metadata in database
- [✅] **3.2** Build message handling (LLM searches all documents automatically)
  - [✅] **3.2.1** Implement OpenAI service with proper error handling
  - [✅] **3.2.2** Handle LLM clarification requests for specific documents
  - [✅] **3.2.3** Implement automatic document relevance detection
- [✅] **3.3** Extract and display document citations
  - [✅] **3.3.1** Parse OpenAI response annotations
  - [✅] **3.3.2** Map file_ids to document names
  - [✅] **3.3.3** Display citation chips under responses
- [✅] **3.4** Implement conversation history persistence
- [✅] **3.5** Add session management (list, load, delete conversations)
- [✅] **3.6** Add LLM clarification handling for document-specific queries
- [✅] **3.7** Prepend prior web summary: when sending a query, if previous message `source === "web"`, include a 1–2 line summary of that web answer in the assistant request (for context continuity without contaminating DPR-only guardrails).
- [✅] **3.8** Create comprehensive models with relationships and validations
  - [✅] **3.8.1** User model with authentication helpers and statistics
  - [✅] **3.8.2** Document model with S3 integration and status management
  - [✅] **3.8.3** Conversation model with OpenAI thread integration
  - [✅] **3.8.4** Message model with JSON content parsing and citation handling
- [✅] **3.9** Create comprehensive controller skeletons with implementation guide
  - [✅] **3.9.1** ConversationsController with chat flow and streaming
  - [✅] **3.9.2** MessagesController with pagination and citation handling
  - [✅] **3.9.3** DocumentsController with S3 integration and admin functions
  - [✅] **3.9.4** ExternalSearchController for web search fallback

### Phase 4: Streaming Implementation (CRITICAL )
- [ ] **4.1** Implement streaming responses from OpenAI
  - [ ] **4.1.1** Set up Server-Sent Events (SSE) or WebSocket connection
  - [ ] **4.1.2** Handle streaming JSON responses from OpenAI
  - [ ] **4.1.3** Display streaming text in real-time
  - [ ] **4.1.4** Handle streaming errors and timeouts
- [ ] **4.2** Optimize streaming performance
  - [ ] **4.2.1** Implement proper buffering and chunking
  - [ ] **4.2.2** Handle connection drops and reconnection
  - [ ] **4.2.3** Add loading states during streaming

### Phase 5: Frontend UI (HIGH PRIORITY)
- [✅] **5.1** Build chat interface (messages, streaming)
  - [✅] **5.1.1** Create message components (user/assistant)
  - [✅] **5.1.2** Implement streaming text display
  - [✅] **5.1.3** Add typing indicators and loading states
  - [✅] **5.1.4** **NEW: Implement markdown rendering with tables**
- [✅] **5.2** Create session list sidebar
  - [✅] **5.2.1** Display conversation history
  - [✅] **5.2.2** Add new conversation button
  - [✅] **5.2.3** Implement conversation switching
- [✅] **5.3** Add consent modal for web search
  - [✅] **5.3.1** Create modal component
  - [✅] **5.3.2** Handle user consent flow
- [✅] **5.4** Display document citations as chips
  - [✅] **5.4.1** Create citation chip components
  - [✅] **5.4.2** Style citation display
- [✅] **5.5** Add loading states and error handling
  - [✅] **5.5.1** Global loading indicators
  - [✅] **5.5.2** Error message display
  - [✅] **5.5.3** Retry mechanisms
- [✅] **5.6** **NEW: Implement Checklist Analyzer feature**
  - [✅] **5.6.1** Create ChecklistAnalyzer.vue component
  - [✅] **5.6.2** Implement world-class UI with dark/light theme
  - [✅] **5.6.3** Add document selection and checklist management
  - [✅] **5.6.4** Implement color-coded results table
  - [✅] **5.6.5** Add responsive design and modern styling
- [✅] **5.7** **NEW: Implement 404 Error Handling**
  - [✅] **5.7.1** Create NotFound.vue component with world-class design
  - [✅] **5.7.2** Implement charcoal black theme matching dashboard
  - [✅] **5.7.3** Add 3D animations and modern visual effects
  - [✅] **5.7.4** Implement authentication-aware redirect logic
  - [✅] **5.7.5** Update router configuration with catch-all route
  - [✅] **5.7.6** Ensure theme consistency across all components

### Phase 6: External Search (fallback)
- [ ] **6.1** Implement consent prompt when no document match found
- [ ] **6.2** Integrate external search provider (Tavily/Perplexity)
- [ ] **6.3** Display web search results with source URLs
- [ ] **6.4** Log external search usage
- [ ] **6.5** Mark web answers as `source = "web"` in `messages`; DPR answers as `source = "dpr"`
- [ ] **6.6** Remember, we need to pass the gist of this message with the next prompt

### Phase 7: PDF Viewer & AWS S3 (LOWER PRIORITY - After chatbot is working)
- [ ] **7.1** Set up AWS S3 integration
  - [ ] **7.1.1** Configure AWS SDK
  - [ ] **7.1.2** Create S3 bucket and permissions
  - [ ] **7.1.3** Upload existing PDFs to S3
- [ ] **7.2** Implement PDF viewer
  - [ ] **7.2.1** Create PDF viewer component
  - [ ] **7.2.2** Handle PDF loading from S3
  - [ ] **7.2.3** Add page navigation
- [ ] **7.3** Connect citations to PDF viewer
  - [ ] **7.3.1** Make citation chips clickable
  - [ ] **7.3.2** Open PDF viewer on citation click
  - [ ] **7.3.3** Navigate to relevant page (if possible)

### Phase 8: Admin & Polish
- [ ] **8.1** Create admin file upload interface (optional)
- [ ] **8.2** Add rate limiting and monitoring
- [ ] **8.3** Implement basic analytics
- [ ] **8.4** Add error handling and logging
- [ ] **8.5** Deploy prototype

## API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login` 
- `POST /api/auth/logout`

### Conversations
- `POST /api/conversations` - Create new conversation with selected document(s)
- `GET /api/conversations` - List user conversations
- `GET /api/conversations/:id/messages` - Get conversation messages
- `POST /api/conversations/:id/messages` - Send message (scoped to selected document(s))
- `POST /api/conversations/:id/allow_web_search` - Consent to web search
- `GET /api/documents` - List available documents for selection
- `PUT /api/conversations/:id/documents` - Update selected documents for conversation

### Documents
- `GET /api/documents/:id/pdf` - Get pre-signed S3 URL for PDF viewing (LOWER PRIORITY)

### Admin
- `POST /api/admin/files` - Upload PDFs

### **NEW: Checklist Analysis**
- `GET /api/checklist/defaults` - Get default checklist items
- `POST /api/checklist/analyze` - Analyze documents against checklist items

## Database Schema (MySQL)

### Tables
- `users` (id, email, password_digest, created_at)

- `conversations` (id, user_id, title, openai_thread_id, created_at, updated_at)

- `messages` (id, conversation_id, role, content, source, created_at)
  - `content`: For user messages = plain text; For assistant messages = JSON string with answer, citations, needs_consent, message
  - `source`: ENUM('dpr','web') DEFAULT 'dpr'

- `documents` (id, name, original_filename, s3_key, s3_bucket, s3_region, file_size, mime_type, status, created_at)

<!-- - `external_search_logs` (id, conversation_id, provider, query, results_json, created_at) -->

### Message Content JSON Structure (for assistant messages)
```json
{
  "answer": "The actual response text from the assistant",
  "citations": ["Document1.pdf", "Document2.pdf"],  -- Array of document names only
  "needs_consent": false,                          -- true if web search consent needed
  "message": "Result not found, do you wish to search the internet?"  -- Only when needs_consent is true
}
```

## Environment Variables
```
OPENAI_API_KEY=
OPENAI_ASSISTANT_ID=
OPENAI_VECTOR_STORE_ID=
OPENAI_MODEL=gpt-4o-mini
SEARCH_PROVIDER=tavily
TAVILY_API_KEY=
MYSQL_URL=
JWT_SECRET=
AWS_ACCESS_KEY_ID=        # LOWER PRIORITY
AWS_SECRET_ACCESS_KEY=    # LOWER PRIORITY
AWS_REGION=              # LOWER PRIORITY
S3_BUCKET_NAME=          # LOWER PRIORITY
```

## Cost Estimates

### OpenAI (per 100 chat turns)
- gpt-4o-mini: ~$0.15
- gpt-4o: ~$0.30

### S3 Storage (monthly) - LOWER PRIORITY
- 5 PDFs (~100MB total): ~$0.023
- Data transfer: ~$0.09 per GB

## Why Store PDFs in S3/Cloud Storage? (LOWER PRIORITY)

1. **Original Source Preservation**: Keep unaltered PDFs for auditing, debugging, or re-processing
2. **PDF Viewing**: Enable users to click citations and view original PDFs
3. **Backup & Reliability**: High durability and availability for critical documents
4. **Scalability**: Handle large files without server storage limitations
5. **Separation of Concerns**: Keep binary files separate from application database
6. **Admin Operations**: Easy file management, re-upload, or replacement

## Current Status
- [x] Project planning and architecture finalized
- [x] OpenAI Assistant created and configured
- [x] All 5 DPR PDFs uploaded to OpenAI
- [x] Vector store automatically created
- [x] JSON response format tested and working
- [x] System design documentation completed
- [x] API documentation completed
- [x] Database schema documentation completed
- [x] **NEW: Core chatbot functionality implemented**
- [x] **NEW: Checklist analysis feature completed**
- [x] **NEW: Enhanced OpenAI instructions for structured responses**
- [x] **NEW: Markdown rendering with tables implemented**
- [x] **NEW: World-class UI for checklist analyzer**
- [x] **NEW: 404 error handling with world-class design**
- [x] **NEW: 5th document (Coffee Development Nagaland) integration**
- [x] **NEW: Theme consistency across all components**

## Progress Log
- 2025-08-22: Implemented baseline JWT Signin
  - Added `User` model with `has_secure_password` and migration
  - Created `POST /signin` returning `{ access, csrf, user }`
  - Removed cookie/CSRF usage on frontend; store `jwt_access` in localStorage
  - Router guard checks presence of `jwt_access`; added `/login` route
  - Axios uses `Authorization: Bearer <token>` only; `withCredentials` disabled
  - Created dummy user for testing (`demo@example.com` / `password123`)

- 2025-01-XX: OpenAI Assistant Setup (Completed)
  - Created OpenAI Assistant with gpt-4o-mini model
  - Configured temperature to 0.1 for consistent responses
  - Set up file_search tool for document retrieval
  - Uploaded all 5 DPR PDFs to OpenAI Files
  - Vector store automatically created when files were added
  - Tested JSON response format with sample queries
  - Verified citation handling and consent flow

- 2025-01-XX: Documentation Updates (Completed)
  - Updated SYSTEM_DESIGN.md with correct database schema
  - Updated API_DOCUMENTATION.md with proper JSON response format
  - Created backend/database_schema.md for intern implementation
  - Fixed discrepancies between documentation and actual assistant responses
  - Updated TODO.md to reflect current progress and correct priorities

- **2025-01-XX: Core Chatbot Implementation (Completed)**
  - Implemented complete chat interface with Vue.js 2
  - Created Dashboard.vue with sidebar, conversation management, and chat area
  - Implemented Chat.vue with message handling, citations, and consent flow
  - Added authentication integration and user session management
  - Implemented OpenAI service integration with proper error handling
  - Added document citation display and management
  - Created responsive design with dark/light theme support

- **2025-01-XX: Checklist Analysis Feature (Completed)**
  - Created comprehensive ChecklistAnalyzer.vue component
  - Implemented backend API endpoints for checklist analysis
  - Added OpenAI function calling for structured checklist responses
  - Created document mapper service for file ID management
  - Implemented world-class UI with color-coded results table
  - Added dark/light theme support and responsive design
  - Integrated with existing authentication and document system

- **2025-01-XX: OpenAI Instructions Enhancement (Completed)**
  - Updated OpenAI assistant instructions for structured responses
  - Added mandatory markdown formatting requirements
  - Implemented structured response templates with sections
  - Added table generation requirements for data presentation
  - Increased response length to 300-400 words minimum
  - Enhanced formatting with headings, subheadings, and bullet points

- **2025-01-XX: Markdown Rendering Implementation (Completed)**
  - Integrated marked.js library for markdown rendering
  - Implemented custom table rendering with proper spacing
  - Added dark theme support for markdown content
  - Created comprehensive CSS styling for tables and content
  - Fixed compatibility issues with webpack 3 and marked.js 4.3.0
  - Added debugging and testing capabilities for markdown rendering

- **2025-01-XX: 404 Error Handling Implementation (Completed)**
  - Created world-class NotFound.vue component with modern AI chatbot design
  - Implemented charcoal black theme matching dashboard design
  - Added 3D animations, floating geometric shapes, and neural network patterns
  - Integrated authentication-aware redirect logic (home vs signin based on auth status)
  - Updated router configuration with catch-all route for unmatched URLs
  - Added comprehensive error handling and user-friendly messaging
  - Ensured visual consistency across all components

- **2025-01-XX: 5th Document Integration (Completed)**
  - Added "Coffee Development Nagaland.pdf" to document mapper service
  - Updated all frontend components to include the new document
  - Updated backend controllers to handle the 5th document
  - Updated all documentation references from 4 to 5 documents
  - Ensured consistent naming and file ID mapping across the system
  - Verified integration with OpenAI assistant and vector store

- **2025-01-XX: Theme Consistency Updates (Completed)**
  - Fixed 404 page to use charcoal black theme instead of blue
  - Updated all color schemes to match dashboard design
  - Ensured visual consistency across NotFound, Dashboard, and other components
  - Implemented proper dark/light theme support throughout the application

## Notes
- Document-level citations only (no page numbers required)
- English language only
- Authentication required
- Prototype focus (scalability secondary)
- Automatic document search: LLM searches all documents based on user queries
- LLM can ask for clarification if query is ambiguous or document-specific
- Assistant answers only from DPRs; if not found, returns `needs_consent: true`
- Web answers (after consent) are kept separate from the OpenAI thread and marked `source = web`
- When sending a new query, if the previous message has `source = web`, include a 1–2 line summary in the assistant request.
- **HIGH PRIORITY**: Streaming implementation and external search integration
- **LOWER PRIORITY**: S3 integration and PDF viewer (to be done after core chatbot is working)
- **COMPLETED**: Core chatbot functionality, checklist analysis, markdown rendering, and enhanced UI
- Streaming is a critical task that needs special attention as it's never been implemented before