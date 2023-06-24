document.addEventListener('DOMContentLoaded', () => {
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
});

const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const contents = document.querySelector('#contents').value.trim();

    if (title && contents) {
        const response = await fetch('/api/blogposts', {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
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

document.querySelector('#new-blogpost-form').addEventListener('submit', newPostFormHandler);
