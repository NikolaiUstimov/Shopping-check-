//Создание массивов
let nameArray = [];
let countArray = [];
let priceArray = [];

//Функция, возвращающая input
function getNewInput(placeholder, type) {
	let newInput = document.createElement("input");
	newInput.classList.add("input_add");
	newInput.placeholder = placeholder;
	newInput.type = type;
	return newInput;
}

//Функция, возвращающая обёртку div
function getWrapper(className) {
	let wrapper = document.createElement("div");
	wrapper.classList.add(className);
	return wrapper
}

//Функция, возвращающая кнопку
function getAddBtn(className, text) {
	let newAddBtn = document.createElement("button");
	newAddBtn.classList.add(className);
	newAddBtn.textContent = text;
	return newAddBtn;
}

//Функция, возвращающая таблицу
let index = 1;
function getAddTable(index) {
	let table = document.createElement("table");
	let tbody = document.createElement("tbody");
	let tr = document.createElement("tr");
	let numTd = document.createElement("td");
	numTd.textContent = index + 1;
	numTd.setAttribute("rowspan", 2);
	let nameTh = document.createElement("th");
	nameTh.textContent = "Название";
	let countTh = document.createElement("th");
	countTh.textContent = "Кол-во";
	let priceTh = document.createElement("th");
	priceTh.textContent = "Цена";
	let totalPriceTh = document.createElement("th");
	totalPriceTh.textContent = "Общая цена";
	let renameTd = document.createElement("td");
	renameTd.setAttribute("rowspan", 2);
	let removeTd = document.createElement("td");
	removeTd.setAttribute("rowspan", 2);

	let renameBtn = getAddBtn("rename_btn", "Изменить");
	let removeBtn = getAddBtn("remove_btn", "Удалить");

	tr.append(numTd, nameTh, countTh, priceTh, totalPriceTh, renameTd, removeTd);
	renameTd.append(renameBtn);
	removeTd.append(removeBtn);
	tbody.append(tr);
	table.append(tbody);
	// document.body.append(table);

	return tbody
}

//Функция, возвращающая строку в таблицу
let totalPrice = 0;
function getAddTr(nameProduct, countProduct, price) {
	totalPrice = countProduct * price;
	let tr = document.createElement("tr");
	let nameProductTh = document.createElement("th");
	let countProductTh = document.createElement("th");
	let priceProductTh = document.createElement("th");
	let totalPriceProductTh = document.createElement("th");

	nameProductTh.textContent = nameProduct;
	countProductTh.textContent = countProduct;
	priceProductTh.textContent = price;
	totalPriceProductTh.textContent = totalPrice;

	tr.append(nameProductTh, countProductTh, priceProductTh, totalPriceProductTh)

	return tr
}

//Заголовок
let title = document.createElement("h1");
title.classList.add("title");
title.textContent = "Чек покупки";

//Обёртка с текстовыми полями и кнопкой
let inputWrapper = getWrapper("input_wrap");
let nameProductInp = getNewInput("Название товара", "text");
let countProductInp = getNewInput("Количество", "number");
let priceProductInp = getNewInput("Цена", "number");
let addProductBtn = getAddBtn("add_btn-product", "Добавить");

//Добавление в обёртку инпутов и кнопки
inputWrapper.append(nameProductInp, countProductInp, priceProductInp, addProductBtn);

//Добавление элементов в документ
document.body.append(title, inputWrapper);

let newTable = getAddTable(index);
let newTr = getAddTr();

addProductBtn.onclick = function() {
	let nameProductValue = nameProductInp.value;
	let countProductValue = Number(countProductInp.value);
	let priceProductValue = Number(priceProductInp.value);

	// let newTable = getAddTable();
	// let newProductTr = getAddTr(nameProductValue, countProductValue, priceProductValue);
	// newTable.append(newProductTr)
	
	nameArray.push(nameProductValue);
	countArray.push(countProductValue);
	priceArray.push(priceProductValue);
	render(nameArray, countArray, priceArray)

	nameProductInp.value = "";
	countProductInp.value = "";
	priceProductInp.value = "";
}

//Функция отрисовки таблицы
function render(nameArr, countArr, priceArr) {
	newTable.innerHTML = "";
	newTr.innerHTML = "";
	for (i = 0; i < nameArr.length; i++) {
		index + [i];
		let newProductTr = getAddTr(nameArr[i], countArr[i], priceArr[i]);
		newTable.append(newProductTr);
		document.body.append(newTable);
	}
}
