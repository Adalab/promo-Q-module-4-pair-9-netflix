const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");

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

server.get("/movies", (req, resp) => {
  const genderFilterParam = req.query.gender;
  const moviesFilter = movies.filter((item) => {
    if (item.gender === genderFilterParam) {
      console.log("bien hecho, guapi");
    }
  });
  const responseSuccesse = {
    success: true,
    movies: movies,
  };
  console.log(req.params);
  resp.json(responseSuccesse);
});
//consigue id de la peli a renderizar

server.get("/movie/:movieId", (req, res) => {
  console.log(req.params);
});
const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));
