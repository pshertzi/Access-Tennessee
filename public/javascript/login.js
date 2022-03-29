async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/userpage');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function b_loginFormHandler(event) {
    event.preventDefault();
  
    const b_email = document.querySelector('#b-email-login').value.trim();
    const b_password = document.querySelector('#b-password-login').value.trim();
  
    if (b_email && b_password) {
      const response = await fetch('/api/business/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/business');
      } else {
        alert(response.statusText);
      }
    }
  }
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);