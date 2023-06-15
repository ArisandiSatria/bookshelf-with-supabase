import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
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
      .update({ title, author, description })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Please fill in all the fields correctly!");
      console.log(error);
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setAuthor(data.author);
        setDescription(data.description);
        console.log(data);
      }
    };

    fetchBooks();
  }, [id, navigate]);

  return (
    <div className="page update">
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

        <button>Update Book</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
