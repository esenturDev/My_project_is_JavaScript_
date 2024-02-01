const body = document.querySelector("body");

const todoList = document.createElement("div");
todoList.classList = "todo_list";
body.appendChild(todoList);

const deleteButton = document.createElement("button");
deleteButton.textContent = "deleteAll";
deleteButton.id = "delete_button";

const form = document.createElement("form");
form.classList = "form";

const movieList = document.createElement("div");
movieList.id = "movie_list";
todoList.append(form, movieList, deleteButton);

const inputName = document.createElement("input");
inputName.id = "input_name";
inputName.placeholder = "New movie";

const inputPhotoLink = document.createElement("input");
inputPhotoLink.id = "input_photo_link";
inputPhotoLink.placeholder = "Movie photo";

// const deleteButton = document.createElement("button");
// deleteButton.id = "delete_button";
// deleteButton.textContent = 'deleteAll';

form.append(inputName, inputPhotoLink);

let data = JSON.parse(localStorage.getItem("movies")) || [];

const restApi = () => {
	
}

const dataRender = (array) => {
	let dataList = array.map((item, index) => {
		return `
			<div class="movie">
				<div class="movie_data">
					<img
						class="movie_photo ${item.completed ? "completed" : ""}"
						src="${item.photo}"
						alt="${item.name}" />
					<h1 class="movie_name">${item.name}</h1>
				</div>
				<div class="movie_buttons">
					<button onclick="toggleComplete(${index})">
						${item.completed ? "uncompleted" : "completed"}
					</button>
					<button onclick="movieDelete(${index})">delete</button>
				</div>
			</div>
		`;
	});
	const getHtml = document.getElementById("movie_list");
	getHtml.innerHTML = dataList.join("");
};
dataRender(data);

const addMovie = () => {
	const getInputName = document.getElementById("input_name");
	const getInputPhotoLink = document.getElementById("input_photo_link");

	if (getInputName.value && getInputPhotoLink.value) {
		data.push({
			name: getInputName.value,
			photo: getInputPhotoLink.value,
			completed: false,
		});
		dataRender(data);
		getInputName.value = "";
		getInputPhotoLink.value = "";
	} else {
		alert("Please enter the movie");
	}
	updateLocalStorage();
};

addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		addMovie();
		createElements()
		// createElements()
	}
	function createElements() {
		const dateInput = new Date();
		const data = {
			title: inputName.value,
			date: dateInput.value,
		};
	
		fetch('https://kind-pear-salamander-belt.cyclic.app/api/v1/get-products', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	createElements();
});

// const toggleComplete = (index) => {
// 	data[index].completed = !data[index].completed;
// 	updateLocalStorage();
// 	dataRender(data);
// };

// const movieDelete = (index) => {
// 	data.splice(index, 1);
// 	updateLocalStorage();
// 	dataRender(data);
// };

// const updateLocalStorage = () => {
// 	localStorage.setItem("movies", JSON.stringify(data));
// };

// deleteButton.addEventListener("click", () => {
// 	data = [];
// 	updateLocalStorage();
// 	dataRender(data);
// });

