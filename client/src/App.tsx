import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { USER_DISPLAY_STRINGS as STRINGS } from './resources/user_display_strings';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>{STRINGS.title}</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/" className="nav-link">
              {STRINGS.navbar.cart}
            </a>
            <a href="/" className="nav-link">
              {STRINGS.navbar.signIn}
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">{STRINGS.footer}</div>
      </footer>
    </div>
  );
}

export default App;
