import React, { useState, useEffect } from "react";
import NotificationComponent from "./NotificationComponent";

interface Post {
  id: number;
  title: string;
}

const SearchComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Post[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notification, setNotification] = useState("");

  const fetchSuggestions = (searchText: string) => {
    const trimmedSearchText = searchText.trim();

    if (trimmedSearchText.length > 0) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Server response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Data:", data);
          const validPosts = data.filter(
            (post: Post) =>
              post.title &&
              post.title.toLowerCase().includes(trimmedSearchText.toLowerCase())
          );

          if (validPosts.length > 0) {
            setSuggestions(validPosts.slice(0, 10));
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      fetchSuggestions(input);
    }, 300);
    return () => clearTimeout(handle);
  }, [input]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSelect = (title: string) => {
    setInput(title);
    setShowSuggestions(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNotification(`You searched for: ${input}`);
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const closeNotification = () => {
    setNotification("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={() => input && fetchSuggestions(input)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul>
            {suggestions.map((post: Post) => (
              <li key={post.id} onClick={() => handleSelect(post.title)}>
                {post.title}
              </li>
            ))}
          </ul>
        )}
        <button type="submit">Search</button>
      </form>
      {notification && (
        <NotificationComponent
          message={notification}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default SearchComponent;
