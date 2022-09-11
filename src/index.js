const express = require("express");
const cors = require("cors");

const movies = require("./data/movies.json");
const Database = require("better-sqlite3/lib/database");
const { response } = require("express");

const db = new Database("./src/database.db", { verbose: console.log });

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
//endpoint
server.post("/signUp", (req, res) => {
  const querySearch = db.prepare("SELECT * FROM users WHERE email=?");
  const userFound = querySearch.get(req.body.email);
  console.log(userFound);
  if (userFound != undefined) {
    resp.json({
      success: false,
      errorMessage: "Usuario ya existente",
    });
  } else {
  }

  const query = db.prepare("INSERT INTO users (email, password) VALUES (?,?)");
  const result = query.run(req.body.email, req.body.password);
  res.json({
    success: true,
    userId: result.id,
  });
});

server.get("/movies", (req, resp) => {
  const query = db.prepare("SELECT * FROM movies WHERE gender = ?");
  const gender = req.query.gender;
  const allMovies = query.all(gender);
  console.log(allMovies);
  resp.json({ success: true, movies: allMovies });
  /* const genderFilterParam = req.query.gender;
  const moviesFilter = movies.filter((item) =>
    genderFilterParam ? item.gender === genderFilterParam : true
  );
  console.log("adiós", moviesFilter);
  const responseSuccesse = {
    success: true,
    movies: moviesFilter,
  };

  resp.json(responseSuccesse); */
});
//consigue id de la peli a renderizar

server.get("/movie/:movieId", (req, res) => {
  console.log(req.params);
});
const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));
