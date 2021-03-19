const express = require("express"); //require express
const data = require("./data.json"); //require data.json
const app = express();
app.set("view engine", "pug"); //set “view engine” to “pug”
app.use("/static", express.static("public")); //use a static route and the express.static method to serve the static files located in the public folder

app.get("/", (req, res) => {
  //"index" route (/) to render the "Home" page with the locals set to data.projects
  res.locals.projects = data.projects;
  res.render("index");
});

app.get("/about", (req, res) => {
  //"about" route (/about) to render the "About" page
  res.render("about");
});

app.get("/project/:id", (req, res, next) => {
  //Dynamic "project" routes (/project/:id or /projects/:id) based on the id of the project that render a customized version of the Pug project template to show off each project.
  let id = req.params.id;
  let project = "";
  data.projects.map((projectData) => {
    if (projectData.id == id) {
      project = projectData;
    }
  });
  if (project) {
    res.locals.project = project;
    res.render("project");
  } else {
    next();
  }
});

app.use((req, res, next) => {
  // 404 handler creates a custom new Error(), set its status property to 404 and set its message property to a user friendly message.
  const err = new Error(`Page not found`);
  err.status = 404;
  console.log(err.status);
  next(err);
});
app.use((err, req, res, next) => {
  //Global error handler that will deal with any server errors the app encounters, ensures that there is an err.status property and an err.message property if they don't already exist, and then log out the err object's message and status.
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

let port = 3000; //app listens on port 3000, and logs a string to the console that says which port the app is listening to.
app.listen(port, () => {
  console.log(`The application is listening on localhost:3000`);
});
