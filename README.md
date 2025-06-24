# Boston Informed Consent Directory Server

This project is a proof-of-concept that creates a directory of transgender health clinics in the Boston area. The backend focuses on two schemas: Site Users and Clinics.

Link to project: https://ic-directory.netlify.app/
Link to frontend repository: https://github.com/avalinde/codesquad-personal-project-client

## Tech used: 

JavaScript, Express, MongoDB

This app is built using Express.js with two main schemas: Site Users and Informed Consent Clinics.  Helmet, Cors, and Morgan middleware provide extra security and dev functionality. Clinic and user data stored in MongoDB cluster. Clinic Data has 3 essential components - Site name, Longitude, and Latitude (to render via Leaflet in the front end). User authentication is handled via Google OAuth and passport. Password secured using hash and salt method with bcrypt.

## Lessons Learned:

As the first full-stack web application completed by this developer, this product taught me many lessons- How to implement CRUD operations with a front and back end that communicate, how to work with open source API's for app features, website styling guidelines, and many more. To the community that supported me through this, I cannot express enough gratitude- thank you CodeSquad. Access to healthcare and transgender rights are human rights. 
