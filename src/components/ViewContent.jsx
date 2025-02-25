import { useContent } from "../context/ContentContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { isNotEmpty } from "../utils/validation.js";
import { useState } from "react";
import { Link } from "react-router-dom";

function ViewContent() {
  const { contents, deleteContent, addComment } = useContent();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [commentInput, setCommentInput] = useState({});

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      deleteContent(id);
    }
  };

  const handleCommentChange = (contentId, value) => {
    setCommentInput((prev) => ({ ...prev, [contentId]: value }));
  };

  const handleCommentSubmit = (e, contentId) => {
    e.preventDefault();
    const commentText = commentInput[contentId];
    if (!isNotEmpty(commentText)) return;
    const newComment = {
      id: Date.now(),
      author: user.username,
      text: commentText,
      date: new Date().toISOString(),
    };
    addComment(contentId, newComment);
    setCommentInput((prev) => ({ ...prev, [contentId]: "" }));
  };

  const filterContent = contents
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "Newest":
          return new Date(b.date) - new Date(a.date); // descending order
        case "Oldest":
          return new Date(a.date) - new Date(b.date); // ascending order
        case "Title A-Z":
          return a.title.localeCompare(b.title);
        case "Title Z-A":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gray-100 ml-[25%]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">View Content</h2>
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Filter by Category:
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="News">News</option>
                <option value="Blog">Blog</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Misc">Misc</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Sort by:
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Title A-Z">Title A-Z</option>
                <option value="Title Z-A">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>
        {/* Content List */}
        {filterContent.length === 0 ? (
          <p className="text-gray-600">No content available.</p>
        ) : (
          <ul className="space-y-6">
            {filterContent.map((item) => (
              <li key={item.id} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                    <small className="text-gray-500">
                      Category: {item.category} | Author: {item.author}
                    </small>
                  </div>
                  {user.username === item.author && (
                    <div className="flex space-x-2">
                      <Link
                        to={`/edit/${item.id}`}
                        className="text-white hover:no-underline focus:no-underline border-2 p-1.5 rounded-xl bg-green-600 no-underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-white hover:no-underline focus:no-underline border-2 p-1.5 rounded-xl bg-red-600 no-underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mt-4">{item.body}</p>
                <small className="text-gray-400 block mt-2">
                  {new Date(item.date).toLocaleString()}
                </small>
                {/* Comments Section */}
                <div className="mt-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Comments</h4>
                  <ul className="space-y-4">
                    {item.comments.map((comment) => (
                      <li key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          <strong>{comment.author}</strong>: {comment.text}
                        </p>
                        <small className="text-gray-400">
                          {new Date(comment.date).toLocaleString()}
                        </small>
                      </li>
                    ))}
                  </ul>
                  {user.username !== item.author && (
                    <form
                      onSubmit={(e) => handleCommentSubmit(e, item.id)}
                      className="mt-4"
                    >
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentInput[item.id] || ""}
                        onChange={(e) => handleCommentChange(item.id, e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        Comment
                      </button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ViewContent;