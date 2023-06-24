const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  const errorMessageElement = document.querySelector('#error-message');

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const errorData = await response.json();
      errorMessageElement.textContent = errorData.message; // Display the error message on the page
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
