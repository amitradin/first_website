import React from "react";
import Note from "../../../backend/src/models/Note";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import axiosInstance from "../lib/axios";

import toast from "react-hot-toast";

const NoteCard = ({ note ,setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); //This get rids of the navigate behavior

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      setNotes((prev)=> prev.filter(note => note._id !== id)) // get rid of the deleted one

    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-action justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4"></PenSquareIcon>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4"></Trash2Icon>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
