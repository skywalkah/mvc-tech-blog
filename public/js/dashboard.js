document.addEventListener('DOMContentLoaded', () => {

  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });

  // Handle submitting a new blog post
  const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const contents = document.querySelector('#contents').value.trim();

    if (title && contents) {
      try {
        const response = await fetch('/api/blogposts', {
          method: 'POST',
          body: JSON.stringify({ title, contents }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          // Here you could use a custom function to show the error
          showError('Failed to create post');
        }
      } catch (error) {
        // Handle network errors
        showError('Network error, please try again');
        console.error(error);
      }
    } else {
      // Handle case where title or contents is missing
      showError('Please enter both a title and contents for the post');
    }
  };


  const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/dashboard/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      document.location.replace(`/dashboard/edit/${id}`);
    }
  };

  // Add event listeners to delete and edit buttons
  const editButtons = document.querySelectorAll('.edit-btn');
  const deleteButtons = document.querySelectorAll('.delete-btn');

  if (editButtons && deleteButtons) {
    editButtons.forEach((button) => {
      button.addEventListener('click', editButtonHandler);
    });

    deleteButtons.forEach((button) => {
      button.addEventListener('click', deleteButtonHandler);
    });
  }

  // Add event listener to form
  const newBlogPostForm = document.querySelector('#new-blogpost-form');
  if (newBlogPostForm) {
    newBlogPostForm.addEventListener('submit', newPostFormHandler);
  }
});