// filepath: /Users/gavingarcia/Desktop/bootcamp/UCI-VIRT-FSF-PT-06-2023-U-LOLC/21-mern/bse/client/src/pages/SavedBooks.jsx
import React from 'react';
import { Jumbotron, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId },
      });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <Container>
      <Jumbotron>
        <h1>Viewing saved books!</h1>
      </Jumbotron>
      <Row>
        {userData.savedBooks?.map((book) => (
          <Col key={book.bookId} md="4">
            <Card>
              <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className="small">Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavedBooks;