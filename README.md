# Project Overview

This project is an Angular Video Player Application built with Angular, NgRx, Video.js, and Angular Material. The application allows users to browse and play videos from a dynamically loaded list, with features like video selection, search, and a responsive UI. The app also leverages state management using NgRx and stores the last played video in localStorage to resume playback after reopening.

# Technologies Used:

Angular (latest version 18)
NgRx for state management
Video.js for the video player
Angular Material for UI components
SCSS for styling
JSON as data source for videos

# VideoPlayerApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

# Steps to Set Up and Run the Application Locally

    1. Clone the repository:  

        cd video-player-app

    2.Install dependencies:  

        Make sure you have Node.js and npm installed.

    3. Run the following command to install the required packages:

       npm install

    4. Run the development server: Start the application locally using Angular CLI: 

        npm start

    5. The application will be available at http://localhost:4200/.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

# Explanation of Features

Header:
Displays the company logo and the application title.
The header stays fixed at the top during scrolling.

Sidebar:
Displays a list of video titles loaded from the videos.json file.
A play icon is shown next to each title, and when a video is playing, the play icon is replaced with a pause icon.
A search bar allows filtering of videos by title.

Video Player:
The selected video is displayed using the Video.js player.
The video title and description are displayed below the player.
On clicking a video in the sidebar, the video will start playing in the player.

# Pending Features or Bugs

Routing:
The routing functionality hasn't been implemented yet. Since the selected video in the sidebar is directly played on the middle-area player, I couldn't implement routing to navigate between video pages (e.g., /video/:id). To enable routing, the video player will need to be in a dedicated route, which I plan to implement in the future.

Dark Mode:
The dark mode toggle feature could not be fully implemented. While the functionality exists, the associated CSS styles for the dark theme are not fully applied across all components, especially the video player and sidebar. Additional work is required to finalize dark mode support across the entire app.

Lazy Loading of Video Modules:
The video modules are not lazily loaded yet. This can be improved by implementing lazy loading for the video components to enhance performance

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
