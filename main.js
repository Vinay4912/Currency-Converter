const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`

const dropdowns = document.querySelectorAll(".dropdowns select")

const button = document.querySelector(".convertBtn")
let fromDropDown = document.querySelector(".from select")
let toDropDown = document.querySelector(".to select")
let result = document.querySelector(".result")

for (let select of dropdowns) {
    for (currencyCode in countryList) {
        let newOpt = document.createElement("option")
        newOpt.innerText = currencyCode
        newOpt.value = currencyCode
        select.append(newOpt)
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}


const updateFlag = (element) => {
    let currencyCode = element.value
    let countryCode = countryList[currencyCode]
    let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newImg;
}

const convertCurrency = async (e) => {
    e.preventDefault()
    let amt = document.querySelector(".amt input")
    const fromCurrency = fromDropDown.value
    const toCurrency = toDropDown.value
    let amtValue = amt.value

    if (amtValue === "" || amtValue < 1) {
        amtValue = 1
        amt.value = '1'
    }

    let url = `${api}/${fromCurrency}`
    const response = await fetch(url)
    const data = await response.json()

    const fromExchangeRate = data.conversion_rates[fromCurrency]
    const toExchangeRate = data.conversion_rates[toCurrency]

    const finalAmt = (amtValue) * toExchangeRate
    result.innerText = `${amtValue} ${fromCurrency} = ${finalAmt.toFixed(2)} ${toCurrency}`
}

button.addEventListener("click", convertCurrency)


