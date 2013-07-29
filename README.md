playapingmod
============

PlayFramework as server, AngularJS as client.

## Stack

* Backend: [PlayFramework2](http://www.playframework.com/)
* AngularJS: [AngularJS](http://www.angularjs.org/) on the client
* CSS based on [Twitter's bootstrap](http://twitter.github.com/bootstrap/)

## Installation

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.
* [Install node.js](http://nodejs.org/download/) (requires node.js version >= 0.8.4)
* Install Grunt-CLI and Karma as global npm modules:

    ```
    npm install -g grunt-cli karma bower
    ```

(Note that you may need to uninstall grunt 0.3 globally before installing grunt-cli)

### App Server

Our backend application server is a Play Framwork 2.0 application that relies upon some sbt packages.  You need to install these:

* Install local dependencies:

    ```
    ./sbt update
    ```

### Client App

Our client application is a straight HTML/Javascript application but our development process uses a Node.js build tool
[Grunt.js](gruntjs.com). Grunt relies upon some 3rd party libraries that we need to install as local dependencies using npm.

* Install local dependencies:

    ```
    npm install
    bower install
    ```

## Building

### Build the client app
The app made up of a number of javascript, css and html files that need to be merged into a final distribution for running.  We use the Grunt build tool to do this.
* Build client application:

    ```
    grunt build
    ```

*It is important to build again if you have changed the client configuration as above.*

### Build the server app
The app made up of a number of scala files that need to be compile into a final distribution for running. We use the sbt to do this.
* Build server application:

    ```
    ./sbt compile
    ```


## Running
### Start the Server
* Run the server

    ```
    ./sbt run
    ```
* Browse to the application at [http://localhost:9000]


