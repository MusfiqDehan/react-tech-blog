import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
    posts,
    handleEdit,
    editBody,
    editTitle,
    setEditTitle,
    setEditBody,
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);
    return (
        <main className="NewPost">
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className="newPostForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="editBody">Title:</label>
                        <input
                            id="editBody"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="editBody">Post:</label>
                        <textarea
                            id="editBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={() => handleEdit(post.id)}
                        >
                            Submit
                        </button>
                    </form>
                </>
            )}
            {!editTitle && (
                <p>
                    Post not found. <Link to="/">Go back</Link>
                </p>
            )}
        </main>
    );
};

export default EditPost;
