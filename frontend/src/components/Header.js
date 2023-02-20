import { Navbar, Container } from 'react-bootstrap';

const navbarStyle = {
    backgroundColor: '#e1e1e1'
};

const Header = ({ title }) => {
    return (
        <Navbar style={ navbarStyle } variant="light">
            <Container>
                <Navbar.Brand href="/">{ title }</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header;