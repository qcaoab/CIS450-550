const QUERY = {
  POPULAR_BOOKS: "QUERY.POPULAR_BOOKS",
  BEST_REVIEWS: "QUERY.BEST_REVIEWS",
  MOST_CONSISTENT_AUTHOR: "QUERY.MOST_CONSISTENT_AUTHOR",
  HIGHEST_RATED_BOOKS_PER_GENRE_YEAR: "HIGHEST_RATED_BOOKS_PER_GENRE_YEAR",
  MOST_CONTROVERSIAL_BOOKS: "MOST_CONTROVERSIAL_BOOKS",
  ONE_HIT_WONDER: "ONE_HIT_WONDER",
  PROLIFIC_AUTHOR: "PROLIFIC_AUTHOR",
  CROSS_GENRE_AUTHOR: "CROSS_GENRE_AUTHOR",
  MOST_GENRE_AUTHOR: "MOST_GENRE_AUTHOR"
};

module.exports = {
  [QUERY.POPULAR_BOOKS]: `SELECT * 
    FROM
        (SELECT title, text_reviews_count
        FROM BOOK
        WHERE BOOK.TEXT_REVIEWS_COUNT IS NOT NULL
        ORDER BY BOOK.TEXT_REVIEWS_COUNT DESC) result_set
    WHERE ROWNUM <= 10`,
  [QUERY.BEST_REVIEWS]: `SELECT book.title, review_text, n_votes FROM
  (
    SELECT book_id, n_votes, review_text
    FROM Review
    ORDER BY n_votes DESC
    ) x JOIN book on x.book_id=book.book_id
    WHERE ROWNUM<10             
    
    `,
  [QUERY.MOST_CONSISTENT_AUTHOR]: `SELECT name, average_rating, rating_count
  FROM Author
  WHERE average_rating >4 and rating_count>50
  ORDER BY average_rating DESC 
`,
  [QUERY.HIGHEST_RATED_BOOKS_PER_GENRE_YEAR]: `WITH Book_Rating(book_id, title, avg_rating) AS
  (SELECT Book.book_id, Book.title, AVG(Review.rating)
   FROM Book 
    JOIN Review ON Book.book_id = Review.book_id
   GROUP BY Book.book_id, Book.title)
  SELECT FLOOR(Book.publication_year/10)*10 AS decade, Genre.genre_name, Book_Rating.title, 
   FROM Book, Book_Rating
    JOIN Genre ON Book_Rating.book_id = Genre.book_id
    WHERE avg_rating >= ALL
      (SELECT avg_rating
       FROM Book_Rating)
       and Book.book_id=Book_Rating.book_id
 GROUP BY FLOOR(Book.publication_year/10), Genre.genre_name, Book_Rating.title     
`,
  [QUERY.MOST_CONTROVERSIAL_BOOKS]: `SELECT title, STDDEV(rating) AS stdev
  FROM Book JOIN Review ON Book.book_id = Review.book_id 
  GROUP BY Book.book_id, title
  HAVING STDDEV(rating) > 0
  ORDER BY STDDEV(rating) DESC   
  `,
  [QUERY.ONE_HIT_WONDER]: `SELECT name, title
  FROM Book JOIN AuthorOf ON Book.book_id = AuthorOf.book_id
  JOIN Author ON AuthorOf.author_id = Author.author_id
  WHERE Book.average_rating > Author.average_rating
  GROUP BY Author.author_id, name, title
  HAVING COUNT(*) = 1
  `,
  [QUERY.PROLIFIC_AUTHOR]: `WITH Author_Genre(name, genre_name, num) AS
  (SELECT name, genre_name, COUNT(*)
  FROM Author
  JOIN AuthorOf ON Author.author_id = AuthorOf.author_id
  JOIN Genre ON AuthorOf.book_id = Genre.book_id
  GROUP BY Author.author_id, genre_name, name )
SELECT name, genre_name, num
FROM Author_Genre G1
WHERE num >= ALL
    (SELECT num
     FROM Author_Genre G2
     WHERE G1.genre_name = G2.genre_name)       
`,
  [QUERY.CROSS_GENRE_AUTHOR]: `WITH Highly_Rated_Books(book_id, rating) AS
  (SELECT book.book_id, average_rating
  FROM Book  
  WHERE average_rating>4)
SELECT Author.name FROM(
  SELECT Authorof.author_id
  FROM Highly_Rated_Books JOIN AuthorOf ON Highly_Rated_Books.book_id = AuthorOf.book_id
  JOIN bookgenre ON Highly_Rated_Books.book_id = bookgenre.book_id 
  GROUP BY Authorof.author_id
    HAVING COUNT(*) >=3  
) x 
JOIN Author ON Author.author_id=x.author_id   
`,
  [QUERY.MOST_GENRE_AUTHOR]: `WITH Author_Genre(author_id, genre_name,name) AS
  (SELECT Author.author_id, Genre.genre_name, Author.name
  FROM Author
  JOIN AuthorOf ON Author.author_id = AuthorOf.author_id
  JOIN Genre ON AuthorOf.book_id = Genre.book_id
  GROUP BY Author.author_id, Genre.genre_name,Author.name)
SELECT Author_Genre.name,count(*)
FROM Author_Genre 
GROUP BY Author_Genre.author_id,Author_Genre.name
HAVING COUNT(*) >= ALL
        (SELECT COUNT(*)
        FROM Author_Genre
        GROUP BY author_id)
    `
};
