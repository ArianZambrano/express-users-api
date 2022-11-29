<a name="readme-top"></a>

<br />
<div align="center">
  <h3 align="center">Publications API</h3>

  <p align="center">
    Social network where you can share your thoughts and sell or buy whatever you want.
    <br />
    <a href="https://github.com/ArianZambrano/express-users-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#tech-used">Tech used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#documentation">Documentation</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Social network where you can interact with other users. This API handles the operations of following and unfollowing of other users. It uses token-based authentication which are provided by the Users API.

### Features

- Token authentication
- Follow and Unfollow operations
- User operations

### Tech used
- JavaScript
- MongoDB
- Node.js
- Express
- Cloudinary

## Getting Started

### Prerequisites
In order to get started and run the project you have to meet certain prerequisites:
- Node.js 16.5 or newer
- Express 4.17 or newer
- A MongoDB cluster
- A Cloudinary account

Next, create a `.env` file and fill the next fields
```properties
PORT=3000
MONGODB_URI=<mongodb_uri>
CLOUDINARY_URL=<cloudinary_cloud>
SECRET_KEY=<jwt_secret>
EXPIRATION_DATE=12hv

### Installation

First, create an environment, activate it and install the dependencies
```bash
npm install
```

## Usage
Run the project with start
```bash
npm start
```
If everything is in order you can now make requests to `localhost:3000`.



