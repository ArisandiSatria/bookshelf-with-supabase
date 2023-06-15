import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !description) {
      setFormError("Please fill in all the fields correctly!");
      return;
    }

    const { data, error } = await supabase
      .from("books")
      .insert([{ title, author, description }])
      .select();

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly!");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Create New Book</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
