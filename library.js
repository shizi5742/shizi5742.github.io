let api_url = "https://elibraryrestapi.herokuapp.com/elibrary/api/book/list"
let response = []
async function library(url) {

	const result = await fetch(url)

	response = await result.json()
	console.log(response)
	if (result) {
		load()
	}
	show(response)
}
library(api_url)

function load() {
	document.getElementById('loading').style.display = 'none';
}
function show(data) {
	let tab =
		`<tr> 
							<th>#</th> 
							<th>ISBN</th> 
							<th>Book Title</th> 
							<th>Overdue Fee</th> 
							<th>Publisher</th> 
							<th>Date Published</th> 
							<th>Edit</th>
							<th>Delete</th>
						 </tr>`;

	for (let r of data) {
		let x = data.indexOf(r)
		tab += `<tr>  
				<td>${r.bookId} </td> 
				<td>${r.isbn}</td> 
				<td>${r.title}</td>  
				<td>${r.overdueFee}</td>
				<td>${r.publisher}</td>           
				<td>${r.datePublished}</td>
				<td><a href="#" class="nav-link" role="button" onclick="update(${r.bookId},${x})"><button type="button" class="btn btn-default btn-sm">
				<span class="glyphicon glyphicon-pencil"></span>Edit</button></a></td>
        <td><aclass="nav-link" role="button" onclick="deleteData(${r.bookId})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
				<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
				<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
			</svg></i></a></td
		</tr>`;

	}
	document.getElementById("library").innerHTML = tab;
}
const deleteData = async (deleteId) => {
	console.log(deleteId)

	let check = confirm("Are you sure you want to delete this book")
	if (check) {
		let resp = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/ ${deleteId}`, {
			method: 'delete',
		})
		response = response.filter(item => {
			return item.bookId !== deleteId
		})

		show(response)
		showDelete()
	}
}

function showDelete() {
	document.getElementById("save").innerHTML = `<div class="row">
	<div class="col">
			<div class="alert alert-success" role="alert">
					You have Successfully Deleted The Book!
			</div>
	</div>
</div>`

	setTimeout(() => {
		window.location.href = "./collection.html";
	}, 2000)

}

function update(bookId, r) {
	let id = bookId
	console.log(response[r])
	document.getElementById("save").innerHTML = tags
	document.getElementById('isbn').value = response[r].isbn
	document.getElementById('book-form').value = response[r].title
	document.getElementById('publisher').value = response[r].publisher
	document.getElementById('fee').value = response[r].overdueFee
	document.getElementById('date-published').value = response[r].datePublished

	document.getElementById("edit").onclick = async function fileUpdate() {
		let res = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/ ${id}`, {
			method: 'put',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				isbn: document.getElementById('isbn').value,
				title: document.getElementById('book-form').value,
				overdueFee: document.getElementById('fee').value,
				publisher: document.getElementById('publisher').value,
				datePublished: document.getElementById('date-published').value

			})

		})
		Edited()
	}
	
}

function Edited() {
	document.getElementById("show").innerHTML = `<div class="row">
	<div class="col">
			<div class="alert alert-success" role="alert">
					Successfully Edited !
			</div>
	</div>
</div>`

	setTimeout(() => {
		window.location.href = "./collection.html";
	}, 2000)

}

let tags = `<body style="background-color:#c5f5f1;"></body>
<h1>Update Form</h1>
<h5>Note: Form fields marks with asterisk(*) are required</h5>
<form id="library-form">
	<!-- <div class="col-md-6">
		<label for="isbn" class="form-label">#</label>
		<input type="text" class="form-control" id="#">
	</div> -->
	<div class="col-md-4 mb-3">
	<label for="book-form">*ISBN</label>
	<div class="input-group">
		<div class="input-group-prepend">
	<span class="input-group-text" id="inputGroupPrepend2">#</span>
</div>
<input type="text" class="form-control" id="isbn" aria-describedby="inputGroupPrepend2" required>
</div>
</div>
	<div class="col-md-4 mb-3">
		<label for="book-form">*Book Title</label>
		<div class="input-group">
			<div class="input-group-prepend">
		<span class="input-group-text" id="inputGroupPrepend2">@</span>
	</div>
	<input type="text" class="form-control" id="book-form" aria-describedby="inputGroupPrepend2" required>
</div>
</div>
<div class="input-group mb-3">
		<span class="input-group-text">$</span>
		<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" id="fee">
		<span class="input-group-text">.00</span>

	</div>
<div class="col-md-4 mb-3">
	<label for="book-form">*Publisher</label>
	<div class="input-group">
		<div class="input-group-prepend">
	
</div>
<input type="text" class="form-control" id="publisher" aria-describedby="inputGroupPrepend2" required>
</div>
</div>
<div class="col-md-4 mb-3">
	<label for="book-form">*Date Published</label>
	<div class="input-group">
		<div class="input-group-prepend">
	
</div>
<input type="date" placeholder="yyyy-mm-dd" class="form-control" id="date-published" aria-describedby="inputGroupPrepend2" required>
</div>
</div>
	
	<input type="submit" class="btn btn-outline-success" value="edit book" id="edit">
	
</form>
</body>`
