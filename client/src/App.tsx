import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { sampleProducts } from './data';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Trend zone</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/" className="nav-link">
              Cart
            </a>
            <a href="/" className="nav-link">
              Sign in
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Row>
            {sampleProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;