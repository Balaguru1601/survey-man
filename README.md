# Survey Man

A survey management project.

Built with Vite in React.js, React router, Redux.js and MUI for Client side

Mongoose, Express.js, JWT tokens used for Server.

The admin can create forms with the following properties:

-   Name of survey
-   Input fields of text
-   Input fields of radio type supporting yes/no replies

The admin has the access to all the responses.
The survey can be changed and deleted by the admin.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend

`DB_URL` - the Mongo Atlas link

`SECRET` - a secret key for encryption

`EXPIRESIN` - the validity of the login session, gives in hours like 10h

### Frontend

`VITE_BACKEND_URL` - the backned url i.e http://localhost:5173

## Installation

Clone the project

```bash
  git clone https://github.com/Balaguru1601/survey-man.git
```

Go to the project directory

```bash
  cd Frontend
  npm install
  npm run dev
```

The client side will run in http://localhost:5173/

```bash
  cd Backend
  npm install
  npm run dev
```

The server will run at port http://localhost:5000/

## Deployment

The project is deployed in vercel.

👉 [Link](https://survey-man.vercel.app/)
