const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://o=localhost/api/v1/sites', true); // тут происходит ГЕТ запрос на указанную страницу
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4) {// если всё прошло хорошо, выполняем, что в скобках
	   const dannie = document.getElementById('dannie');
	   dannie.innerHTML = xhr.responseText; // добавляем в блок с id=dannie  полученный код
  }
}
xhr.send();
