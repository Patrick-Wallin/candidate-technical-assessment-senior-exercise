# Gaggle Backend Project
This is a backend API project that is building in NodeJS.  It would provide information to the frontend developer.  The `REQUIREMENTS.md` would show database schema and API route information.  We will provide some example below.

## Table of Contents
* [General Info](#general-information)
* [Technologies](#technologies)
* [Set up database](#set-up-database)
* [Establish Environment Variables](#establish-environment-variables)
* [Install](#install)
* [Instruction of API Request](#instruction-of-api-request)
* [Contact](#contact)

## General Information
Front-end Developers would have an opportunity to search the data based on person's id or name.  

## Technologies 
- TypeScript
- Express
- ESLint
- Prettier
- Jasmine
- NPM
- NodeJS
- Migration

## Set up database

Install PostgresSQL

Create database and user (you can use pgAdmin 4 app as well)
- Go to new command or terminal
- Type the following: psl -U postgres
- CREATE USER gaggle_user WITH PASSWORD 'gaggleuserpassword';
- Then do the following to create database
  - CREATE DATABASE people_movies_dev;

Connect to the database
- Type the following: \c people_movies_dev

Grant all priviledges
- Type the following: GRANT ALL PRIVILEDGES ON DATABASE people_movies_dev TO gaggle_user;

Establish new tables on the database, people_movies_dev
- Open new terminal and change to the root directory of this project
- Type the following at the command: npm run migrate-up-dev

## Environment Variables
- Create new file called .env on your root directory
- Open the file in your editor
- Copy the following in your file except you would need to change few things
  - POSTGRES_HOST=127.0.0.1
  - POSTGRES_DEV_DB=people_movies_dev
  - POSTGRES_PROD_DB=people_movies_prod
  - POSTGRES_USER=postgres
  - POSTGRES_PASSWORD=postgres
  - ENV=DEV
  - PORT=3000
  
## Install
Install all the modules
```
npm install
```
Build or Convert TypeScript to JavaScript
```
npm run build
```
Run migration for dev (up)
```
npm run migrate-up-dev
```
Run migration for dev (down)
```
npm run migrate-down-dev
```
Run migration for prod (up)
```
npm run migrate-up-prod
```
Run migration for prod (down)
```
npm run migrate-down-prod
```
Start the server which will start nodemon based on src/index.ts
```
npm run start-ts 
```
Start the server which will start node based on dist/src/index.js
```
npm run start-js 
```
Run the test including running the migration such as down and up and Jasmine
```
npm run test-dev-ts  
```
To keep the code look clean and nice, run the following command:
```
npm run prettier
```
To check any variable or analyze any code that may look the problem, run the following command:
```
npm run lint
```

## Instruction of API Request
People 
- Create new person [POST]
  - Example: http://localhost:3000/api/person ( { name: 'Patrick' } )
  - Input: name
  - Return: person's information in JSON (id,name) or error message if any
- Get all list of people [GET]
  - Example: http//localhost:3000/api/people
  - Input: none 
  - Return: list of people in JSON
- Get person's information based on person's id [GET]
  - Example: http://localhost:3000/api/people/1
  - Input: person's id
  - Return: person's information in JSON (id, name) or error message if any

Movie
- Create new movie [POST]
  - Example: http://localhost:3000/api/movie ( { name: 'Back to the Future' } )
  - Input: name
  - Return: movie's information in JSON (id,name) or error message if any
- Get all list of movies [GET]
  - Example: http//localhost:3000/api/movies
  - Input: none 
  - Return: list of movies in JSON
- Get movie's information based on movie's id [GET]
  - Example: http://localhost:3000/api/movies/1
  - Input: movie's id
  - Return: movie's information in JSON (id, name) or error message if any

People-Movie
- Create new people-movie [POST]
  - Example: http://localhost:3000/api/peoplemovies ( { person_id: 1, movie_id: 1 } )
  - Input: person's id, movie's id
  - Return: people-movie's information in JSON (id,person_id,movie_id) or error message if any
- Get all list of people-movies [GET]
  - Example: http//localhost:3000/api/peoplemovies
  - Input: none 
  - Return: list of people-movies in JSON

app.post('/api/search', getFullDataBasedOnPersonNameOrId);

Search
- Get list of results based on search's input [POST]
  - Example: http://localhost:3000/api/search ( { person_id: 1 } OR { person_name: 'AT' })
  - Input: person's id or person's name
  - Return: list of results in JSON (person_id, person_name, movie_id, movie_name)
  
## Contact
Created by [Patrick Wallin](https://www.linkedin.com/in/patrick-wallin) - feel free to contact me!


