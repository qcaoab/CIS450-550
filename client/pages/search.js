import React from 'react';
import Link from 'next/link';
import {
    Container,
    Row,
    Col,
    CardColumns
} from './../components';
import { HeaderMain } from "./../features/components/HeaderMain";
import { SearchResultsLeftNav } from
    "./../features/components/SearchResults/SearchResultsLeftNav";
import { SearchResultsHeader } from
    "./../features/components/SearchResults/SearchResultsHeader";
import { SearchResultsCard } from
    "./../features/components/SearchResults/SearchResultsCard";
import { Paginations } from "./../features/components/Paginations";
import { UsersResultsCard } from '../features/components/SearchResults/UsersResultsCard';

const SearchResults = () => (
    <React.Fragment>
        <Container>
            <HeaderMain 
                title="Search Results"
                className="mb-5 mt-4"
            />

            { /* START Content */}
            <Row>
                <Col lg={ 3 }>
                    <SearchResultsLeftNav />
                </Col>
                <Col lg={ 9 }>
                    <SearchResultsHeader />
                    <SearchResultsCard />
                    <SearchResultsCard />
                    <SearchResultsCard />
                    <SearchResultsCard />
                    <SearchResultsCard />
                    <SearchResultsCard />
                    <SearchResultsCard />
                    {/* <CardColumns>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                        <UsersResultsCard title="asdf" image_url='https://images.gr-assets.com/books/1348176637m/16037549.jpg'/>
                    </CardColumns> */}
                    <div className="d-flex justify-content-center">
                        <Paginations />
                    </div>
                </Col>
            </Row>
            { /* END Content */}
        </Container>
    </React.Fragment>
);

export default SearchResults;
