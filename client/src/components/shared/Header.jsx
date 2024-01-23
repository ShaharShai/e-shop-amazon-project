import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "../../Store";
import { SIGN_OUT } from "../../actions";
 
function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    localStorage.removeItem('userInfo');
    ctxDispatch({ type: SIGN_OUT })
  }

  return (
    <>
      <header>
        <NavBar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <NavBar.Brand>
                <img
                  src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                  width={80}
                />
              </NavBar.Brand>
            </LinkContainer>
            <SearchBox />
            <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
              <Link to="/cart" className="nav-link">
                <i className="fa fa-shopping-cart text-white"></i>
              </Link>
            </nav>
            {
              userInfo ? (
                <NavDropdown title={userInfo.name} className='text-white'> 
                  <NavDropdown.Divider/>
                  <Link to="/" className="dropdown item" onClick={signOutHandler}>Sign out</Link>
                </NavDropdown>
              ) : 
              <Link to="/signin" className="text-white nav-link">
              Sign In
            </Link>
            }
          </Container>
        </NavBar>
      </header>
    </>
  );
}

export default Header;
