const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const errorMessage = document.querySelector('#error-message');

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 1000);
    } else {
      const errorData = await response.json();
      errorMessage.textContent = errorData.message || 'Failed to log in';
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
