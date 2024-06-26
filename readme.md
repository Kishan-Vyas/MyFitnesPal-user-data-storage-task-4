# MyFitnessPal User Registration System

## Description

This project is a simple user registration and login system for a fitness application, allowing users to create profiles, log in, and track their daily nutritional intake. The application is built using Node.js, Express, and EJS, and stores data in JSON files.

## Features

- User registration with name, age, fitness goals, and password.
- User login with name and password.
- User profile displaying user information and daily nutritional entries.
- Form to input daily nutritional intake, including calories, protein, fat, carbohydrates, and exercise routines.
- Data stored in JSON files for simplicity.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/myfitnesspal.git
    cd myfitnesspal
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create the data directory and initialize the `users.json` file:
    ```sh
    mkdir data
    echo "[]" > data/users.json
    ```

## Usage

1. Start the server:
    ```sh
    node app.js
    ```

2. Open a web browser and navigate to `http://localhost:3000`.

## Routes

- **GET /users/register**: Display the registration form.
- **POST /users/register**: Handle user registration.
- **GET /users/login**: Display the login form.
- **POST /users/login**: Handle user login.
- **GET /users/profile/:id**: Display the user profile.
- **POST /users/profile/:id/entry**: Handle the submission of daily nutritional entries.

## Testing

Run the automated tests using Jest:
```sh
npm test



.
├── app.js
├── data
│   └── users.json
├── package.json
├── routes
│   └── userRoutes.js
├── utils
│   └── fileUtils.js
├── views
│   ├── login.ejs
│   ├── profile.ejs
│   ├── register.ejs
│   └── index.ejs
└── tests
    └── userRoutes.test.js
