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
				<td><a href="#" class="nav-link" role="button" onclick="update(${r.bookId},${x})">Edit</a></td>
        <td><aclass="nav-link" role="button" onclick="deleteData(${r.bookId})">Delete</a></td
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
	}
}

function update(bookId, r) {
	let id = bookId
	console.log(response[r])
	document.getElementById("save").innerHTML = x
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
	}
}

let x = `<body style="background-color:#c5f5f1;"></body>
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

let x = 10