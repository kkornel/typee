![alt text][logo]

Chat application created with :heart: for learning purposes only.

# Philosophy

Main purpose of this project was (and still is!) to expand my knowledge of JavaScript programming, by creating complex application, which would involve frontend and backend communicating which each other.

### Why chat application?

<!-- Before creating this project I've had a lot of ideas beginning with Video Streaming Service, through Survey App, ending at Medical Appointment Organizer for local doctor's office. But they all were very similar to the projects I already worked on. -->

Before creating this project I've had a lot of ideas, but they all were very similar to the projects I already worked on.

At this point, I've realized that I've never worked with Web Sockets, so now the choice was simple - create Real Time Chat Application.

### Inspiration

As my goal, I've decided to re-create one of the most popular chat application in the World - **Discord**.
<!---I took a lot of inspiration from that app. The appearance of **typee** is very congenial to Discord's. I think it's modern, good looking and intuitive.-->

# Features

Present version of **typee** has basic functionalities, which provide stable communication and allow users to chat with other in real time. 

### Typee offers:

* Email and password authentication
* Google Oath authentication
* Creating, managing and customizing separate rooms for conversations
* Sending messages, emotes and gifs 
* Customizing profile by setting up unique username and profile picture

### Incoming update will provide:

* Adding friends
* Sending private messages to the friends
* Sharing files in rooms
* Creating private rooms for invitation only

### Planned for a distant future:

* Room bots that will listen for commands
* Room permissions and privileges (e.g. moderator)
* Channels inside rooms (e.g. general, offtopic, homework)

## Screenshot

<img src="https://i.imgur.com/ICayESs.png"/>

# Tech stack

Here is the list of the most important technologies and libraries that were used in development.

## Frontend

* React - main framework
* Material UI - design library 
* Redux - storing app state (at the beggining I was using Redux libary to store application state, but after a while I saw it's downsides and completly switched to the new built-in React Context system)
* axios - HTTP client
* Jest - testing framework
* Docker - app containerization

## Backend

* Node.js - runtime environment
* Express - web application framework
* MongoDB - NoSQL database
* Mongoose - MongoDB modeling tool
* socket.io - library for realtime web applications
* Passport - strategy for authenticating
* Jest - testing framework
* Docker - app containerization

## External services
* MongoDB Atlas - database host
* Sendgrid - email delivery platform
* Clodinary - image management service
* TravisCI - testing, building and deploying application
* AWS Elastic Beanstalk - hosting the application

# Development and production flow

In development stage I run project locally on development branch. This setup does not involve Docker, because it's faster to implement and test features without containerization, but requires some additional proxy and CORS configuration - hence for example ```setupProxy.js```.

#### Deploying applications works as follow:
1. Create ```Dockerfiles``` for:
    * Frontend application,
    * Backend server,
    * Nginx server (which is responsible for proxying between containers).
2. Create ```.travis.yml``` config file, which tells Travis how to:
    * build containers based on included Dockerfiles,
    * run all tests in project,
    * deploy application to the AWS Elastic Beanstalk if all test suites are passed.
3. Create ```Dockerrun.aws.json``` config file, which contains containers definitions for AWS Elastic BeansTalk.
4. Push code to the Github Master branch.
5. Configure TravisCI to automatically pull code from repository.
7. Now TravisCI runs all steps included in ```.travis.yml```
6. If everything went correctly the application is now hosted on the AWS servers and available for others.

### Soooo. See you at :point_right: [typee](http://typee.us-west-2.elasticbeanstalk.com)! 
## :punch:

[logo]: https://i.imgur.com/1FxTQuN.png "Logo"