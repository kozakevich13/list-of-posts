import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPosts] = useState(100);
  const postsPerPage = 10;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${postsPerPage}&_page=${page}`
    )
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [page]);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={page === i ? "active-page" : "page-btn"}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsComponent;
