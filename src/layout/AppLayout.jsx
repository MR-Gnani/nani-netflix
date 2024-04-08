import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet} from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className=''>
      <Navbar expand="lg" className="px-5 bg-custom fixed-top" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand><img src="https://i.namu.wiki/i/-I8NUqTE7uADT0au1fxan7mljOIopICG16Ifsjh4zPFW1FGXEilmcwwo-VI8Ho10N7Z7Q5qWmaFmNllOpQqWgg.svg" width={93} alt=''/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 bg-transparent"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </div>
  );
};

export default AppLayout
