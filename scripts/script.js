// elementos do radius
let radiusRange1 = document.getElementById("radius-range-1");
let radiusValue1 = document.getElementById("radius-value-1")
radiusRange1.addEventListener("change", handleOnChangeRadius)


// elementos do weight
let weightRange = document.getElementById("weight-range");
let weightValue = document.getElementById("weight-value")
weightRange.addEventListener("change", handleOnChangeWeight)

// elementos do weight 2
let radiusRange2 = document.getElementById("radius-range-2");
let radiusValue2 = document.getElementById("radius-value-2")
radiusRange2.addEventListener("change", handleOnChangeRadius2)


// lida com os valores da formula 1
let radiusNewtonNumerator1 = document.getElementById("radius-newton-numerator-1")
let radiusNewtonDenominator1 = document.getElementById("radius-newton-denominator-1")
let radiusNewtonResult1 = document.getElementById("radius-newton-result-1")

radiusNewtonNumerator1.innerText =  weightValue.value;

radiusNewtonDenominator1.innerText = cilinderArea(radiusRange1.value)

radiusNewtonResult1.innerHTML = (Number(radiusNewtonNumerator1.innerText)/Number(radiusNewtonDenominator1.innerText)).toFixed(2)

// lida com os valores da formula 2
let radiusNewtonNumerator2 = document.getElementById("radius-newton-numerator-2")
let radiusNewtonDenominator2 = document.getElementById("radius-newton-denominator-2")
let radiusNewtonResult2 = document.getElementById("radius-newton-result-2")

radiusNewtonNumerator2.innerText =  weightValue.value;

radiusNewtonDenominator2.innerText = cilinderArea(radiusRange2.value)

radiusNewtonResult2.innerHTML = (Number(radiusNewtonNumerator2.innerText)/Number(radiusNewtonDenominator2.innerText)).toFixed(2)



// Calcula área do circulo
function cilinderArea(radius) {
    let area = Math.PI * radius * radius;
    return area.toFixed(2);
}

function handleOnChangeRadius(event) {
    let inputValue = event.target.value;
    radiusValue1.value = inputValue

    radiusNewtonDenominator1.innerText = cilinderArea(radiusRange1.value)
    radiusNewtonResult1.innerHTML = (Number(radiusNewtonNumerator1.innerText)/Number(radiusNewtonDenominator1.innerText)).toFixed(2)

}

function handleOnChangeWeight(event) {
    let inputValue = event.target.value;
    weightValue.value = inputValue
    radiusNewtonNumerator1.innerText =  weightValue.value
    radiusNewtonNumerator2.innerText =  weightValue.value
}

function handleOnChangeRadius2(event) {
    let inputValue = event.target.value;
    radiusValue2.value = inputValue
    
    radiusNewtonDenominator2.innerText = cilinderArea(radiusRange2.value)
    radiusNewtonResult2.innerHTML = (Number(radiusNewtonNumerator2.innerText)/Number(radiusNewtonDenominator2.innerText)).toFixed(2)
    
}
