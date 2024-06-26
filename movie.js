const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjk3N2Y3YTQ3Yzk3NmUxYTVmNWU2Y2I4ZDBlNjAwYyIsInN1YiI6IjY2Mjc4NjhiN2E5N2FiMDE3ZDkwNzQ2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOqSjl5d1Kbsca643s7j_azxcKsFEZ4lOjo_Fz__6UY",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    let movies = data.results;

    const cardList = document.querySelector(".card-list");

    // 영화 검색 기능
    const movieFilter = (movies, keyword) => {
      return movies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    };

    const input = document.getElementById("search-input");
    const enter = document.querySelector(".enter");

    enter.addEventListener("submit", (e) => {
      e.preventDefault(); // 이벤트가 명시적으로 처리되지 않은경우, 해당 이벤트에 대한 동작을 실행하지 않도록 지정
      const keyword = input.value;
      const filteredMovies = movieFilter(data.results, keyword);
      getMovies(filteredMovies);
    });

    // 카드를 가지고 오기 위한 변수
    const getMovies = (movies) => {
      cardList.innerHTML = ""; // 카드를 가져오기 전 반복되지 않기 위해 전부 지운다.

      movies.forEach((movie) => {
        const { backdrop_path, id, title, overview, vote_average } = movie;

        // HTML에 카드 div 만들기
        let mCard = `
                    <div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/original${backdrop_path}" alt="${title}">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                        <p>Rating: ${vote_average}</p>
                    </div>
                `;

        // 문자열 HTML로 변환
        const movieCard = document
          .createRange()
          .createContextualFragment(mCard)
          .querySelector(".movie-card");

        // 카드 클릭시 영화 ID값
        movieCard.addEventListener("click", () => {
          alert(`Movie ID: ${id}`);
        });

        // appendChild로 영화 카드 추가,오직 노드객체만 받을수있다 오직 하나의 노드만 추가
        cardList.appendChild(movieCard);
      });
    };

    // 실행
    getMovies(movies);
  })
  .catch((err) => console.error(err));
