# DPR Chatbot - API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Backend APIs](#backend-apis)
4. [OpenAI APIs](#openai-apis)
5. [External APIs](#external-apis)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Testing](#testing)

---

## Overview

This document provides comprehensive API documentation for the DPR Chatbot system, including:
- **Backend APIs**: Our Rails API endpoints
- **OpenAI APIs**: OpenAI Assistants API integration
- **External APIs**: Third-party search services
- **Request/Response Formats**: Detailed specifications
- **Implementation Notes**: Technical details for developers

### Base URLs
- **Backend API**: `http://localhost:3000/api` (development)
- **OpenAI API**: `https://api.openai.com/v1`
- **Tavily API**: `https://api.tavily.com`

### Common Headers
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>  # For backend APIs
Authorization: Bearer <openai_api_key>  # For OpenAI APIs
```

---

## Authentication

### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "user_id": 123,
    "email": "user@example.com",
    "exp": 1640995200,
    "iat": 1640908800
  }
}
```

### Token Expiration
- **Access Token**: 24 hours
- **Refresh Token**: 7 days (if implemented)

---

## Backend APIs

### 1. Authentication Endpoints

#### 1.1 User Registration
```http
POST /api/auth/signup
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": 123,
    "email": "user@example.com",
    "created_at": "2024-01-01T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "message": "User registered successfully"
}
```

**Error Response (422 Unprocessable Entity):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["has already been taken"],
      "password": ["is too short (minimum is 6 characters)"]
    }
  }
}
```

#### 1.2 User Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 123,
    "email": "user@example.com",
    "created_at": "2024-01-01T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "message": "Login successful"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

#### 1.3 User Logout
```http
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

#### 1.4 Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 123,
    "email": "user@example.com",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

### 2. Document Management

#### 2.1 Get Available Documents
```http
GET /api/documents
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "documents": [
    {
      "id": 1,
      "name": "Manipur DPR",
      "original_filename": "manipur_dpr.pdf",
      "pages": 120,
      "type": "text",
      "status": "available",
      "file_size": 5242880,
      "created_at": "2024-01-01T10:00:00Z"
    },
    {
      "id": 2,
      "name": "Meghalaya DPR",
      "original_filename": "meghalaya_dpr.pdf",
      "pages": 80,
      "type": "ocr",
      "status": "available",
      "file_size": 3145728,
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### 2.2 Upload Documents (Admin Only)
```http
POST /api/admin/files
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
```form-data
files: [file1.pdf, file2.pdf, file3.pdf]
```

**Response (201 Created):**
```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "id": 1,
      "name": "Manipur DPR",
      "status": "processing",
      "openai_file_id": "file-abc123"
    }
  ],
  "processing_jobs": [
    {
      "file_id": 1,
      "job_id": "job_xyz789",
      "status": "queued"
    }
  ]
}
```

### 3. Conversation Management

#### 3.1 Create New Conversation
```http
POST /api/conversations
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "DPR Project Discussion"
}
```

**Response (201 Created):**
```json
{
  "conversation": {
    "id": 1,
    "title": "DPR Project Discussion",
    "user_id": 123,
    "openai_thread_id": "thread_abc123",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
}
```

#### 3.2 Get User Conversations
```http
GET /api/conversations
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `limit` (optional): Number of conversations to return (default: 20)
- `before_id` (optional): Load conversations before this conversation ID (for infinite scroll)

**Response (200 OK):**
```json
{
  "conversations": [
    {
      "id": 1,
      "title": "DPR Project Discussion",
      "message_count": 5,
      "created_at": "2024-01-01T10:00:00Z",
      "last_message_at": "2024-01-01T10:30:00Z"
    }
  ],
  "has_more": true,
  "oldest_conversation_id": 1
}
```

#### 3.3 Get Conversation Messages
```http
GET /api/conversations/:id/messages
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `limit` (optional): Number of messages to return (default: 50)
- `before_id` (optional): Load messages before this message ID (for infinite scroll)
- `after_id` (optional): Load messages after this message ID (for real-time updates)

**Response (200 OK):**
```json
{
  "messages": [
    {
      "id": 1,
      "role": "user",
      "content": "What are the project timelines?",
      "citations": null,
      "created_at": "2024-01-01T10:00:00Z"
    },
    {
      "id": 2,
      "role": "assistant",
      "content": "Based on the Manipur DPR, the project timeline shows Phase 1 starting in Q1 2024...",
      "citations": [
        {
          "type": "pdf",
          "document": "Manipur DPR"
        }
      ],
      "created_at": "2024-01-01T10:00:30Z"
    }
  ],
  "has_more": true,
  "oldest_message_id": 1,
  "newest_message_id": 2
}
```

#### 3.4 Send Message
```http
POST /api/conversations/:id/messages
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "content": "What are the project timelines?"
}
```

**Response (200 OK):**
```json
{
  "message": {
    "id": 3,
    "role": "assistant",
    "content": "Based on the Manipur DPR, the project timeline shows Phase 1 starting in Q1 2024...",
    "citations": [
      {
        "type": "pdf",
        "document": "Manipur DPR"
      }
    ],
    "created_at": "2024-01-01T10:01:00Z"
  },
  "streaming": false
}
```

**Streaming Response (200 OK):**
```json
{
  "message": {
    "id": 3,
    "role": "assistant",
    "content": "Based on the Manipur DPR...",
    "citations": [
      {
        "type": "pdf",
        "document": "Manipur DPR"
      }
    ],
    "created_at": "2024-01-01T10:01:00Z"
  },
  "streaming": true,
  "stream_id": "stream_xyz789"
}
```

# Note: Document selection is handled automatically by the LLM based on user queries
# No manual document selection endpoints needed

#### 3.6 Delete Conversation
```http
DELETE /api/conversations/:id
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Conversation deleted successfully"
}
```

### 4. External Search

#### 4.1 Allow Web Search
```http
POST /api/conversations/:id/allow_web_search
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "allow": true,
  "query": "What are the latest developments in renewable energy?",
  "include_context": true,
  "context_window": 5
}
```

**Response (200 OK):**
```json
{
  "message": {
    "id": 4,
    "role": "assistant",
    "content": "Based on recent web search results and considering your work with Manipur and Meghalaya DPR projects, where you've been discussing project timelines and Phase 1 starting in Q1 2024, here's what I found about renewable energy developments...",
    "citations": [
      {
        "type": "url",
        "url": "https://example.com/article1",
        "title": "Latest Renewable Energy Trends"
      },
      {
        "type": "url",
        "url": "https://example.com/article2",
        "title": "Solar Energy Breakthroughs"
      }
    ],
    "created_at": "2024-01-01T10:35:00Z"
  },
  "search_context": {
    "conversation_id": 123,
    "context_messages": 5,
    "selected_documents": ["Manipur DPR", "Meghalaya DPR"],
    "conversation_summary": "Project timelines, Phase 1 Q1 2024, renewable energy costs"
  }
}
```

### 5. System Status

#### 5.1 Health Check
```http
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T10:00:00Z",
  "services": {
    "database": "connected",
    "openai": "connected",
    "redis": "connected"
  }
}
```

---

## OpenAI APIs

### 1. Assistants API

#### 1.1 Create Assistant
```http
POST https://api.openai.com/v1/assistants
Authorization: Bearer <openai_api_key>
```

**Request Body:**
```json
{
  "name": "DPR Chatbot Assistant",
  "instructions": "You are a document assistant for DPR (Detailed Project Report) documents. Answer ONLY from the provided documents. If information is not found, ask for web search consent. Always cite source documents.",
  "tools": [
    {
      "type": "file_search"
    }
  ],
  "model": "gpt-5-mini"
}
```

**Response (201 Created):**
```json
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1640995200,
  "name": "DPR Chatbot Assistant",
  "description": null,
  "model": "gpt-5-mini",
  "instructions": "You are a document assistant...",
  "tools": [
    {
      "type": "file_search"
    }
  ],
  "file_ids": [],
  "metadata": {}
}
```

#### 1.2 Create Thread
```http
POST https://api.openai.com/v1/threads
Authorization: Bearer <openai_api_key>
```

**Request Body:**
```json
{
  "messages": []
}
```

**Response (201 Created):**
```json
{
  "id": "thread_abc123",
  "object": "thread",
  "created_at": 1640995200,
  "metadata": {}
}
```

#### 1.3 Add Message to Thread
```http
POST https://api.openai.com/v1/threads/{thread_id}/messages
Authorization: Bearer <openai_api_key>
```

**Request Body:**
```json
{
  "role": "user",
  "content": "What are the project timelines?",
  "file_ids": ["file-abc123", "file-def456"]
}
```

**Response (201 Created):**
```json
{
  "id": "msg_abc123",
  "object": "message",
  "created_at": 1640995200,
  "thread_id": "thread_abc123",
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": {
        "value": "What are the project timelines?",
        "annotations": []
      }
    }
  ],
  "file_ids": ["file-abc123", "file-def456"],
  "assistant_id": null,
  "run_id": null,
  "metadata": {}
}
```

#### 1.4 Create Run
```http
POST https://api.openai.com/v1/threads/{thread_id}/runs
Authorization: Bearer <openai_api_key>
```

**Request Body:**
```json
{
  "assistant_id": "asst_abc123",
  "instructions": "Answer from the provided documents only. Cite sources."
}
```

**Response (201 Created):**
```json
{
  "id": "run_abc123",
  "object": "run",
  "created_at": 1640995200,
  "thread_id": "thread_abc123",
  "assistant_id": "asst_abc123",
  "status": "queued",
  "required_action": null,
  "last_error": null,
  "expires_at": 1640998800,
  "started_at": null,
  "completed_at": null,
  "cancelled_at": null,
  "failed_at": null,
  "metadata": {}
}
```

#### 1.5 Get Run Status
```http
GET https://api.openai.com/v1/threads/{thread_id}/runs/{run_id}
Authorization: Bearer <openai_api_key>
```

**Response (200 OK):**
```json
{
  "id": "run_abc123",
  "object": "run",
  "created_at": 1640995200,
  "thread_id": "thread_abc123",
  "assistant_id": "asst_abc123",
  "status": "completed",
  "required_action": null,
  "last_error": null,
  "expires_at": 1640998800,
  "started_at": 1640995260,
  "completed_at": 1640995320,
  "cancelled_at": null,
  "failed_at": null,
  "metadata": {}
}
```

#### 1.6 Get Thread Messages
```http
GET https://api.openai.com/v1/threads/{thread_id}/messages
Authorization: Bearer <openai_api_key>
```

**Query Parameters:**
- `limit` (optional): Number of messages to return (default: 20)
- `order` (optional): Sort order - "asc" or "desc" (default: "desc")
- `after` (optional): Cursor for pagination

**Response (200 OK):**
```json
{
  "object": "list",
  "data": [
    {
      "id": "msg_abc123",
      "object": "message",
      "created_at": 1640995320,
      "thread_id": "thread_abc123",
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": {
            "value": "Based on the Manipur DPR, the project timeline shows Phase 1 starting in Q1 2024...",
            "annotations": [
              {
                "type": "file_search",
                "text": "Based on the Manipur DPR, the project timeline shows Phase 1 starting in Q1 2024",
                "start_index": 0,
                "end_index": 85,
                "file_search": {
                  "file_id": "file-abc123"
                }
              }
            ]
          }
        }
      ],
      "file_ids": [],
      "assistant_id": "asst_abc123",
      "run_id": "run_abc123",
      "metadata": {}
    }
  ],
  "first_id": "msg_abc123",
  "last_id": "msg_def456",
  "has_more": false
}
```

### 2. Files API

#### 2.1 Upload File
```http
POST https://api.openai.com/v1/files
Authorization: Bearer <openai_api_key>
Content-Type: multipart/form-data
```

**Request Body:**
```form-data
file: [binary_file_data]
purpose: assistants
```

**Response (201 Created):**
```json
{
  "id": "file-abc123",
  "object": "file",
  "bytes": 5242880,
  "created_at": 1640995200,
  "filename": "manipur_dpr.pdf",
  "purpose": "assistants",
  "status": "processed",
  "status_details": null
}
```

#### 2.2 List Files
```http
GET https://api.openai.com/v1/files
Authorization: Bearer <openai_api_key>
```

**Query Parameters:**
- `purpose` (optional): Filter by purpose
- `limit` (optional): Number of files to return (default: 20)

**Response (200 OK):**
```json
{
  "object": "list",
  "data": [
    {
      "id": "file-abc123",
      "object": "file",
      "bytes": 5242880,
      "created_at": 1640995200,
      "filename": "manipur_dpr.pdf",
      "purpose": "assistants",
      "status": "processed",
      "status_details": null
    }
  ]
}
```

#### 2.3 Delete File
```http
DELETE https://api.openai.com/v1/files/{file_id}
Authorization: Bearer <openai_api_key>
```

**Response (200 OK):**
```json
{
  "id": "file-abc123",
  "object": "file",
  "deleted": true
}
```

### 3. Vector Stores API

#### 3.1 Create Vector Store
```http
POST https://api.openai.com/v1/vector_stores
Authorization: Bearer <openai_api_key>
```

**Request Body:**
```json
{
  "name": "DPR Documents Vector Store",
  "expires_after": {
    "anchor": "last_active_at",
    "days": 30
  }
}
```

**Response (201 Created):**
```json
{
  "id": "vs_abc123",
  "object": "vector_store",
  "created_at": 1640995200,
  "name": "DPR Documents Vector Store",
  "expires_after": {
    "anchor": "last_active_at",
    "days": 30
  },
  "file_counts": {
    "in_progress": 0,
    "completed": 0,
    "failed": 0,
    "cancelled": 0,
    "total": 0
  },
  "metadata": {}
}
```

#### 3.2 Add Files to Vector Store
```http
POST https://api.openai.com/v1/vector_stores/{vector_store_id}/files
Authorization: Bearer <openai_api_key>
```

**Request Body:**
```json
{
  "file_ids": ["file-abc123", "file-def456"]
}
```

**Response (201 Created):**
```json
{
  "id": "vs_abc123",
  "object": "vector_store",
  "created_at": 1640995200,
  "name": "DPR Documents Vector Store",
  "file_counts": {
    "in_progress": 2,
    "completed": 0,
    "failed": 0,
    "cancelled": 0,
    "total": 2
  }
}
```

---

## External APIs

### 1. Tavily Search API

#### 1.1 Search Query
```http
POST https://api.tavily.com/search
Authorization: Bearer <tavily_api_key>
```

**Request Body:**
```json
{
  "query": "latest renewable energy developments 2024",
  "search_depth": "advanced",
  "include_answer": true,
  "include_raw_content": false,
  "include_images": false,
  "max_results": 5
}
```

**Response (200 OK):**
```json
{
  "query": "latest renewable energy developments 2024",
  "results": [
    {
      "title": "Latest Renewable Energy Trends in 2024",
      "url": "https://example.com/article1",
      "content": "The renewable energy sector has seen significant developments...",
      "score": 0.95,
      "published_date": "2024-01-15"
    }
  ],
  "answer": "Based on recent developments, the renewable energy sector has seen significant growth in solar and wind technologies...",
  "images": [],
  "follow_up_questions": [
    "What are the most promising renewable energy technologies?",
    "How has government policy affected renewable energy adoption?"
  ]
}
```

### 2. Perplexity API (Alternative)

#### 2.1 Search Query
```http
POST https://api.perplexity.ai/chat/completions
Authorization: Bearer <perplexity_api_key>
```

**Request Body:**
```json
{
  "model": "llama-3.1-sonar-small-128k-online",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant. The user is working with DPR (Detailed Project Report) documents for Manipur and Meghalaya projects. Previous conversation discussed project timelines and Phase 1 starting Q1 2024. Provide contextually relevant answers that connect to their project interests."
    //    generateContextualResponse () to avoid stateless behaviour
    },
    {
      "role": "user",
      "content": "What are the latest developments in renewable energy in 2024?"
    }
  ],
  "max_tokens": 1000,
  "temperature": 0.1
}
```

**Response (200 OK):**
```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1640995200,
  "model": "llama-3.1-sonar-small-128k-online",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Based on recent research and developments, the renewable energy sector has seen significant advancements in 2024..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

---

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details",
    "timestamp": "2024-01-01T10:00:00Z",
    "request_id": "req_123456789"
  }
}
```

### Common Error Codes

#### Backend Errors
- `VALIDATION_ERROR`: Input validation failed
- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error

#### OpenAI Errors
- `OPENAI_RATE_LIMIT`: OpenAI API rate limit exceeded
- `OPENAI_SERVICE_UNAVAILABLE`: OpenAI service temporarily unavailable
- `OPENAI_INVALID_REQUEST`: Invalid request to OpenAI API
- `OPENAI_QUOTA_EXCEEDED`: OpenAI quota exceeded

#### External API Errors
- `TAVILY_API_ERROR`: Tavily API error
- `PERPLEXITY_API_ERROR`: Perplexity API error
- `NETWORK_ERROR`: Network connectivity issue

### Error Examples

#### 401 Unauthorized
```json
{
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid or expired token",
    "details": "Please log in again",
    "timestamp": "2024-01-01T10:00:00Z",
    "request_id": "req_123456789"
  }
}
```

#### 422 Validation Error
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["has already been taken"],
      "password": ["is too short (minimum is 6 characters)"]
    },
    "timestamp": "2024-01-01T10:00:00Z",
    "request_id": "req_123456789"
  }
}
```

#### 429 Rate Limit
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": "Please wait 60 seconds before retrying",
    "timestamp": "2024-01-01T10:00:00Z",
    "request_id": "req_123456789"
  }
}
```

---

## Rate Limiting

### Backend Rate Limits
- **Authentication**: 5 requests per minute per IP
- **General API**: 100 requests per minute per user
- **File Upload**: 10 requests per minute per user
- **Message Sending**: 30 requests per minute per user

### OpenAI Rate Limits
- **Assistants API**: Varies by model and plan
- **Files API**: 100 requests per minute
- **Vector Stores**: 50 requests per minute

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995260
Retry-After: 60
```

---

## Testing

### Test Environment
- **Base URL**: `http://localhost:3000/api` (development)
- **Test Database**: Separate test database
- **Mock Services**: OpenAI and external APIs mocked

### Test Endpoints

#### Health Check
```http
GET /api/health
```

#### Test Authentication
```http
POST /api/auth/test
Authorization: Bearer <test_token>
```

### Test Data
```json
{
  "test_user": {
    "email": "test@example.com",
    "password": "testpassword123"
  },
  "test_documents": [
    {
      "name": "Test DPR 1",
      "filename": "test_dpr_1.pdf"
    }
  ]
}
```

---

## Implementation Notes

### Backend Implementation
1. **Controllers**: Handle HTTP requests and responses
2. **Services**: Business logic and external API integration
3. **Models**: Database interactions and validations
4. **Workers**: Background job processing
5. **Middleware**: Authentication, rate limiting, error handling

### Frontend Implementation
1. **API Client**: Centralized API communication
2. **State Management**: localStorage for application state and user data
3. **Components**: Reusable UI components
4. **Routing**: Vue Router for navigation
5. **Error Handling**: Global error handling and user feedback

### Security Considerations
1. **JWT Token Security**: Secure token generation and validation
2. **localStorage Security**: Store tokens securely, clear on logout
3. **Input Validation**: Sanitize all user inputs
4. **CORS Configuration**: Restrict to allowed origins
5. **Rate Limiting**: Prevent abuse and ensure fair usage
6. **Error Handling**: Don't expose sensitive information in errors

### Performance Optimization
1. **Caching**: Redis caching for frequently accessed data
2. **Database Indexing**: Optimize database queries
3. **Pagination**: Implement pagination for large datasets
4. **Streaming**: Support streaming responses for real-time chat
5. **CDN**: Use CDN for static assets

This API documentation provides a comprehensive reference for both frontend and backend developers working on the DPR Chatbot system.
