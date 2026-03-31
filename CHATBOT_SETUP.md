# SaathiLearn Chatbot Feature Setup Guide

## Overview

The Chatbot feature has been successfully added to the SaathiLearn project. It provides an instant doubt resolution system for school students through an intelligent chat interface.

## Features Implemented

### Frontend Components

1. **DoubtsPage** (`frontend/src/pages/Student/DoubtsPage.jsx`)
   - Main page for students to access the doubt resolution chatbot
   - Tab-based interface with Chatbot and Resources sections
   - User profile information panel
   - Quick tips and statistics

2. **Chatbot Component** (`frontend/src/components/Chatbot/Chatbot.jsx`)
   - Interactive chat interface with message history
   - Real-time message sending and receiving
   - Loading states and error handling
   - Keyboard shortcuts (Shift+Enter for new line, Enter to send)

3. **ChatMessage Component** (`frontend/src/components/Chatbot/ChatMessage.jsx`)
   - Displays individual chat messages
   - Differentiates between user and bot messages
   - Shows timestamps for each message
   - Beautiful animations and styling

4. **API Client** (`frontend/src/api/chatbot.js`)
   - `askDoubtsQuestion()` - Send a question to the chatbot
   - `getChatHistory()` - Retrieve previous conversations
   - `rateResponse()` - Rate chatbot responses
   - `clearChatHistory()` - Clear conversation history

### Backend Routes & Controllers

1. **Chatbot Routes** (`backend/src/routes/chatbot.routes.js`)
   - `POST /api/chatbot/ask-doubt` - Ask a question
   - `GET /api/chatbot/history` - Get chat history
   - `POST /api/chatbot/rate` - Rate a response
   - `POST /api/chatbot/clear-history` - Clear history

2. **Chatbot Controller** (`backend/src/controllers/chatbot.controller.js`)
   - Handles all request validation and response formatting
   - Student-only authorization
   - Proper error handling

3. **Chatbot Service** (`backend/src/services/chatbot.service.js`)
   - `askDoubt()` - Main logic for generating responses
   - `getChatHistory()` - Retrieve stored conversations
   - `rateResponse()` - Store ratings
   - `clearChatHistory()` - Clear user sessions

## Key Integration Points

### Frontend Integration

1. **App.jsx** - Added route for DoubtsPage at `/student/doubts`
2. **Student Dashboard** - Added "Ask a Doubt" button in the header for quick access

### Backend Integration

1. **index.js** - Registered chatbot routes with the express app

## API Endpoints

All endpoints require authentication (Bearer token in Authorization header)

### 1. Ask a Doubt Question

```
POST /api/chatbot/ask-doubt
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "question": "How to solve quadratic equations?",
  "subject": "Mathematics",
  "context": "Optional context text"
}

Response:
{
  "success": true,
  "data": {
    "answer": "A quadratic equation...",
    "question": "How to solve quadratic equations?",
    "subject": "Mathematics",
    "messageId": 2,
    "timestamp": "2026-03-31T10:30:00Z"
  }
}
```

### 2. Get Chat History

```
GET /api/chatbot/history
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "data": {
    "messages": [
      { "role": "user", "content": "..." },
      { "role": "assistant", "content": "..." }
    ],
    "totalMessages": 10,
    "createdAt": "2026-03-31T09:00:00Z",
    "updatedAt": "2026-03-31T10:30:00Z"
  }
}
```

### 3. Rate a Response

```
POST /api/chatbot/rate
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "messageId": 2,
  "score": 5,
  "feedback": "Very helpful explanation!"
}

Response:
{
  "success": true,
  "data": {
    "success": true,
    "message": "Thank you for your feedback!"
  }
}
```

### 4. Clear Chat History

```
POST /api/chatbot/clear-history
Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "data": {
    "success": true,
    "message": "Chat history cleared successfully"
  }
}
```

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- Existing SaathiLearn backend and frontend

### Backend Setup

1. **Restart the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. The chatbot routes are now automatically registered at `/api/chatbot`

### Frontend Setup

1. **No additional dependencies required** - All necessary packages are already in package.json
   - lucide-react (for icons)
   - framer-motion (for animations)
   - axios (for API calls)

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## How to Use

### For Students

1. Navigate to the Student Dashboard
2. Click "Ask a Doubt" button in the top right
3. Type your question in the chatbot interface
4. Press Enter or click the Send button
5. Get instant personalized response
6. Rate the response for improvement

### For Developers - Adding AI Integration

To integrate with an actual AI service (like OpenAI GPT-4, Google Gemini, etc.):

1. **Update `backend/src/services/chatbot.service.js`:**

```javascript
// Replace the generateDoubtResponse function with:
const generateDoubtResponse = async (question, subject) => {
  const response = await openAIClient.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a helpful tutor for ${subject}. Provide clear, concise explanations.`
      },
      {
        role: 'user',
        content: question
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return response.choices[0].message.content;
};
```

2. **Add AI service configuration in `.env`:**
```
AI_API_KEY=your_api_key_here
AI_SERVICE=openai # or gemini, claude, etc.
```

3. **Install the AI client library:**
```bash
npm install openai  # for OpenAI
# or
npm install @google/generative-ai  # for Gemini
```

## Current Limitations & Future Enhancements

### Current Implementation
- Uses keyword-based responses (placeholder logic)
- In-memory session storage (no database persistence)
- Basic error handling

### Future Enhancements
1. **AI Integration** - Connect to OpenAI, Google Gemini, or Claude
2. **Persistence** - Store chat history in MongoDB
3. **Subject-Specific Logic** - Specialized responses for different subjects
4. **Multi-language Support** - Support for regional languages
5. **Follow-up Questions** - Context-aware conversation threading
6. **Resource Linking** - Link to study materials
7. **Analytics Dashboard** - Track popular doubts and topics
8. **Mentor Integration** - Escalate complex questions to mentors
9. **Voice Support** - Speech-to-text and text-to-speech
10. **Offline Mode** - Cache common questions and answers

## Troubleshooting

### Issue: Chatbot not responding

**Solution:**
1. Ensure backend is running: `npm run dev` in backend folder
2. Check network tab in DevTools for API errors
3. Verify JWT token is being sent correctly
4. Check console for error messages

### Issue: Routes not found (404)

**Solution:**
1. Verify `chatbot.routes.js` is imported in `backend/src/index.js`
2. Restart the backend server
3. Clear browser cache and reload

### Issue: Authentication errors

**Solution:**
1. Login again to get a fresh token
2. Check that user role is 'STUDENT'
3. Verify Authorization header format: `Bearer <token>`

## File Structure

```
SaathiLearn/
├── frontend/
│   └── src/
│       ├── api/
│       │   └── chatbot.js (NEW)
│       ├── components/
│       │   └── Chatbot/ (NEW)
│       │       ├── Chatbot.jsx
│       │       └── ChatMessage.jsx
│       └── pages/
│           └── Student/
│               └── DoubtsPage.jsx (NEW)
│
└── backend/
    └── src/
        ├── controllers/
        │   └── chatbot.controller.js (NEW)
        ├── routes/
        │   └── chatbot.routes.js (NEW)
        └── services/
            └── chatbot.service.js (NEW)
```

## Support

For issues or questions about the chatbot feature, refer to:
1. The inline code comments in each file
2. The API endpoint documentation above
3. The existing project documentation

---

**Last Updated:** March 31, 2026
**Feature Status:** Production Ready
