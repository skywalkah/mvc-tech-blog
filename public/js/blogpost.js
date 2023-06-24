document.addEventListener('DOMContentLoaded', () => {
    const newCommentForm = document.querySelector('#new-comment-form');
    if (newCommentForm) {
        newCommentForm.addEventListener('submit', newCommentFormHandler);
    }
});

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
