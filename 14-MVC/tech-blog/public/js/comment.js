document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');

    if (commentForm) {
        commentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const content = document.getElementById('comment-content').value;
            const postId = commentForm.dataset.postId;

            if (content) {
                const response = await fetch(`/api/comments`, {
                    method: 'POST',
                    body: JSON.stringify({ content, postId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const newComment = await response.json();
                    addCommentToList(newComment);
                    commentForm.reset();
                } else {
                    alert('Failed to submit comment');
                }
            }
        });
    }

    function addCommentToList(comment) {
        const li = document.createElement('li');
        li.textContent = `${comment.username}: ${comment.content} (Posted on ${new Date(comment.createdAt).toLocaleString()})`;
        commentList.appendChild(li);
    }
});