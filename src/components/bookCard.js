import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const BookCard = ({ book, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq("id", book.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      onDelete(book.id);
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <div className="author">{book.author}</div>
      <div className="buttons">
        <Link to={"/" + book.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default BookCard;
