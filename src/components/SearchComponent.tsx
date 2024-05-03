import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
}

const SearchComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Post[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchSuggestions = (input: string) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${input}`)
      .then((response) => response.json())
      .then((data) => setSuggestions(data.slice(0, 10)))
      .catch((error) => console.error("Failed to fetch suggestions:", error));
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      if (input.length > 2) {
        fetchSuggestions(input);
      } else {
        setSuggestions([]);
      }
    }, 300);
    setTimer(newTimer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [input]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search posts..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((post) => (
            <li key={post.id} onClick={() => setInput(post.title)}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
