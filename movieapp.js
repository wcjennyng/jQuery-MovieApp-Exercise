//id to keep track of which element to remove
let currentId = 0;

//list of all movies in memory 
let moviesList = [];

$(function() {
//loads DOM
//when delete button clicked, remove closest parent tr 
    $("#movie-form").on("submit", function(e){
        e.preventDefault();
        let title = $("#movie-title").val();
        let rating = $("#select-rating").val();

        let movieData = {title, rating, currentId};
        const HTMLtoAppend = createMovieDataHTML(movieData);

        currentId++
        moviesList.push(movieData);

        $("#movie-table").append(HTMLtoAppend);
        $("#movie-form").trigger("reset");

    });

    //when delete button clicked, remove closest parent tr and remove from array of movies
    $("tbody").on("click", ".btn.btn-danger", function(e){
        //find idx of movie
        let idxToRemove = moviesList.findIndex((movie) => movie.currentId === +$(e.target).data("deleteId"))
        //remove from array of movies
        moviesList.splice(idxToRemove, 1)
        //remove from DOM
        $(e.target).closest("tr").remove();
    });

})


/* createMovieDataHTML accepts an object with title and rating keys and returns a string of HTML */

function createMovieDataHTML(data) {
    return `
      <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentId}>
            Delete
          </button>
        </td>
      <tr>
    `;
  }