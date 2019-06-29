# BeMentor

BeMentor is a mentoring platform that aims to get and keep women in the information technology sector. BeCentral is a digital campus in the heart of Brussels, and will also be the physical meeting place to facilitate mentorships as a result of BeMentor.
The initial version of the platform will focus mostly on matchmaking and first steps towards in-person mentorships.

### Technologies & prerequisites

BeMentor uses:

- React 
- Node
- MongoDB

To run the project, you will need:

- Node version >=10.x installed
- A MongoDB database, either local or hosted

## Getting started

### Client-side

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


### Server-side

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
