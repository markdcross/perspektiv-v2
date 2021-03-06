import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-v2/authContext';
import { useHistory } from 'react-router-dom';

function LogoutBtn() {
  // bring in the auth context and import the logout function from it
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const history = useHistory();

  // handle logout button clicks
  const onLogout = () => {
    history.push('/');
    logout();
  };

  return (
    <Col className="text-right pt-2">
      <Link onClick={onLogout} to="/">
        <Button content="LOGOUT" basic />
      </Link>
    </Col>
  );
}

export default LogoutBtn;
