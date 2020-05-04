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
  [QUERY.HIGHEST_RATED_BOOKS_PER_GENRE_YEAR]: `WITH 
  temp0 (book_id, genre_name, text_reviews_count, average_rating, title, publication_year) AS
      (SELECT Book.book_id, genre, text_reviews_count, average_rating, title, book.publication_year
      FROM Book JOIN BookGenre on Book.book_id=BookGenre.book_id),
  temp1 (decade, genre_name, rating) AS
      (SELECT FLOOR(publication_year/10)*10 AS decade, genre_name, MAX(average_rating) as rating
      FROM temp0
      GROUP BY FLOOR(publication_year/10)*10, genre_name),
  temp2 (decade, genre_name, title, rating, rn) AS(
      SELECT  temp1.decade, temp1.genre_name, temp0.title, temp1.rating,
      ROW_NUMBER() OVER(PARTITION BY temp1.decade,temp1.genre_name ORDER BY temp0.text_reviews_count DESC)
      FROM temp1, temp0
      WHERE FLOOR(temp0.publication_year/10)*10=temp1.decade AND temp1.rating=temp0.average_rating 
      AND temp0.genre_name=temp1.genre_name AND temp1.decade>1000
      ORDER BY temp1.decade,text_reviews_count )
  SELECT * from temp2 where temp2.rn=1
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
  [QUERY.PROLIFIC_AUTHOR]: `WITH Author_Genre(author_id, genre, num) AS
  (SELECT author_id, genre, COUNT(authorof.book_id)
  FROM AuthorOf 
  JOIN BookGenre ON AuthorOf.book_id = BookGenre.book_id
  GROUP BY author_id, genre ),
  a (author_id, genre, num, rn) AS(
  SELECT author_id, genre, num,ROW_NUMBER() OVER(PARTITION BY genre ORDER BY num DESC) 
  FROM Author_Genre
  ORDER BY num DESC
  )
SELECT genre as genre_name, Author.name,  num
FROM a JOIN Author on a.author_id=Author.author_id
WHERE rn=1
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
  [QUERY.MOST_GENRE_AUTHOR]: `
  WITH Author_Genre(author_id,num) AS
    (SELECT AuthorOf.author_id,  count(DISTINCT genre)
    FROM AuthorOf JOIN BookGenre ON AuthorOf.book_id = BookGenre.book_id
    GROUP BY AuthorOf.author_id)
  SELECT a.name,num AS GENRE_NUM
  FROM Author_Genre JOIN (SELECT name, author_id from Author WHERE name <> 'Various' AND name <>'Anonymous') a 
  ON a.author_id = Author_Genre.author_id
  WHERE num>= ALL(SELECT num FROM Author_Genre)
    `
};
