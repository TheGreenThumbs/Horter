# Horter

# Elevator Pitch

Horter is an application which helps users create gardens, update and maintain information about them,
and learn more about how to add to them and keep them growing strong. It features a helpful ChatBot which can
troubleshoot gardener questions, as well as an Augmented Reality garden planning display which will help users
envision what their garden will look like ‘off-the-page’.


# Core Concepts

The application is composed of several core features. App.vue is the main template. The routes are rendered on App.vue and
function inside of its template.
At any given page in the app it is possible to access a menu, which can be located as a hamburger menu in the top-left of the page.
The code for the menu is found in the files ‘Sidebar.vue’ and ‘Navigation.vue’. This menu allows for navigation to different parts
of the app.

In addition to the omnipresent menu, it is also possible to enlist the help of the chatbot at any page in the app.

Like the main menu, it can be found as a button and when clicked, will render a modal which contains the dialog between user and chatbot.
This is where the user will query the bot for pertinent information about their garden or the plants within. The relevent files for this chatbot
are found in the Message.vue, Chatbot.vue and ChatbotModal.vue files.
The main view of the garden is comprised of GardenLayout.vue and GardenMain.vue. This is the ‘centerpiece’ of the app where the user can view
in-depth information about one of their gardens.

## Getting Started

To run Locally

- Ensure that you are running Node Version 12
- Make sure you have postgres installed and running and there is a database named horter
- Run `npm install`
- `npm run build-watch` will start webpack and create a client/build folder for your transpiled vue files
- `npm run start-dev` will start your local server
- These are the environment variables you might need
  - RESET_DB set to true if you want your db to reset when you run your server and fill with dummy data
  - DB_PASS your database password, defaults to `""`
  - DB_HOST your host, defaults to `"localhost"`
  - DB_USER your username, defaults to `"postgres"`
  - DB_NAME your database name, defaults to `"horter"`

To run tests

- `npm run test` Will run tests, and empty and refill the database with dummy data

To Deploy on AWS

- Make sure that the Elastic Beanstalk cli is installed locally
- Run `eb init` Go through the setup and select Node.js as the platform
- Run `eb create` Go through the setup and pick application load balancer
- Make sure to make your build folder and push it to the repo that is being deployed
- Go through the steps to create a Postgres RDS on AWS and connect their security groups
- Add the corresponding Environment variables to your Elastic Beanstalk Environment
- When you make changes and would like to redeploy run `eb deploy <name>`

Tech Stack:

The client was built using Vue.js framework and Buefy library.

The server was built using Express, and it utilizes Sequelize for PostgreSQL.

The tests were implemented using Mocha and Chai.

Vue is a Progressive JavaScript framework.
Vue.js Documentation: [a link](https://vuejs.org/v2/guide/)

Buefy is a library of responsive UI components for Vue.js based on Bulma framework.
Buefy Documentation: [a link](https://buefy.org/documentation/)

Express is a web application framework.
Express Documentation: [a link](https://expressjs.com/en/api.html)

PostgreSQL is a relational database management system (RDBMS) that is SQL complaint.
PostgreSQL Documentation: [a link](https://www.postgresql.org/docs/)

Sequelize is a promise-based Object-Relational Mapping (ORM).
Sequelize Documentation: [a link](https://sequelize.org/master/)

Mocha is a JavaScript framework that makes asynchronous testing simple.
Mocha Documentation: [a link](https://mochajs.org/)

Chai is a Behavior-Driven Development (BDD) / Test-Driven Development (TDD) assertion library.
Chai Documentation: [a link](https://www.chaijs.com/api/)
