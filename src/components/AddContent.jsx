import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { isNotEmpty } from "../utils/validation.js";
import { useEffect, useState } from "react";

function AddContent() {
  const { addContent } = useContent();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Misc");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem("contentDraft");
    if (draft) {
      try {
        const { title, body, category } = JSON.parse(draft);
        setTitle(title || "");
        setBody(body || "");
        setCategory(category || "Misc");
      } catch (error) {
        console.error("Error in parsing draft", error);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNotEmpty(title) || !isNotEmpty(body)) {
      setError("Please fill title and body for article");
      return;
    }
    const newContent = {
      id: Date.now(),
      title,
      body,
      category,
      date: new Date().toISOString(),
      author: user.username,
    };
    addContent(newContent);
    setTitle("");
    setBody("");
    setCategory("Misc");
    setError("");
    localStorage.removeItem("contentDraft");
    navigate("/view");
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Spacer */}
      <div className="w-1/4"></div>
      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gray-100 ml-[25%]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Content</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title:
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
              Body:
            </label>
            <textarea
              id="body"
              placeholder="Enter body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="6"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="News">News</option>
              <option value="Blog">Blog</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Misc">Misc</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={showPreview}
              onChange={() => setShowPreview((prev) => !prev)}
              className="mr-2"
            />
            <label className="text-gray-700">Show Preview</label>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold transition duration-300 hover:bg-blue-600"
          >
            Add
          </button>
        </form>
        {showPreview && (
          <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">{title || "Title"}</h4>
            <p className="text-gray-600 mb-4">{body || "Content Preview"}</p>
            <small className="text-gray-500">Category: {category}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddContent;