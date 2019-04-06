# HackYourFutureBE Class 2 Project - BeMentor

BeMentor is a mentoring platform that aims to get and keep women in the information technology sector. It is being developed by students and the coordination team of HackYourFuture at BeCentral. BeCentral is a digital campus in the heart of Brussels, and will also be the physical meeting place to facilitate mentorships as a result of BeMentor.
The initial version of the platform will focus mostly on matchmaking and first steps towards in-person mentorships.


### Goals for the students
  - Learn to understand an existing codebase in a short period of time
  - Get experience working on existing projects
  - Get experience working on open-source projects
  - Get familiar with the basics of project management with agile
  - Become comfortable with reporting about your work and communicating within a team

You will also receive some CV and LinkedIn training to get ready for the Belgian job market.


## Getting started

This project will test your skill & knowledge on everything you've learned so far. It includes `React`, `Node` and `MongoDB`.

### Structure

The application has the following structure:

`client`
Folder for everything front-end related. Houses the React application.

`client/src/App.jsx`
Application entrypoint with `react-router` definitions.

`client/src/api`
One file per resource (e.g. module, path, user) that has `XHR`/`fetch` functions for retreiving and manipulating data from the API.

`client/src/assets/css`
All of your styles, the methodology/flavouring/preprocessor you use, is all up to you.

`client/src/assets/images`

`client/src/components`
All of your components, group these up per page.



`server`
Folder for everything back-end related. Houses a decoupled, Node API

`server/src/controller`
`server/src/model`
`server/src/route`
Each of these folders have one file per resource.

### Setup

#### Client-side

Install client dependencies.
From the root directory navigate to the client directory.
We are going to use [yarn](https://yarnpkg.com/lang/en/) (a node js package manager) to install the node depedencies. These include but are not limited to React, Babel, ... .
```
$ cd client
$ yarn install
```
The development server can be started by running
```
$ npm run start
```
You can take a look at the other possibilities in the [package.json](https://github.com/HackYourFutureBEHomework/class2-project-bementor/blob/master/server/package.json) file under `scripts`.

#### Server-side

Install server side dependencies.
```
$ cd server
$ yarn install
```
The development server can be started by running
```
$ npm run start
```

But before you do that you need to configure a `MONGODB_URL` and `JWT_SECRET`.
This is where our application will connect to a mongo server, as well as use the secret for token signing.
From the root directory create an environment file.
```
$ touch .env
```

Open the `.env` in your editor and add a connection url, and a random string
```
MONGODB_URL=mongodb://localhost:27017/bementor
JWT_SECRET=dqfF4T^JpLZ7AgL$OUYMHz2eueh5ElPWFrflP3DjkQ@4HF$H882b5@b7
```
The connection url can also be a remote host.

After configuring the mongo url the app should start without errors.
Optionally, you can also add a `ENVIRONMENT` variable. If set to `production`, it will set the `secure` flag on cookies to `true`, which means they will only be set when the applications is served over HTTPS.
