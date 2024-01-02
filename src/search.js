import React from "react";
import "./search.css";
import WatchMoviePicture from "./Image/PicMovie.png";

async function getMovies() {
  const movieInput = document.getElementById("movieInput").value;

  const movieUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=e346d95b&s=${movieInput}`;

  const moviesResponse = await fetch(movieUrl);
  const moviesData = await moviesResponse.json();

  const moviesContainer = document.querySelector(".section__container");

  // Clear previous movie results
  moviesContainer.innerHTML = "";

  if (moviesData.Search) {
    // Loop through each movie in the Search array
    moviesData.Search.forEach(async (movie) => {
      const movieUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=e346d95b&t=${movie.Title}`;
      const movieResponse = await fetch(movieUrl);
      const movieData = await movieResponse.json();

      console.log(movieData);

      // Create a movie result container
      const movieResult = document.createElement("div");
      movieResult.classList.add("section__box");
      movieResult.setAttribute("data-aos", "fade-down");
      movieResult.setAttribute("data-aos-duration", "800");
      movieResult.setAttribute("data-aos-delay", "200");

      // Create and set the movie image
      const movieImage = document.createElement("img");
      movieImage.classList.add("section__box_img");
      movieImage.src = movieData.Poster || "./Image/PicMovie.png";
      movieImage.alt = "Movie Poster";
      movieResult.appendChild(movieImage);

      // Create the movie details container
      const movieDetails = document.createElement("div");
      movieDetails.classList.add("section__box_content");
      movieDetails.setAttribute("data-aos", "fade-down");
      movieDetails.setAttribute("data-aos-duration", "800");
      movieDetails.setAttribute("data-aos-delay", "200");

      // Set various movie details
      movieDetails.innerHTML = `
          <p class="section__box_content_bold">Genre: <span>${
            movieData.Genre || "N/A"
          }</span></p>
          <p class="section__box_content_blue">Actors: <span>${
            movieData.Actors || "N/A"
          }</span></p>
          <h2 class="section__box_content_title"> <span>${
            movieData.Title || "N/A"
          }</span></h2>
          <p class="section__box_content_paragraph">Description: <span>${
            movieData.Plot || "N/A"
          }</span></p>
          <p class="section__box_content_blue">Year: <span>${
            movieData.Year || "N/A"
          }</span></p>
          <p class="section__box_content_blue">Country: <span>${
            movieData.Country || "N/A"
          }</span></p> 
  
          
        `;

      movieResult.appendChild(movieDetails);

      // Append the movie result to the movies container
      moviesContainer.appendChild(movieResult);
    });
  } else {
    // Display a message if no movies are found
    moviesContainer.innerHTML = "<p>No movies found</p>";
  }
  document
    .getElementById("movieInput")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        getMovies();
      }
    });
}

async function getCelebrity() {
  const celebrityInput = document.getElementById("searchCelebrity").value;
  const celebrityUrl = `https://api.api-ninjas.com/v1/celebrity?X-Api-Key=yBgXLgi2xsi8mrK422zDsQ==nYjEJj5Lqbx2fQd9&name=${celebrityInput}`;
  const response = await fetch(celebrityUrl);
  const celebrityData = await response.json();

  console.log(celebrityData);

  const celebrities = celebrityData[0].name;
  document.getElementById("celebrity").innerHTML = celebrities;

  const birthday = celebrityData[0].birthday;
  document.getElementById("birthday").innerHTML = birthday;

  const occupation = celebrityData[0].occupation[0];
  document.getElementById("occupation").innerHTML = occupation;

  const age = celebrityData[0].age;
  document.getElementById("celebrityAge").innerHTML = age;

  const nationality = celebrityData[0].nationality;
  document.getElementById("nationality").innerHTML = nationality;

  // Search celebrity Picture API URL

  document
    .getElementById("searchCelebrity")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        getCelebrity();
      }
    });
}

function Search() {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700&family=Kanit:wght@500&family=Manrope:wght@400;500;600;700;800&family=Tajawal:wght@300&display=swap"
          rel="stylesheet"
        />
      </head>
      <div className="container">
        <section className="section" id="Features">
          <div className="section__content">
            <h1 className="section__content_title">About Movie</h1>
          </div>

          <div class="group">
            <svg
              onClick={getMovies}
              class="icon"
              aria-hidden="true"
              cursor="pointer"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              placeholder="Search Film Info"
              type="search"
              class="inputMoviesLatest"
              id="movieInput"
            />
          </div>
          <div className="section__container">
            <div
              id="movieResults"
              className="section__box"
              data-aos="fade-down"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <img
                id="photo"
                className="section__box_img"
                src={WatchMoviePicture}
                alt="section-img1"
              />
              <div className="section__box">
                <div
                  className="section__box_content"
                  data-aos="fade-down"
                  data-aos-duration="800"
                  data-aos-delay="200"
                >
                  <p className="section__box_content_bold">
                    Genre: <span id="genre"></span>
                  </p>
                  <p className="section__box_content_blue">
                    Actors: <span id="actors"></span>
                  </p>
                  <h2 className="section__box_content_title">
                    <span id="title">Guardians of the Galaxy Vol. 2</span>
                  </h2>
                  <p className="section__box_content_paragraph">
                    Descraption:{" "}
                    <span id="plot">
                      The Guardians struggle to keep together as a team while
                      dealing with their personal family issues, notably
                      Star-Lord's encounter with his father, the ambitious
                      celestial being Ego.
                    </span>
                  </p>
                  <p className="section__box_content_blue">
                    Year: <span id="year"></span>
                  </p>
                  <p className="section__box_content_blue">
                    Country: <span id="country"></span>
                  </p>
                  {/* Uncomment the following line if you want to include the link */}
                  {/* <a href="#" className="section__box_content_link">View Collection Details</a> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section" id="Features">
          <div className="section__content">
            <h1 className="section__content_title">Find Celebrity</h1>
          </div>

          <div class="group">
            <svg
              class="icon"
              onClick={getCelebrity}
              aria-hidden="true"
              viewBox="0 0 24 24"
              cursor="pointer"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              placeholder="Search Film Info"
              type="search"
              class="inputMoviesLatest"
              id="searchCelebrity"
            />
          </div>
          <div className="section__container">
            <div
              id="movieResults"
              className="section__box"
              data-aos="fade-down"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <img
                id=""
                className="section__box_img"
                alt="section-img1"
                src={WatchMoviePicture}
              />
              <div className="section__box">
                <div
                  className="section__box_content"
                  data-aos="fade-down"
                  data-aos-duration="800"
                  data-aos-delay="200"
                >
                  <p
                    style={{ textTransform: "capitalize" }}
                    className="section__box_content_bold"
                  >
                    Nationality: <span id="nationality"></span>
                  </p>
                  <p
                    style={{ textTransform: "capitalize" }}
                    className="section__box_content_blue"
                  >
                    Name: <span></span>
                  </p>
                  <h2
                    style={{ textTransform: "capitalize" }}
                    className="section__box_content_title"
                  >
                    <span id="celebrity"></span>
                  </h2>
                  <p
                    style={{ textTransform: "capitalize" }}
                    className="section__box_content_paragraph"
                  >
                    Birthday: <span id="birthday"></span>
                  </p>
                  <p
                    style={{ textTransform: "capitalize" }}
                    className="section__box_content_blue"
                  >
                    Age: <span id="celebrityAge"></span>
                  </p>
                  <p
                    style={{ textTransform: "capitalize" }}
                    className="section__box_content_blue"
                  >
                    Occupation: <span id="occupation"></span>
                  </p>
                  {/* Uncomment the following line if you want to include the link */}
                  {/* <a href="#" className="section__box_content_link">View Collection Details</a> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        <section className="section" id="Contact">
          <div
            className="section__form"
            data-aos="flip-left"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="section__form_container">
              <div className="section__form_box">
                <h1 className="section__form_box_title" id="Feedback">
                  Your Feedback
                </h1>
              </div>
              <div className="section__form_box">
                <form className="formFeedback">
                  <input
                    className="form__input"
                    type="text"
                    placeholder="Name"
                    required
                  />
                  <input
                    className="form__input"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    className="form__submit"
                    type="submit"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <script></script>
    </>
  );
}

export default Search;
