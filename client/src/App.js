import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import NavTabs from "./components/NavTabs";
import Home from './pages/Home';
import LocationContext from './context/LocationContext';
import MuralContext from './context/MuralContext';
import { AuthProvider } from './context/AuthContext';
import muralsAPI from './utils/murals-API';
// import authAPI from './utils/auth-API';
import { usePosition } from 'use-position';
import { Container } from 'react-bootstrap';
// import About from "./components/pages/About";
// import Blog from "./components/pages/Blog";
// import Contact from "./components/pages/Contact";

const App = () => {
  const [muralState, setMuralState] = useState([]);
  // const [userState, setUserState] = useState();

  useEffect(() => {
    // // check for a currently logged in user from the api
    // authAPI.getCurrentUser().then((data) => {
    //   // if the check comes back as a success, then set the userState object to the logged in user and set isAuthenticated to true
    //   if (data.status === 200) {
    //     setUserState({ data, isAuthenticated: true });
    //   }
    //   // otherwise, set isAuthenticated to false
    //   else {
    //     setUserState({ isAuthenticated: false });
    //   }
    // });

    // get the murals from the api
    muralsAPI.getMurals().then((data) => {
      setMuralState(data);
    });
  }, []);

  const position = usePosition();

  return (
    <AuthProvider>
      <MuralContext.Provider value={muralState}>
        <LocationContext.Provider value={position}>
          <Router>
            <Container fluid>
              {/* <NavTabs /> */}
              <Route path="/" component={Home} />
              {/* <Route exact path="/home" component={Home} /> */}
              {/* <Route exact path="/about" component={About} />
        <Route exact path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} /> */}
            </Container>
          </Router>
        </LocationContext.Provider>
      </MuralContext.Provider>
    </AuthProvider>
  );
};

export default App;

// import React, { useState } from "react";
// import ReactRoundedImage from "react-rounded-image";
// import {
//   Container,
//   Row,
//   Col,
//   Image
//  } from 'react-bootstrap';
//  import { Button, Checkbox } from 'semantic-ui-react';
// // import { BrowserRouter as Router, Route } from "react-router-dom";
// import Mapbucket from "./components/Mapbucket";
// import ScrollContent from "./components/ScrollContent";
// import MuralContent from "./components/MuralContent";
// import NavDesktop from "./components/NavDesktop";
// import NavDesktopM from "./components/NavDesktopM";
// import NavMobile from "./components/NavMobile";
// import { useMediaQuery } from 'react-responsive'
// import Sheet from 'react-modal-sheet';
// import { motion } from "framer-motion";
// // import * as muralData from "./data/murals.json";

// function App() {

//   const Desktop = ({ children }) => {
//     const isDesktop = useMediaQuery({ minWidth: 768 })
//     return isDesktop ? children : null
//   }
//   const Mobile = ({ children }) => {
//     const isMobile = useMediaQuery({ maxWidth: 767 })
//     return isMobile ? children : null
//   }

//   const [desktopMNav, setDesktopMNav] = useState(false);

//   const [isOpen, setOpen] = useState(false);

//   return (
//     // <Router>
//       <div>
//         <Container fluid>
//           <Row>
//             <Col md={7} className="mapSpace p-0">
//               <Mapbucket />
//             </Col>
//             <Col md={5}>
//               <Mobile>
//                 <Sheet
//                   isOpen={true}
//                   onClose={() => setOpen(false)}
//                   snapPoints={[600, 400, 90]}
//                   initialSnap={2}
//                   onSnap={snapIndex =>
//                     console.log('> Current snap point index:', snapIndex)
//                   }
//                   className="sheetZfix"
//                   >
//                   <NavMobile />
//                   <Sheet.Container>
//                     <Sheet.Header />
//                     <Sheet.Content>
//                       <ScrollContent />
//                     </Sheet.Content>
//                   </Sheet.Container>
//                 </Sheet>
//               </Mobile>
//               {desktopMNav ? <NavDesktopM /> : <NavDesktop />}
//               {/* <NavDesktop /> */}
//               <Desktop>
//                 <ScrollContent />
//                 {/* <MuralContent /> */}
//               </Desktop>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     // </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import ReactRoundedImage from "react-rounded-image";
// import * as muralData from "./data/murals.json";

// export default function App() {
//   const [viewport, setViewport] = useState({
//     latitude: 37.541290,
//     longitude: -77.434769,
//     width: "100vw",
//     height: "100vh",
//     zoom: 12
//   });

//   const [selectedMural, setSelectedMural] = useState(null);

//   // const [muralPop, setMuralPop] = useState({
//   //   imageWidth: "40",
//   //   imageHeight: "40",
//   // });

//   useEffect(() => {
//     const listener = e => {
//       if (e.key === "Escape") {
//         setSelectedMural(null);
//       }
//     };
//     window.addEventListener("keydown", listener);

//     return () => {
//       window.removeEventListener("keydown", listener);
//     };
//   }, []);

//   return (
//     <div>
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//         // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
//         onViewportChange={viewport => {
//           setViewport(viewport);
//         }}
//       >
//         {muralData.features.map(murals => (
//           <Marker
//             key={parseInt(murals.ExtendedData.Data[0].value)}
//             latitude={murals.latitude}
//             longitude={murals.longitude}
//           >
//             <button
//               className="marker-btn zoom"
//               onClick={e => {
//                 e.preventDefault();
//                 setSelectedMural(murals);
//               }}

//               // onMouseEnter={e => {
//               //   setMuralPop({
//               //     imageWidth: "150",
//               //     imageHeight: "150",
//               //   });
//               // }}

//               // onMouseLeave={e => {
//               //   setMuralPop({
//               //     imageWidth: "40",
//               //     imageHeight: "40",
//               //   });
//               // }}
//             >
//               {/* {murals.ExtendedData.Data.map((img, i) => {
//                 if (i === 6) {
//                   return (
//                   <div className="rounder" key={i}>
//                     <ReactRoundedImage
//                       image={img.value.__cdata}
//                       roundedColor="#ffffff"
//                       imageWidth="150"
//                       imageHeight="150"
//                       roundedSize="3"
//                     /> */}
//                     {/* <img src={img.value.__cdata} /> */}
//                   {/* </div>
//                   );
//                 }
//               }
//               )} */}

//               {murals.ExtendedData.Data.map((img, i) => {
//                 if (i === 6) {
//                   return (
//                   <div className="rounder" key={i}

//                   // onMouseEnter={e => {
//                   //   setMuralPop({
//                   //     imageWidth: "150",
//                   //     imageHeight: "150",
//                   //   });
//                   // }}

//                   // onMouseLeave={e => {
//                   //   setMuralPop({
//                   //     imageWidth: "40",
//                   //     imageHeight: "40",
//                   //   });
//                   // }}
//                   >
//                     <ReactRoundedImage
//                       image={img.value.__cdata}
//                       roundedColor="#ffffff"
//                       roundedSize="3"
//                       imageWidth="40"
//                       imageHeight="40"
//                       // {...muralPop}
//                     />
//                   </div>
//                   );
//                 }
//               }
//               )}

//             </button>
//           </Marker>
//         ))}

//         {selectedMural ? (
//           <Popup
//             latitude={selectedMural.latitude}
//             longitude={selectedMural.longitude}
//             onClose={() => {
//               setSelectedMural(null);
//             }}
//           >
//             <div>
//               <h2>{selectedMural.name}</h2>
//               <p>{selectedMural.ExtendedData.Data[2].value}</p>
//             </div>
//           </Popup>
//         ) : null}
//       </ReactMapGL>
//     </div>
//   );
// }
