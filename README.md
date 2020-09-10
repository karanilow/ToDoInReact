# To do list - MERN app

![MERN](https://github.com/karanilow/ToDoInReact/blob/master/img/MERN.png)

![Yarn Version](https://badgen.net/npm/v/yarn)

This is a simple 'To do list' app created with Node.js, React.js, and a Mongo database.

- Type some tasks
- See list in the middle
- Lists in lists enable

![APP](https://github.com/karanilow/ToDoInReact/blob/master/img/Introduction.png)

## Table of content

- [Description](#Description)
- [Technologies](#Technologies)
- [Setup](#Setup)
- [Example](#Example)
- [Sources](#Source)

### Description

This is a project for training purposes. The indenture is to apply and experiment materials from online courses : [Develop in Node.js](https://openclassrooms.com/fr/courses/1056721-des-applications-ultra-rapides-avec-node-js) (in French), [Create a web app using React](https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js) (in French).

### Technologies

- React v16.3.1
- Node v10.19.0
- Express v4.17.1
- Mongoose v5.10.3
- Nodemon v2.0.4
- Yarn v1.22.5

### Setup

This app requires [Node.js](https://nodejs.org/) to run.

🦶 First step :
Install the dependencies and start the server.

This app uses yarn | Package manager, as a result the commands to install dependencies will be :

For Linux systems

```sh
$ cd server
$ yarn install
$ cd ..
$ yarn start:server
```

Same thing for the client side app.
In another terminal :

For Linux systems

```sh
$ cd client
$ yarn install
$ cd ..
$ yarn start:client
```

🤿 Insights: `start:server` & `start:client` are commands configured in the first package.json file of the directory. That's why these commands won't be recognize if you are in the client/ or server/ directory.

🦶 Second step :
Configure your database access.

This app uses MongoDB Atlas.

> MongoDB Atlas is MongoDB’s managed MongoDB as a Service. That means that Atlas takes the responsibility of hosting, patching, managing and securing your MongoDB cluster, and leaves you free for putting it to good use.
> source: [OptimalBi](https://optimalbi.com/mongodb-atlas-what-why/)

1. Create a secret file
2. Copy and paste some code
3. Add your access details

Create a secret file:
For Linux systems

```sh
$ cd server
$ touch secret.js
```

Copy the follow code and paste it in secret.js:

```js
const secrets = {
  dbUri:
    "mongodb+srv://<user_name>:<user_pswd>@cluster0-rggnq.mongodb.net/<database_name>?retryWrites=true&w=majority",
  user: "<user_name>",
  pswd: "<user_pswd>",
};

export const getSecret = (key) => secrets[key];
```

Complete the code with the relevant information

| Variable        | Description                                     |
| --------------- | ----------------------------------------------- |
| <user_name>     | The user's name you want to access the database |
| <user_pswd>     | The user's pswd                                 |
| <database_name> | the database's name on your Mongo Db Atlas      |

🥳 Finished !

### Example

First list is call Home by default.
Your first tasks will be added here and configured as being a list themselves or not :
![Home](https://github.com/karanilow/ToDoInReact/blob/master/img/Home.png)

Then you can naviguate between list using the list icons and the navigation bar:
![Home](https://github.com/karanilow/ToDoInReact/blob/master/img/ListInList.png)

By default, the new task will be added to the list you are currently watching. If you want to add the new task to another list, without having to navigate, you can do it via the option menu:
![Home](https://github.com/karanilow/ToDoInReact/blob/master/img/Input.png)

### Source

Many thanks to Bryan Gilbraith for his [post](https://medium.com/@bryantheastronaut/ok-here-we-go-b9f683c5a00c) that helped me setting things up.
