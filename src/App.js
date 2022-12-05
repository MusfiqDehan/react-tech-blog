import "./index.css";
import React from "react";
import { format } from "date-fns";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import About from "./components/About";
import Missing from "./components/Missing";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/posts";

function App() {
    const [posts, setPosts] = useState([]);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/posts");
                if (response && response.data) setPosts(response.data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log(error.message);
                }
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postId = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const newPost = {
            id: postId,
            title: postTitle,
            datetime: datetime,
            body: postBody,
        };

        try {
            const response = await api.post("/posts", newPost);
            const allPosts = [...posts, response.data];

            setPosts(allPosts);
            setPostTitle("");
            setPostBody("");
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log(error.message);
            }
        }
    };

    const handleEdit = async (id, title, body) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = {
            id: id,
            title: title,
            datetime: datetime,
            body: body,
        };

        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            const allPosts = posts.map((post) =>
                post.id === id ? response.data : post
            );
            setPosts(allPosts);
            setEditTitle("");
            setEditBody("");
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log(error.message);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postList = posts.filter((post) => post.id !== id);
            setPosts(postList);
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log(error.message);
            }
        }
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<Layout search={search} setSearch={setSearch} />}
            >
                <Route index element={<Home posts={searchResults} />} />
                <Route path="post">
                    <Route
                        index
                        element={
                            <NewPost
                                handleSubmit={handleSubmit}
                                postTitle={postTitle}
                                setPostTitle={setPostTitle}
                                postBody={postBody}
                                setPostBody={setPostBody}
                            />
                        }
                    />
                    <Route
                        path=":id"
                        element={
                            <PostPage
                                posts={posts}
                                handleDelete={handleDelete}
                            />
                        }
                    />
                </Route>
                <Route path="edit">
                    <Route
                        path=":id"
                        element={
                            <EditPost
                                posts={posts}
                                handleEdit={handleEdit}
                                editTitle={editTitle}
                                setEditTitle={setEditTitle}
                                editBody={editBody}
                                setEditBody={setEditBody}
                            />
                        }
                    />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
