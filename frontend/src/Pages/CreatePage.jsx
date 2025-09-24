import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected typo: preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("All feilds are required");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/notes", {
        title,
        content,
      });
      toast.success("Note Created successfully");
      navigate("/");
    } catch (error) {
      console.log("Failed to create note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You are trying to create to many notes", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create Note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"></ArrowLeftIcon>
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Corrected: now updates 'content' state
                  ></textarea>
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary "
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
