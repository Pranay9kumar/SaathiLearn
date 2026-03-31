/**
 * Simple test script to verify chatbot API works
 * Run: node test.js (after setting up .env and starting server)
 */

const API_URL = 'http://localhost:5000/api';
const STUDENT_JWT = 'your_jwt_token_here'; // Replace with actual token after login

async function testChatbot() {
  console.log('🧪 Testing Chatbot API...\n');

  try {
    // Test 1: Ask a question
    console.log('1️⃣ Sending question to chatbot...');
    const response = await fetch(`${API_URL}/chatbot/ask-doubt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STUDENT_JWT}`,
      },
      body: JSON.stringify({
        question: 'What is a quadratic equation?',
        subject: 'Mathematics',
        context: '',
      }),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('\n✅ Chatbot test PASSED!');
      console.log('Answer:', data.data.answer);
    } else {
      console.log('\n❌ Chatbot test FAILED!');
      console.log('Error:', data.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testChatbot();
