const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector('#comment_text').value.trim();
  const postId = document.querySelector('#post_id').value.trim();

  if (commentText && postId) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment_text: commentText, post_id: postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload(); // Reload the page to display the new comment
    } else {
      alert('Failed to add comment');
    }
  }
};

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/dashboard/edit/${id}`);
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

document.addEventListener('DOMContentLoaded', () => {
  const newCommentForm = document.querySelector('#new-comment-form');
  if (newCommentForm) {
    newCommentForm.addEventListener('submit', newCommentFormHandler);
  }

  const editButton = document.querySelector('.edit-btn');
  if (editButton) {
    editButton.addEventListener('click', editButtonHandler);
  }

  const deleteButton = document.querySelector('.delete-btn');
  if (deleteButton) {
    deleteButton.addEventListener('click', deleteButtonHandler);
  }
});

