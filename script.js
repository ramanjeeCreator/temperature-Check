const tempName = ['Celsius', 'Fahrenheit', 'Kelvin']

const containsNonAlphabeticCharacters = (input) => {
    var pattern = /[^a-zA-Z]/;
    return pattern.test(input);
}

const createUserDiv = (tempName, minTemp, maxTemp) => {
    let id = (tempName.substring(0, 3)).toLowerCase();
    let mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', `${id}-cont`);
    mainDiv.classList.add('temp-cont')
    mainDiv.innerHTML = `
    <input type="number" name="${id}" id="${id}" value="${minTemp}" oninput="calcTemp(this)">
    <label for="${id}" min="${minTemp}" max="${maxTemp}">°${tempName.split(' ')[0]}</label>`

    document.querySelector('#main-temp-cont').appendChild(mainDiv);
}

const formatNumber = (number) => {
    const roundedNumber = parseFloat(number).toFixed(2);
    return parseFloat(roundedNumber).toString();
}
const calcTemp = (inputElem) => {
    let readingTemp1 = inputElem.value;
    let lowestPoint1 = inputElem.nextElementSibling.getAttribute('min');
    let highestPoint1 = inputElem.nextElementSibling.getAttribute('max');

    let leftEq = (readingTemp1 - lowestPoint1) / (highestPoint1 - lowestPoint1);

    let restElem = document.querySelectorAll(`.temp-cont>input:not(#${inputElem.getAttribute('id')})`)
    restElem.forEach((element) => {
        let lowestPoint2 = parseFloat(element.nextElementSibling.getAttribute('min'));
        let highestPoint2 = parseFloat(element.nextElementSibling.getAttribute('max'));

        element.value = formatNumber((leftEq * (highestPoint2 - lowestPoint2)) + lowestPoint2)
    })
}

const create = () => {
    const mainDiv = document.querySelector('#main-cont').innerHTML;

    document.querySelector('#main-cont').innerHTML = `
    <div id="new-conversion">
            <h2>Make Your Temperature Conversion</h2>
    </div>
    <div id="main-temp-cont">
        <div id="min-temp-cont" class="temp-cont">
            <input type="number" name="min" id="min" value="0">
            <label for="min" style="font-size: 1.1rem;">Min Temperature</label>
        </div>
        <div id="max-temp-cont" class="temp-cont">
            <input type="number" name="max" id="max" value="100">
            <label for="max" style="font-size: 1.1rem;">Max Temperature</label>
        </div>
        <div id="name-cont" class="temp-cont">
            <input type="text" name="name" id="name" value="Raman">
            <label for="name" style="font-size: 1.1rem;">Temperature Name</label>
        </div>
    </div>
    <div id="create-cont">
    </div>`

    let btn = document.createElement('button');
    btn.setAttribute('id', 'created');
    btn.textContent = 'Create';
    document.querySelector('#create-cont').appendChild(btn);

    btn.addEventListener('click', () => {
        let userTempName = document.querySelector('#name').value;
        let minTemp = document.querySelector('#min').value;
        let maxTemp = document.querySelector('#max').value;

        if (containsNonAlphabeticCharacters(userTempName)) {
            alert("Input contains non-alphabetic characters.");
        } else if (!tempName.includes(userTempName)) {
            tempName.push(userTempName);
            document.querySelector('#main-cont').innerHTML = mainDiv;

            createUserDiv(userTempName, minTemp, maxTemp)
        } else {
            alert('Already Exist');
        }
    })
}
