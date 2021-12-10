# API Requirements
For the purposes of the exercise, pretend you're on a team working on a new website that customers can use to look up information about movies. Other team members are handling the front end, but you've been given the following task:

- We need to store a catalog of People. Each person needs a unique ID, name, and what movies they worked on.
- Create a web service that allows for two operations: searching for a person by either the unique ID, or by their name. Partial name search should work, so if the a Person's full name is "Bruce Wayne", then it should be reasonable for the function to return this result given any of the following search strings: "bru", "Bruce", "Wayne", "Bruce Wayne", etc.
- Both the inputs and outputs of these operations should be formatted in JSON.

## API Endpoints
#### People
- Index route: '/api/people' [GET]
- Show route: '/api/people/:id' [GET] 
- Create route: '/api/person' [POST]

#### Movies
- Index route: '/api/movies' [GET]
- Show route: '/api/movies/:id' [GET]
- Create route: '/api/movie' [POST]

#### People-Movies
- Index route: '/api/peoplemovies' [GET]
- Create route: '/api/peoplemovies' [POST]

#### Search
- Search route: '/api/search' [POST]

## Data Shapes
#### people
- id : PRIMARY KEY : integer
- name : varchar(250)

#### movies
- id : PRIMARY KEY : integer
- name : varchar(250)

#### people_movies
- id : PRIMARY KEY : integer
- person_id : integer - reference from people (id)
- movie_id: integer - reference from movies (id)