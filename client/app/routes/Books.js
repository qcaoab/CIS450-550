import React from 'react';
import {
  Container, Card, Row, Col
} from '../components';

const info = {'isbn': '',
'text_reviews_count': '1',
'series': [],
'country_code': 'US',
'language_code': 'eng',
'popular_shelves': [{'count': '8', 'name': 'to-read'},
 {'count': '3', 'name': 'poetry'},
 {'count': '2', 'name': 'currently-reading'},
 {'count': '1', 'name': '01-kindle'},
 {'count': '1', 'name': 'real-books'},
 {'count': '1', 'name': 'personal-library'}],
'asin': '',
'is_ebook': 'false',
'average_rating': '3.83',
'kindle_asin': '',
'similar_books': [],
'description': 'Number 30 in a series of literary pamphlets published monthly and available at the price of 15 cents per copy, or a yearly subscription (19 numbers) for $1.25',
'format': 'Paperback',
'link': 'https://www.goodreads.com/book/show/16037549-vision-of-sir-launfal-and-other-poems',
'authors': [{'author_id': '15585', 'role': ''},{'author_id': '15586', 'role': ''},{'author_id': '15581', 'role': ''}],
'publisher': 'Houghton, Mifflin and Company',
'num_pages': '80',
'publication_day': '1',
'isbn13': '',
'publication_month': '11',
'edition_information': '',
'publication_year': '1887',
'url': 'https://www.goodreads.com/book/show/16037549-vision-of-sir-launfal-and-other-poems',
'image_url': 'https://images.gr-assets.com/books/1348176637m/16037549.jpg',
'book_id': '16037549',
'ratings_count': '3',
'work_id': '5212748',
'title': 'Vision of Sir Launfal and Other Poems',
'title_without_series': 'Vision of Sir Launfal and Other Poems'};

export default function BookPage() {


  const author_str = info.authors.map(obj=>obj.author_id)
    .join(', ')
    .replace(/, ([^,]*)$/, ' and $1')

  return (
    <Container>
      <Row>
    <Col lg={4}>
    <img src={info.image_url} alt="book image"  height={500}/>
    </Col>
    <Col lg={8}>
    <h2>{info.title}</h2>
      <span class="h5">{author_str}</span>
      <span className="mx-2">·</span>
      <span class="h5">{info.num_pages} pages</span>
      <span className="mx-2">·</span>
      <span class="h5">Rating {info.average_rating}/5</span>
    <br/>
    <br/>
      <span>
      {info.description}
      </span>
      <br/><br/>
      <span class="h5">Quotes</span>
      <br/><br/>
      <span class="h5">Reviews</span>
      <br/><br/>
      <span class="h5">Author Profile</span>
    </Col>

      </Row>

    </Container>
);
}