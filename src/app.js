// Datepicker
var date = document.querySelector('#flatpickr');
date.flatpickr({
	utc: true,
	enableTime: true
});

var ajax = function(url, method, data) { 
	var xhr = new XMLHttpRequest();

	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function (e) {
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText);
		} else {
			console.error(xhr.statusText);
		}
	}

	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(data);
};

var btnCadastro = document.querySelector('#btnCadastro');

btnCadastro.addEventListener('click', function() {
	var date_time = document.querySelector('#flatpickr').value;
	var descricao = document.querySelector('#descricao').value;

	var data = {
		date: new Date(date_time),
		description: descricao
	};

	if (date_time === '' || descricao === '')
		return alert('Preencha todos os campos para cadastrar!');

	console.log(JSON.stringify(data));
	// ajax('http://localhost:5000/api/missas', 'POST', JSON.stringify(data));	
});