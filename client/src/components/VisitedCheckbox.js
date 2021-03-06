import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import muralsAPI from '../utils/murals-API';

// auth context
import AuthContext from '../context/auth-v2/authContext.js';

const VisitedCheckbox = (props) => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  useEffect(() => {
    // get the user and store it in a variable that we will use for qr code scans
    populateCheckmark();
    // eslint-disable-next-line
  }, []);

  const populateCheckmark = () => {
    if (
      user &&
      user.data.muralsVisited.filter(
        (muralVisited) => muralVisited.mural.toString() === props.artId
      ).length > 0
    ) {
      return setVisitedState(true);
    }
  };

  const [visitedState, setVisitedState] = useState(false);

  // function that handles when a user clicks the visited checkbox for a mural
  const visitMural = async () => {
    if (visitedState === false) {
      muralsAPI
        .visitMural(props.artId, user.data._id)
        .then(() => setVisitedState(true))
        .then(() => loadUser());
    } else if (visitedState === true) {
      muralsAPI
        .unvisitMural(props.artId, user.data._id)
        .then(() => setVisitedState(false))
        .then(() => loadUser());
    }
  };

  return (
    <Checkbox label="VISITED" onChange={visitMural} checked={visitedState} />
  );
};

export default VisitedCheckbox;
