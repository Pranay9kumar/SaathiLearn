# Chatbot Debugging Guide

## Issue: Chatbot Not Giving Answers

### Quick Troubleshooting Steps

#### 1. **Check Browser Console** (Ctrl + Shift + J)
   - Look for error messages
   - Check the network tab for API calls
   - Should see logs starting with `📤 Frontend API`

#### 2. **Check Server Logs**
   - Backend should show:
     ```
     🟡 Chatbot Controller - askDoubt called
     🔵 Chatbot Service - askDoubt called
     🤖 Chatbot - Processing question
     ✅ Generated answer
     ```
   - If you see errors, note them

#### 3. **Common Issues**

##### Issue A: "401 Unauthorized"
**Problem:** User not authenticated
**Solution:**
- Make sure you're logged in as a Student
- Check that JWT token is valid
- Try logging out and logging back in

**Debug:**
```
Expected header: Authorization: Bearer <token>
Check localStorage: localStorage.getItem('saathilearn_token')
```

##### Issue B: "403 Forbidden"
**Problem:** User role is not STUDENT
**Solution:**
- Log in with a STUDENT account
- Check user role in backend logs
- User profile must have role: 'STUDENT'

**Debug:**
```
Browser Console: console.log(localStorage.getItem('saathilearn_user'))
Should show: "role": "STUDENT"
```

##### Issue C: "400 Bad Request"
**Problem:** Invalid request data
**Solution:**
- Question must be at least 3 characters
- Subject must be at least 2 characters
- Make sure question is not empty

**Debug:**
```
Frontend sends: { question: "...", subject: "..." }
Check validation errors in response
```

##### Issue D: No Response at All
**Problem:** Request is hanging or timing out
**Solution:**
- Check backend is running on http://localhost:5000
- Check frontend can reach backend URL
- Check CORS configuration

**Debug:**
```
Network tab → look for /chatbot/ask-doubt request
If: PENDING → backend might be down
If: FAILED → CORS or connection issue
If: 500 → backend error
```

### Step-by-Step Debug Process

1. **Open Browser DevTools** (F12 or Ctrl+Shift+I)

2. **Go to Console tab**
   - Clear previous logs
   - Ask a question in chatbot

3. **Look for these logs in order:**
   ```
   📤 Frontend API - Sending question to backend: [Your Question]
   📤 Payload: { question: "...", subject: "..." }
   ```

4. **Go to Network tab**
   - Filter by "chatbot"
   - Look for `/chatbot/ask-doubt` request
   - Check Status code:
     - 200 = Success ✅
     - 401 = Not authenticated ❌
     - 403 = Wrong role ❌
     - 400 = Invalid data ❌
     - 500 = Server error ❌

5. **Check Server Output**
   - Look for terminal where backend is running
   - Should see detailed logs with colors:
     - 🟡 = Info
     - ✅ = Success
     - ❌ = Error
     - 🤖 = Chatbot processing

### Manual Testing

#### Test in PostMan or curl:

```bash
# 1. Get your JWT token from browser
# localStorage.getItem('saathilearn_token')

# 2. Run this command (replace TOKEN):
curl -X POST http://localhost:5000/api/chatbot/ask-doubt \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "question": "What is a quadratic equation?",
    "subject": "Mathematics"
  }'

# Expected Response:
{
  "success": true,
  "data": {
    "answer": "A quadratic equation is of the form...",
    "question": "What is a quadratic equation?",
    "subject": "Mathematics",
    "messageId": 1,
    "timestamp": "2026-03-31T..."
  }
}
```

### Verify Installation

Run these commands:

```bash
# 1. Check backend is running
curl http://localhost:5000/ping
# Should return: Backend is alive

# 2. Check chatbot routes are registered
curl -X GET http://localhost:5000/api/chatbot/history \
  -H "Authorization: Bearer YOUR_TOKEN"
# Should return: empty messages array (or data)
```

### Reset Everything

If nothing works, try this:

```bash
# 1. Stop backend (Ctrl+C in terminal)

# 2. Kill all node processes
taskkill /F /IM node.exe

# 3. Restart backend
cd backend
npm run dev

# 4. Restart frontend (separate terminal)
cd frontend
npm run dev

# 5. Clear browser cache
# DevTools → Application → Clear Storage
```

### Expected Keywords for Chatbot

The chatbot recognizes these keywords:
- **Math**: quadratic, derivative, integral, trigonometry
- **Science**: photosynthesis, mitochondria, atom
- **General**: Anything else gets a default helpful response

**Try asking:**
- "What is a quadratic equation?" ✅
- "Explain derivatives" ✅
- "Tell me about photosynthesis" ✅
- "How do I solve for x?" ✅ (will match quadratic or default)

### Still Not Working?

1. **Check API URL**: Browser DevTools → Network → check request URL
   - Should be: `http://localhost:5000/api/chatbot/ask-doubt`

2. **Check Token**: In Console:
   ```javascript
   localStorage.getItem('saathilearn_token')
   localStorage.getItem('saathilearn_user')
   ```

3. **Check User Role**: In Console:
   ```javascript
   JSON.parse(localStorage.getItem('saathilearn_user')).role
   // Should be: "STUDENT"
   ```

4. **Test Backend Directly**: In Console (paste and run):
   ```javascript
   const token = localStorage.getItem('saathilearn_token');
   fetch('http://localhost:5000/api/chatbot/ask-doubt', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`,
     },
     body: JSON.stringify({
       question: 'What is Math?',
       subject: 'Mathematics'
     })
   })
   .then(r => r.json())
   .then(d => console.log('Response:', d))
   .catch(e => console.error('Error:', e));
   ```

### Contact Points for Debugging

- **Frontend logs**: Browser Console (F12)
- **Backend logs**: Terminal where `npm run dev` is running
- **Network logs**: DevTools → Network tab
- **API Response**: Network tab → Response tab

---

**Last Updated:** March 31, 2026
