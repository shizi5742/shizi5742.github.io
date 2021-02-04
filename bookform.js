function postData(event) {
	event.preventDefault();

	let isbn = document.getElementById('isbn').value;
	let title = document.getElementById('book-form').value;
	let fee = document.getElementById('fee').value;
	let publisher = document.getElementById('publisher').value;
	let published = document.getElementById('date-published').value;

	fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add", {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title: title, isbn: isbn,
			publisher: publisher, datePublished: published, overdueFee: fee
		})
	}).then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err))
		
}
function save() {
	document.getElementById("library-form").addEventListener("submit", postData)
	success()

}

function myFunction() {
	document.getElementById("library-form").reset()

}
function success() {
	document.getElementById("show").innerHTML = `<div class="row">
			<div class="col">
					<div class="alert alert-success" role="alert">
						 Book Successfully Added !
					</div>
			</div>
	</div>`
	// setTimeout(() => document.querySelector("#display").remove(), 2000)
}

