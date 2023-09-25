// canvas
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let lastRadiusRange1Value = 0;
let lastRadiusRange2Value = 0;
let lastWeightRangeValue = 0;

// elementos do radius
let radiusRange1 = document.getElementById("radius-range-1");
radiusRange1.value = 0.1;
let radiusValue1 = document.getElementById("radius-value-1");
radiusValue1.value = radiusRange1.value;
radiusRange1.addEventListener("input", handleOnChangeRadius);
let radius1Step = Number(radiusRange1.step);
let radius1TotalStep = 0;
let radius2Step = Number(radiusRange1.step);
let radius2TotalStep = 0;

// variáveis dos botões para animação
let radius1HeightMaxValue = canvas.height - 80;
let radiusHeightMinValue = canvas.height - 10;
let radius2HeightMaxValue = canvas.height - 80;
let radius2HeightMinValue = canvas.height - 10;
let intervalId;
let isAnimating = false;
let base = 5;


// elementos do weight
let weightRange = document.getElementById("weight-range");
weightRange.value = 100;
let weightValue = document.getElementById("weight-value");
weightValue.value = weightRange.value;
weightRange.addEventListener("input", handleOnChangeWeight);

// elementos do weight 2
let radiusRange2 = document.getElementById("radius-range-2");
radiusRange2.value = radius1Step;
let radiusValue2 = document.getElementById("radius-value-2");
radiusValue2.value = radiusRange2.value;
radiusRange2.addEventListener("input", handleOnChangeRadius2);

// lida com os valores da formula 1
let radiusNewtonNumerator1 = document.getElementById("radius-newton-numerator-1");
let radiusNewtonDenominator1 = document.getElementById("radius-newton-denominator-1");
let radiusNewtonResult1 = document.getElementById("radius-newton-result-1");
radiusNewtonNumerator1.innerText = getF1();
radiusNewtonDenominator1.innerText = cilinderArea(radiusRange1.value);
radiusNewtonResult1.innerHTML = (Number(radiusNewtonNumerator1.innerText) / Number(radiusNewtonDenominator1.innerText)).toFixed(2);

// lida com os valores da formula 2
let radiusNewtonNumerator2 = document.getElementById("radius-newton-numerator-2");
let radiusNewtonDenominator2 = document.getElementById("radius-newton-denominator-2");
let radiusNewtonResult2 = document.getElementById("radius-newton-result-2");
radiusNewtonNumerator2.innerText = getF2();
radiusNewtonDenominator2.innerText = cilinderArea(radiusRange2.value);
radiusNewtonResult2.innerHTML = (Number(radiusNewtonNumerator2.innerText) / Number(radiusNewtonDenominator2.innerText)).toFixed(2);

let f1 = document.getElementById("f1");
let d1 = document.getElementById("d1");
let f2 = document.getElementById("f2");
let d2 = document.getElementById("d2");

animationRadius(radiusRange1.value, radiusRange2.value);

//botões de animação

let buttonStart = document.getElementById("button-start");
buttonStart.addEventListener("click", handleOnStartAnimation);
let buttonPause = document.getElementById("button-pause");
buttonPause.addEventListener("click", handleOnPauseAnimation);
let buttonReset = document.getElementById("button-reset");
buttonReset.addEventListener("click", handleOnResetAnimation);
let buttonLessThan = document.getElementById("button-less-than");
buttonLessThan.addEventListener("click", handleOnClickLessThan);
let buttonGreatherThan = document.getElementById("button-greather-than");
buttonGreatherThan.addEventListener("click", handleOnClickGreatherThan);
toggleActivatedClassStyle("reset");


function cilinderArea(radius) {
    let area = Math.PI * radius * radius;
    return area.toFixed(2);
}

function handleOnChangeRadius(event) {
    lastRadiusRange1Value = radiusValue1.value;
    let inputValue = event.target.value;
    radiusValue1.value = inputValue;
    radiusNewtonDenominator1.innerText = cilinderArea(radiusRange1.value);
    radiusNewtonResult1.innerHTML = (Number(radiusNewtonNumerator1.innerText) / Number(radiusNewtonDenominator1.innerText)).toFixed(2);
    animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);
}

function handleOnChangeWeight(event) {
    let inputValue = event.target.value;
    weightValue.value = inputValue;
    radiusNewtonNumerator1.innerText = weightValue.value;
    radiusNewtonNumerator2.innerText = weightValue.value;
    animationRadius(radiusRange1.value, radiusRange2.value, inputValue);

}

function handleOnChangeRadius2(event) {
    let inputValue = event.target.value;
    radiusValue2.value = inputValue;
    radiusNewtonDenominator2.innerText = cilinderArea(radiusRange2.value);
    radiusNewtonResult2.innerHTML = (Number(radiusNewtonNumerator2.innerText) / Number(radiusNewtonDenominator2.innerText)).toFixed(2);
    animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);

}

function animationRadius(radiusValue1, radiusValue2, weight) {

    if (!weight) {
        weight = weightValue.value;
    }

    if (isAnimating) {
        radiusRange1.disabled = true;
        radiusRange2.disabled = true;
        weightRange.disabled = true;
    } else {
        radiusRange1.disabled = false;
        radiusRange2.disabled = false;
        weightRange.disabled = false;
    }

    let radius1XOffset = (canvas.width / 2.3);
    let radius1WidthAnimation = (radiusValue1 * -3) - 20;
    let radiusHeighValueAnimation = canvas.height;

    let radius2XOffset = (canvas.width / 3) * 1.6;
    let radius2WidthAnimation = (radiusValue2 * 3) + 50;
    let radius2HeightAnimation = -canvas.height * .4;

    let minInput = 100;
    let minScale = 0.08;
    let maxInput = 20000;
    let maxScale = 0.3;

    let scale = minScale + (maxScale - minScale) * ((weight - minInput) / (maxInput - minInput));
    let carWeightValueAnimationX = 308 * scale;
    let carWeightValueAnimationY = 25;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'blue';
    context.fillRect(radius1XOffset, radius1HeightMaxValue, radius1WidthAnimation, radiusHeighValueAnimation);

    context.fillStyle = 'red';
    context.fillRect(radius2XOffset, radius2HeightMinValue, radius2WidthAnimation, radiusHeighValueAnimation);

    let car = new Image();
    car.addEventListener("load", () => {
        context.drawImage(car, radius2XOffset + (radius2WidthAnimation / 2) - carWeightValueAnimationX / 2, radius2HeightAnimation + radius2HeightMinValue + 37, carWeightValueAnimationX, carWeightValueAnimationY);
    });

    car.src = "./assets/images/car.png";
    handleWithLabelsInAnimation("green", "10px Arial", `F₁ = ${weight} N`, radius1XOffset - 50, radius1HeightMaxValue - 10);
    handleWithLabelsInAnimation("green", "10px Arial", `d₁ = ${radius1TotalStep.toFixed(2)} m`, radius1XOffset - 110, radius1HeightMaxValue + 10);
    handleWithLabelsInAnimation("red", "10px Arial", `W = ${weight} N`, radius2XOffset + radius2WidthAnimation + 20, radius2HeightMinValue - 10);
    handleWithLabelsInAnimation("red", "10px Arial", `d₂ = ${radius2TotalStep.toFixed(2)} m`, radius2XOffset + radius2WidthAnimation + 20, radius2HeightMinValue - 20);

    drawLine(radius1XOffset - 60, radius1HeightMaxValue, radius1XOffset - 60, (canvas.height - 80) + radius1TotalStep, "green");
    drawLine(radius2XOffset + 80, canvas.height-10, radius2XOffset + 80, radius2HeightMinValue, "red");
    drawGrid();

    f1.innerHTML = `(${getF1()} N)`;
    d1.innerHTML = `(${radius1TotalStep.toFixed(2)} m)`;
    f2.innerHTML = `(${getF2()} N)`;
    d2.innerHTML = `(${radius2TotalStep.toFixed(2)} m)`;


}


function drawGrid() {
    context.beginPath();
    let iterations = 9;
    let spaceBetweenPoints = 10;
    context.lineWidth = 1;
    context.fillStyle = "black";
    context.font = "5px Arial";

    context.moveTo(canvas.width / 2, canvas.height);
    context.lineTo(canvas.width / 2, 0);
    context.moveTo(canvas.width / 2, canvas.height - 20);


    for (i = 0; i < iterations; i++) {
        context.moveTo((canvas.width / 2) - base, canvas.height - spaceBetweenPoints * i + 1);
        context.lineTo((canvas.width / 2) + base, canvas.height - spaceBetweenPoints * i + 1);
        context.fillText(i, (canvas.width / 2) - base * 2, (canvas.height - spaceBetweenPoints * i));
        context.stroke();
    }
}

function handleOnStartAnimation() {
    if (!isAnimating) {
        toggleActivatedClassStyle("start");

        intervalId = setInterval(() => {
            if (radius1HeightMaxValue < radiusHeightMinValue) {
                isAnimating = true;
                radius1TotalStep += radius1Step;
                radius2TotalStep += radius2Step;
                radius1HeightMaxValue++;
                radius2HeightMinValue--;
                animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);
            } else {
                isAnimating = false;
                animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);
                clearInterval(intervalId);
            }
        }, 100);
    }

}

function handleOnPauseAnimation() {
    if (isAnimating) {
        toggleActivatedClassStyle("pause");
        isAnimating = false;
        clearInterval(intervalId);
        animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);
    }
}

function handleOnResetAnimation() {
    toggleActivatedClassStyle("reset");
    clearInterval(intervalId);
    radius1HeightMaxValue = canvas.height - 80;
    radius2HeightMinValue = canvas.height - 10;
    radius1TotalStep = 0;
    radius2TotalStep = 0;

    isAnimating = false;
    animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);

}

function toggleActivatedClassStyle(buttonName) {
    switch (buttonName) {
        case "start":
            buttonPause.classList.remove("button-activated");
            buttonReset.classList.remove("button-activated");
            buttonStart.classList.add("button-activated");
            break;

        case "pause":
            buttonStart.classList.remove("button-activated");
            buttonReset.classList.remove("button-activated");
            buttonPause.classList.add("button-activated");
            break;

        default:
            buttonStart.classList.remove("button-activated");
            buttonPause.classList.remove("button-activated");
            buttonReset.classList.add("button-activated");
            break;
    }

}

function handleOnClickGreatherThan() {
    if (radius1HeightMaxValue < radiusHeightMinValue) {
        radius1HeightMaxValue++;
        radius2HeightMinValue--;
        radius1TotalStep += radius1Step;
        radius2TotalStep += radius2Step;

        animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);
    }

}

function handleOnClickLessThan() {
    if (radius1HeightMaxValue > canvas.height / base) {
        radius1HeightMaxValue--;
        radius2HeightMinValue++;
        radius1TotalStep -= radius1Step;
        radius2TotalStep -= radius2Step;
        animationRadius(radiusRange1.value, radiusRange2.value, weightValue.value);
    }

}

function handleWithLabelsInAnimation(color, font, text, x, y) {
    context.fillStyle = color;
    context.font = font;
    context.fillText(text, x, y);
}

function drawLine(moveToX, moveToY, lineToX, lineToY, color) {
    context.beginPath();
    context.moveTo(moveToX, moveToY);
    context.lineTo(lineToX, lineToY);

    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
    context.strokeStyle = "#000";
}

function getF1() {
    let a1 = cilinderArea(radiusRange1.value);
    let a2 = cilinderArea(radiusRange2.value);
    return ((weightRange.value*a1)/a2).toFixed(2);
}

function getF2() {
    let a1 = cilinderArea(radiusRange1.value);
    let a2 = cilinderArea(radiusRange2.value);
    return ((weightRange.value*a2)/a1).toFixed(2);
}