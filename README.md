![Perspektiv Loading Image](client/public/assets/images/gif/PerspektivScript.gif)

---

## **Table of Contents**

1. [Description](#Description)
2. [Feature List](#Feature-List)
3. [Packages & Libraries](#Packages-&-Libraries)
4. [Tech Stack](#Tech-Stack)
5. [Installation](#Installation)
6. [License](#License)
7. [Security](#Security)
8. [Contributions](#Contributions)
9. [Authors](#Authors)

---

## **Description**

Discover the art of Richmond.

---

## **Feature List**

- Geocoder for exact location and dynamic directions
- RESTful API documentation via Postman
- Protected routes and user authentication
- Gamification logic that levels up users as they visit more POIs
- Error handling and error message displays
- Photo uploads and comments on murals

---

## **Packages & Libraries**

Perspektiv leverages a number of libraries and packages to create a fast, responsive, and modern web application. Below are some of the top packages that help our application run smoothly:

| Name (a-z)             | Usage                                                                 | Installation                   |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------ |
| axios                  | Handles CRUD operations for both frontend and backend API calls       | `npm i axios`                  |
| bcryptjs               | Hashes user credentials before passing to and storing in the database | `npm i bcryptjs`               |
| cookie-parser          | Middleware which parses cookies attached to the client request object | `npm i cookie-parser`          |
| express-mongo-sanitize | Middleware which sanitizes data to prevent MongoDB operator injection | `npm i express-mongo-sanitize` |
| framer-motion          | An open source and production-ready motion library for React          | `npm i helmet`                 |
| helmet                 | Used to add an additional layer of security to the Express backend    | `npm i framer-motion`          |
| jsonwebtoken           | Safely and securly transmits user credentials via JSON object         | `npm i jsonwebtoken`           |
| mongoose               | Enables object modeling for our MongoDB database                      | `npm i mongoose`               |
| multer                 | Middleware for handling photo uploads on mural posts                  | `npm i multer`                 |
| node-geocoder          | Used to get user location and lookup nearby points of interest        | `npm i node-geocoder`          |
| react-bootstrap        | Bootstrap 4 components built with (and for) React (used for styling)  | `npm i react-bootstrap`        |
| react-map-gl           | Renders Perspektiv's interactive map view                             | `npm i react-map-gl`           |
| react-responsive       | Media queries in react for responsive design                          | `npm i react-responsive`       |
| semantic-ui-react      | The official Semantic-UI-React integration (used for styling)         | `npm i semantic-ui-react`      |

---

## **Tech Stack**

- MongoDB
- Express.js
- React.js
- Node.js

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

_Josh Allan, Mark Cross, Danny Fraley, Roberto Rupert_

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
