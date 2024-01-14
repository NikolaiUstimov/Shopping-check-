//Создание массивов
// let nameArray = ["Колбаса", "Чай", "Молоко"];
// let countArray = [2, 3, 2];
// let priceArray = [250, 100, 70];

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
let index = 0;
let totalPrice = 0;
function getAddTable(index, nameProduct, countProduct, price) {
	let table = document.createElement("table");
	let tbody = document.createElement("tbody");
	let tr = document.createElement("tr");
	let numTd = document.createElement("td");
	numTd.textContent = index + 1;
	numTd.setAttribute("rowspan", 2);
	let nameTh = document.createElement("th");
	nameTh.classList.add("name_th");
	nameTh.textContent = "Название";
	let countTh = document.createElement("th");
	countTh.classList.add("count_price-th");
	countTh.textContent = "Кол-во";
	let priceTh = document.createElement("th");
	priceTh.classList.add("count_price-th");
	priceTh.textContent = "Цена";
	let totalPriceTh = document.createElement("th");
	totalPriceTh.classList.add("count_price-th");
	totalPriceTh.textContent = "Общая цена";
	let renameTd = document.createElement("td");
	renameTd.setAttribute("rowspan", 2);
	let removeTd = document.createElement("td");
	removeTd.setAttribute("rowspan", 2);

//Кнопка изменения строки
	let renameBtn = getAddBtn("rename_btn", "Изменить");
	renameBtn.onclick = function() {
		let newName = prompt("Название продукта", nameArray[index]);
		let newCount = Number(prompt("Введите количество", countArray[index]));
		let newPrice = Number(prompt("Введите цену", priceArray[index]));
		nameArray[index] = newName;
		countArray[index] = newCount;
		priceArray[index] = newPrice;
		render(nameArray, countArray, priceArray);
	}

//Кнопка удаления строки
	let removeBtn = getAddBtn("remove_btn", "Удалить");
	removeBtn.onclick = function() {
		if (confirm(`Вы уверены, что хотите удалить товар "${nameArray[index]}"?`) === true) {
			nameArray.splice(index, 1);
			countArray.splice(index, 1);
			priceArray.splice(index, 1);
			render(nameArray, countArray, priceArray);
		}
	}

	//Создание строк для вводимых значений
	let valuetr = document.createElement("tr");
	let nameProductTh = document.createElement("th");
	nameProductTh.classList.add("value_th");
	let countProductTh = document.createElement("th");
	countProductTh.classList.add("value_th");
	let priceProductTh = document.createElement("th");
	priceProductTh.classList.add("value_th");
	let totalPriceProductTh = document.createElement("th");
	totalPriceProductTh.classList.add("value_th");

	totalPrice = countProduct * price;
	nameProductTh.textContent = nameProduct;
	countProductTh.textContent = countProduct;
	priceProductTh.textContent = `${price} руб`;
	totalPriceProductTh.textContent = `${totalPrice} руб`;

	tr.append(numTd, nameTh, countTh, priceTh, totalPriceTh, renameTd, removeTd);
	valuetr.append(nameProductTh, countProductTh, priceProductTh, totalPriceProductTh);
	renameTd.append(renameBtn);
	removeTd.append(removeBtn);
	tbody.append(tr, valuetr);
	table.append(tbody);

	return table;
}

//Заголовок
let title = document.createElement("h1");
title.classList.add("title");
title.textContent = "Чек покупки";

//Обёртка с текстовыми полями и кнопкой
let inputWrapper = getWrapper("input_wrap");
let productInpWrap = getWrapper("product_inp-wrap")
let nameProductInp = getNewInput("Название товара", "text");
let productLabelError = document.createElement("label");
productLabelError.classList.add("error");
productInpWrap.append(nameProductInp, productLabelError);
let countProductInp = getNewInput("Количество", "number");
let priceProductInp = getNewInput("Цена", "number");
let addProductBtn = getAddBtn("add_btn-product", "Добавить");

//Обёртка для таблицы
let list = getWrapper("list_table-wrap");

//Блок для финальной цены в чеке
let totalSumWrapper = getWrapper("total_sum-wrap");
let totalSumText = document.createElement("span");
totalSumText.textContent = "Итоговая стоимость:";
totalSumText.classList.add("total_sum-text");
let totalSumValue = document.createElement("span");
totalSumValue.classList.add("total_sum-value");
totalSumWrapper.append(totalSumText, totalSumValue);

//Добавление в обёртку инпутов и кнопки
inputWrapper.append(productInpWrap, countProductInp, priceProductInp, addProductBtn);

//Добавление элементов в документ
document.body.append(title, inputWrapper, list, totalSumWrapper);

addProductBtn.onclick = function() {
	let nameProductValue = nameProductInp.value;
	let countProductValue = Number(countProductInp.value);
	let priceProductValue = Number(priceProductInp.value);

	//Проверка валидации форм
	let validationResult = false;
	productLabelError.textContent = "";
	if (nameProductValue.length <= 1) {
		productLabelError.textContent = "Название должно содержать более 1го символа"
		validationResult = true;
	} else {
		nameArray.push(nameProductValue);
		countArray.push(countProductValue);
		priceArray.push(priceProductValue);
		render(nameArray, countArray, priceArray);

		nameProductInp.value = "";
		countProductInp.value = "";
		priceProductInp.value = "";
	}
	if (validationResult = true) {
		return
	}
}

//Функция отрисовки таблицы
function render(nameArr, countArr, priceArr) {
	list.innerHTML = "";
//Если товаров в списке нет, показываем сообщение
	if (countArr.length === 0) {
		list.textContent = "Товары не добавлены";
		list.classList.add("list_table-empty");
		list.classList.remove("list_table-wrap");
		totalSumValue.textContent = "0 руб.";
		return
	}

	let finalPrice = 0; //Счётчик итоговой стоимости
	for (i = 0; i < nameArr.length; i++) {
		let newTable = getAddTable(i, nameArr[i], countArr[i], priceArr[i]);
		list.append(newTable);
		list.classList.add("list_table-wrap");
		list.classList.remove("list_table-empty");

		//Расчёт итоговой цены
		finalPrice = finalPrice + totalPrice;
	}
	totalSumValue.textContent = `${finalPrice} руб.`;
}

render(nameArray, countArray, priceArray);