// Datepicker
var date = document.querySelector('.flatpickr');
date.flatpickr({
	locale: 'pt',
	enableTime: true,
	altInput: true,
	altFormat: 'd/m/Y - H:i',
	utc: true,
	time_24hr: true,
	wrap: true,
	clickOpens: false
});

var ajax = function(url, method, callback, data) { 
	var xhr = new XMLHttpRequest();
	
	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			callback({
				status: xhr.status,
				response: xhr.responseText
			});
		}
	};

	xhr.onerror = function (e) {
		callback({
			status: xhr.statusText,
			response: xhr.statusText
		});
	};

	xhr.send(data);
};

function handleResponse(obj) {
	console.log(obj);
}

var btnCadastrar = document.querySelector('#btnCadastrar');

btnCadastrar.addEventListener('click', function() {
	var date_time = document.querySelector('#flatpickr').value;
	var descricao = document.querySelector('#descricao').value;

	console.log(date_time);
	var data = {
		date: new Date(date_time),
		description: descricao
	};

	if (date_time === '' || descricao === '')
		return alert('Preencha todos os campos para cadastrar!');

	// console.log(JSON.stringify(data));
	// ajax('http://localhost:5000/api/eventos', 'POST', handleResponse, JSON.stringify(data));
});

var btnExibir = document.querySelector('#btnExibir');

btnExibir.addEventListener('click', function() {
	ajax('http://localhost:5000/api/eventos', 'GET', handleResponse, {});
});