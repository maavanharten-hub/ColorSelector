const generateBtn = document.getElementById("generate-btn")
const colorBoxes = document.getElementById("color-boxes")
const colorCodes = document.getElementById("color-codes")

function getColorScheme() {
    let pickedColor = document.getElementById("color-picker").value.replace("#", "")
    let pickedMethod = document.getElementById("scheme-options").value

    colorBoxes.classList.remove("threeboxes", "fourboxes", "fiveboxes")
    colorCodes.classList.remove("threeboxes", "fourboxes", "fiveboxes")

    let count = 5
    
        if(pickedMethod === "triad") {
            count = 3
            colorBoxes.classList.add("threeboxes")
            colorCodes.classList.add("threeboxes")
        } else if(pickedMethod === "quad") {
            count = 4
            colorBoxes.classList.add("fourboxes")
            colorCodes.classList.add("fourboxes")
        } else {
            colorBoxes.classList.add("fiveboxes")
            colorCodes.classList.add("fiveboxes")
        }

    let url = `https://www.thecolorapi.com/scheme?hex=${pickedColor}&mode=${pickedMethod}&count=${count}`

    fetch(url)
        .then(res => res.json())
        .then(result => {
            const colors = result.colors

            for (let i=1; i <= 5; i++) {
                document.getElementById(`box${i}`).style.display = "none"
                document.getElementById(`code${i}`).style.display = "none"
            }

          
            for (let i=0; i<colors.length; i++) {
                const hex = colors[i].hex.value
                const code = document.getElementById(`code${i+1}`)
                const box = document.getElementById(`box${i+1}`)

                box.style.display = "block"
                code.style.display = "block"
                box.style.backgroundColor = hex
                code.innerText = hex

                box.onclick = () => copyToClipboard(hex)
                code.onclick = () => copyToClipboard(hex)
            }

            

        })
        

}


generateBtn.addEventListener("click", function(e) {
    e.preventDefault()
    getColorScheme()
})

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
    alert(`${text} copied!`)
}

getColorScheme()



