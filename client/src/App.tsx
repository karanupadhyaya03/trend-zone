import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { USER_DISPLAY_STRINGS as STRINGS } from './resources/user_display_strings';
import { useContext, useEffect } from 'react';
import { Store } from './Store';

function App() {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar
          expand="lg"
          className={
            mode === 'light' ? 'custom-navbar-light' : 'custom-navbar-dark'
          }
          variant={mode}
        >
          <Container>
            <Navbar.Brand>{STRINGS.title}</Navbar.Brand>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
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
