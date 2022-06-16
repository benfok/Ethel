# Ethel
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
I used to always forget important things, but then I learned to organize everything by creating a reliable place to store those hard to remember items. Now I'm the most efficient granny around, and I can help you whippersnappers clear your mind-clutter and do the same! **Ethel** is not just an ordinary granny, or an ordinary list making application. Sure, you can create lists, sort them into categories and easily add and remove items, but you can also share lists with other people and collaborate instantly. 

Left your grocery list under the fridge magnet? Mobile-first development means your lists are right at home on your phone, and more importantly always with you. Want to know what items your partner or roommate just picked up from 5 aisles over? Share and work off the same list in the store, in real time. Need a place to share movie recommendations, gift ideas or party planning to-dos? Ethel's got you covered.

<details>
<summary><strong>Table of Contents</strong></summary>

- [Background, Credits and Tech](#background-credits-and-tech)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing Guidelines](#contributing-guidelines)
- [Tests](#tests)
- [Screenshots](#screenshots)
- [Questions and Links](#questions-and-links)
- [Details and Learnings](#details-and-learnings)
</details>

## Background, Credits and Tech

We began by defining a simple **USER STORY**

<details>
<summary><strong>User Story</strong></summary>
<blockquote>
<br>
<p>AS A busy person with lots to remember<br>
I WANT an easy way to keep track of my life and share information with others<br>
I WANT to create lists and categorize them however I want<br>
SO THAT I can refer back to them when I need them<br>
I WANT to be able to easily add and check off items<br>
SO THAT I can remember everything I need<br>
I WANT to share these individual lists with others<br>
SO THAT they can add or remove items and collaborate<br>
I WANT to be able to select who I share each list with<br>
SO THAT I can share what is relevant but still maintain privacy<br>
I WANT to save the users that I’ve shared lists with before<br>
SO THAT I can easily share other lists with them again<br>
I WANT the interface to be responsive and intuitive<br>
SO THAT it’s easy to add and review items</p>
<br>
</blockquote>
</details>

This app was built with contributions from the following:
- [benfok](https://github.com/benfok/): Full Stack Development: Back-end Node and Express setup, GraphQL queries and resolvers, authentication, database schemas, models and seeds. Front-end React and responsive custom CSS. Concept and wireframing.
- [mlfitz2](https://github.com/mlfitz2): Back-end models. Front-end responsive CSS. Concept and wireframing.
- [Dan-Klo](https://github.com/Dan-Klo): Utility, project planning and documentation. Concept and wireframing.

### Languages and Modules Used
Ethyl is a full-stack MERN application built using the following languages and modules:

- [MongoDB](https://www.mongodb.com) for data storage
- [Express.JS](https://expressjs.com/) as a webserver framework for [Node.JS](https://nodejs.org/api/documentation.html)
- Front-end built entirely using [React.JS](https://reactjs.org)
- Leveraging [GraphQL] and Apollo (https://graphql.org) for database CRUD operations
- Deployed on [Heroku](https://www.heroku.com)    
- Other Dependency Packages Include:
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (JWT) for authentication
  - [mongoose](https://www.npmjs.com/package/mongoose) as an ODM for MongoDB
  - [react-icons](https://www.npmjs.com/package/react-icons) as an icon library
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom) for in-app routing
  - [bcrypt](https://www.npmjs.com/package/bcrypt) module for password encryption for sign-up and login functionality
  - [dotenv](https://www.npmjs.com/package/dotenv) used to host credentials in an environment file 

## Installation
### Local Installation
- Clone the repo.
- Navigate to the root folder and run `npm init` followed by `npm run install` in order to install the dependencies.
- Be sure to add a MongoDB string and JWT session secret to the .env.EXAMPLE file and rename to .env.
- Run the command `npm run seed` to load seed data
- run `npm run develop` to run the application on your local machine running at http://localhost:3000/.

## Usage
To use the application sign-up by creating your own user or use the username and password stored in the seeds/userData.json file to login as Ethel. 

## License
Distributed under the **MIT** license.

## Contributing Guidelines
Contributions help our open source community to continue to evolve, and any contributions are greatly appreciated. If you have a suggestion that would improve this code please follow the directions below. I require that any and all changes adhere to the Code of Conduct outlined in the [Contributor Covenant](https://www.contributor-covenant.org/).

 - Fork the repo
 - Create your feature branch
 - Commit your changes
 - Push the branch and open a pull request

> _**Note:** Any contributions are understood to be under the same MIT that covers the project._

## Tests
There are currently no tests written for this application.

## Screenshots
Here are some screenshots of the deployed application

### Desktop
![Screenshot of lists](./server/assets/ethel-desktop1.png)

### Mobile
<p float="left">
<img src="./server/assets/ethel-signup.png" alt="mobile signup" width="160"/>
<img src="./server/assets/ethel-category.png" alt="mobile category" width="160"/>
<img src="./server/assets/ethel-list.png" alt="mobile list" width="160"/>
<img src="./server/assets/ethel-modal.png" alt="mobile modal" width="160"/>
<img src="./server/assets/ethel-move.png" alt="mobile move" width="160"/>
</p>

## Questions and Links
Please reach out with any questions regarding the application.

The epository in [GitHub](https://github.com/benfok/Ethel)

The deployed application on [Heroku](https://ethyl.herokuapp.com/)

## Details and Learnings
- Creating the list actions modal within the context of each list itself rather than the full page allows the user to easily see which list they are acting on and keeps the functionality intuitive. There is a risk with this approach due to the potential size conflict between the user search modal and the list card size, for example if a search for users to share a list returns a large number of results.
- Currently, the user must click Refresh on a shared list to view changes made by other users. Could consider a timed refresh here to make the app appear more dynamic.
- When a list is shared it first lands in the recipient's "Uncategorized" category, allowing them to the Move it to a category of their choice.
- When sharing a list, you cannot duplicate sharing, and lists can only be shared or deleted by their original owner.
- Could refactor to store data in a global context rather than prop drilling list and category information through so many components.

Some considerations for **future development** include:
  - Inclusion of a service worker and local/cache first fetch policies to allow for limited offline use and installation as a PWA.
  - Add functionality to remove or update categories and un-share lists.
  - Ability to sort and pin lists within categories.
  - Search function for lists by keywords/items in list.
  - Be able to add a comment to list items.
  - Reminder functionality.

Thanks for reading. Enjoy The App! And can I interest you in a hard butterscotch candy?