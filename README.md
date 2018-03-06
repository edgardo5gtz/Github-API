# Github-API
One page application for querying atom issues.

# Requirements
Imagine you have to work in the the following scenario:
Our customer support team have to interact with the Github issues search throughout the day. 
They're put off by typing queries and would much rather an interactive query builder that hides the actual query from them.
Can you come up with a design that allows our customer support team to search GitHub issues in a more point-and-click, user-friendly way that doesn't involve typing complex queries?
For the purpose of this exercise imagine that they are interested in all the filter parameters the API offers (author, labels, status, and so on).
You will be building it as a Single-Page Application using HTML, CSS and Javascript. You can find the documentation for the Github API here: https://developer.github.com/v3/issues/
The most important feature the app has to include is a logic filter for the list of Github issues that scopes the results based on the query parameters.
You are free to use any Javascript or CSS frameworks/libraries of your choice.

## Technologies
- React: I decided to use React for its power to support interactive, easy to create user interfaces.
- Lodash: A javascript library that helps with most of the data processing.
- Axios: Promise based HTTP client for the browser and node.js

## Decisions
- I decided to use React ClI because of the simplicity of the project.
- I avoided using Redux because of the simplicity of the project and the few components that need to be aware of the 
application state.

## Approach
- App: The app controls the flow of state and renders the components in place. Also it is the one that gets the request 
  to the api. This allows the flow of information through all the components
- Header: stateless component for displaying the header info.
- Filter: This components gets the API information from the app, displays the information accordingly so that the user
  can select the issue and return the info to the App component.
- Displayer: Takes the Filter information and all API information and creates a list of Issues based on the query. Displays
  the issues.
- Pagination: Divides the display of components in pages for a better iteractive, one page experience.
- IssueInformation: Stateless component that renders the information of the issue.

Inline-style: 
![alt text](https://github.com/edgardo5gtz/Github-API/blob/master/TessianAppDiagram.png "Information Flow")

# Instructions to build the project
1. Download the project (zip or clone)
2. Install node and npm
3. Be sure to be inside the folder tessian
4. Run npm install
5. Run npm start
6. Enjoy

