![Perspektiv Loading Image](client/public/assets/images/gif/PerspektivScript.gif)

#### **Explore and discover Richmond through its arts and culture.**

---

## **Table of Contents**

1. [Description](#Description)
1. [User Story](#User-Story)
1. [Feature List](#Feature-List)
1. [Packages & Libraries](#Packages-&-Libraries)
1. [Tech Stack](#Tech-Stack)
1. [Installation](#Installation)
1. [License](#License)
1. [Security](#Security)
1. [Contributions](#Contributions)
1. [Authors](#Authors)

---

## **Description**

Perpektiv provides a unique opportunity to explore and discover Richmond through its eclectic art and diverse culture. By harnessing the data originally collected by the Richmond Mural Project, Perspektiv provides mural and artist information with a social and gamified spin. Coupled with directions and nearby restaurant options, Perspektiv provides something for everyone. Whether you are a seasons Richmonder or new in town, you will find something fascinating to discover about this great and weird city.

---

## **User Story**

_AS A_ Richmonder or visitor <br />
_I WANT_ to explore the city and experience things that I enjoy (who doesn’t love art and food??)<br />
_SO THAT_ I can have a deeper appreciation and love for this city and its culture

---

## **Feature List**

- Geocoder for exact location and dynamic directions
- RESTful API documentation via Postman
- Protected routes and user authentication
- Gamification logic that levels up users as they visit more POIs
- Error handling and error message displays
- Photo uploads and comments on murals
- QR code integration automatically updates user progress ([see video](https://www.awesomescreenshot.com/video/2723980?key=d33624ce6d5103c6cd4bc6ed04faefcf))

---

## **Packages & Libraries**

Perspektiv leverages a number of libraries and packages to create a fast, responsive, and modern web application. Below are some of the packages that help our application run smoothly and efficiently:

| Name (a-z)             | Usage                                                                    | Installation                   |
| ---------------------- | ------------------------------------------------------------------------ | ------------------------------ |
| axios                  | Handles CRUD operations for both frontend and backend API calls          | `npm i axios`                  |
| bcryptjs               | Hashes user credentials before passing to and storing in the database    | `npm i bcryptjs`               |
| cookie-parser          | Middleware which parses cookies attached to the client request object    | `npm i cookie-parser`          |
| express-mongo-sanitize | Middleware which sanitizes data to prevent MongoDB operator injection    | `npm i express-mongo-sanitize` |
| framer                 | Library that helps drive Perspektiv's interactive animations             | `npm i framer`                 |
| framer-motion          | An open source and production-ready motion library for React             | `npm i helmet`                 |
| helmet                 | Used to add an additional layer of security to the Express backend       | `npm i framer-motion`          |
| jsonwebtoken           | Safely and securly transmits user credentials via JSON object            | `npm i jsonwebtoken`           |
| mapbox                 | Leverages Mapbox services for Perspektiv's custom map view               | `npm i mapbox`                 |
| morgan                 | Used to log HTTP requests in the node console                            | `npm i morgan`                 |
| mongoose               | Enables object modeling for our MongoDB database                         | `npm i mongoose`               |
| multer                 | Middleware for handling photo uploads on mural posts                     | `npm i multer`                 |
| node-geocoder          | Used to get user location and lookup nearby points of interest           | `npm i node-geocoder`          |
| react-bootstrap        | Bootstrap 4 components built with (and for) React (used for styling)     | `npm i react-bootstrap`        |
| react-map-gl           | Renders Perspektiv's interactive map view                                | `npm i react-map-gl`           |
| react-responsive       | Media queries in react for responsive design                             | `npm i react-responsive`       |
| semantic-ui-react      | The official Semantic-UI-React integration (used for styling)            | `npm i semantic-ui-react`      |
| slugify                | Used to create clean URL slugs that contain no foreign symbols           | `npm i slugify`                |
| uuidv4                 | Used to create universally unique identifiers for Perspektiv's data sets | `npm i uuidv4`                 |
| xss-clean              | Sanitize user input coming from POST body, GET queries, and url params   | `npm i xss-clean`              |

---

## **Tech Stack**

- **M**ongoDB
- **E**xpress.js
- **R**eact.js
- **N**ode.js

#### Additional Technologies

- Geolocation with Mapbox API
- Nodemailer & SendGrid
- Custom error handling middleware
- Custom auth & protected route middleware

---

## **Installation**

1. Clone the repo: `git clone https://github.com/markdcross/perspektiv-v2.git`
2. Install server-side NPM packages: `npm i`
3. Install client-side NPM packages: `cd client && npm i`

---

## **License**

Distributed under the MIT License.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## **Security**

Here are some of the added security measures that were taken to ensure Perspektiv not only could protect itself from unwarranted activity, but also the art that is represented on it:

- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against HTTP parameter pollution
- Add headers for security (helmet)
- Use CORS to make API public (for now)

---

## **Contributions**

**Current Contributors:**

- Josh Allan
- Mark Cross
- Danny Fraley
- Roberto Rupert

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

---

## **Authors**

Below is contact information for the authors of this application. Please feel free to reach out directly if additional questions exist.

| Name           | Email                    | Portfolio                                                                  | Github                                        |
| -------------- | ------------------------ | -------------------------------------------------------------------------- | --------------------------------------------- |
| Josh Allan     | allan.josh07@gmail.com   | [joshallan.dev](https://www.joshallan.dev/)                                | [jallan07](https://github.com/jallan07)       |
| Mark Cross     | markdcross@gmail.com     | [markdcross.dev](https://www.markdcross.dev/)                              | [markdcross](https://github.com/markdcross)   |
| Danny Fraley   | dannyfraley@gmail.com    | []()                                                                       | [dannyfraley](https://github.com/dannyfraley) |
| Roberto Rupert | roberto@robertorubet.com | [bertodemus.github.io/Bifurcate/](https://bertodemus.github.io/Bifurcate/) | [Bertodemus](https://github.com/Bertodemus)   |

---

### Thank you for using Perspektiv!
