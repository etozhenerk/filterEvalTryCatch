const filterByType = (type, ...values) => values.filter(value => typeof value === type),//объявление функции, которая принимает 

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		console.log(responseBlocksArray);
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получение кнопки "Фильтровать"

filterButton.addEventListener('click', e => { // прослушевание события клик на кнопке "Фильтровать"
	const typeInput = document.querySelector('#type');// получение инпута с типом данных по id
	const dataInput = document.querySelector('#data');// получение инпута с данными по id

	if (dataInput.value === '') { // проверка на пустую строку в инпуте с данными
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // метод устанавливает сообщение о том, что поле пустое
		showNoResults(); // вызов функции showNoResults
	} else { // если поле не пустое
		dataInput.setCustomValidity(''); // пустое поле, т.к. ошибки нет
		e.preventDefault(); // у кнопки тип submit, отключаем стандартное поведение, которое приводит к перезагрузке страницы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызывов функции tryFilterByType, передаем туда тип данных и данные
	}
});

