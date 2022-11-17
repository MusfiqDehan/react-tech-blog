import React from "react";

const NewPost = (
    handleSubmit,
    postTitle,
    setPostTitle,
    postBody,
    setPostBody
) => {
    return (
        <main className="NewPost">
            <h2>NewPost</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Write Title Here"
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Add Post</button>
            </form>
        </main>
    );
};

export default NewPost;
