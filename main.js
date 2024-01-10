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


inputWrapper.append(nameProductInp, countProductInp, priceProductInp, addProductBtn);

document.body.append(title, inputWrapper);