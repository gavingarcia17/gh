SELECT favorite_books.book_name AS book_name, 
       favorite_books.book_price        AS price
  FROM favorite_books
  JOIN book_prices 
    ON favorite_books.book_price = book_prices.id;

