import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

// Components
import BookCard from "../components/bookCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  // const handleDelete = (id) => {
  //   setBooks((prevBooks) => {
  //     return prevBooks.filter((bk) => bk.id !== id);
  //   });
  // };

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the books");
        setBooks(null);
      }
      if (data) {
        setBooks(data);
        setFetchError(null);
      }
    };

    fetchBooks();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {books && (
        <div className="books">
          <div className="order-by">
            <p>Order by: {orderBy}</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("author")}>Author</button>
          </div>
          <div className="book-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
