fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Testy',
    email: 'testy12@test.com',
    password: 'password123',
    role: 'STUDENT',
    class: 8
  })
})
.then(res => res.json())
.then(data => console.log('SIGNUP RES:', data))
.catch(err => console.error('SIGNUP ERR:', err));