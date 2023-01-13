const input = document.getElementById('wordInput')
let playAudio

const sendMeaning = () => {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value
        }`

    const xhr = new XMLHttpRequest()

    xhr.open('GET', URL, true)

    xhr.onload = function () {
        if (this.status == 200) {
            let response = JSON.parse(this.responseText)
            const wordContainer = document.querySelector('.word-container')

            let wordHtml = `
            
        <div class="my-2">

            <h2>Meaning</h2>
            <p>${response[0].meanings[0].partOfSpeech}</p>
            <div class="audioPhoneitc">
                <i class="fi fi-ss-volume" onclick="playAudio()"></i>
                <p>${response[0].phonetic}</p>
            </div>
            <p>- ${response[0].meanings[0].definitions[0].definition}</p>

            <div class="my-2">
                <h2>Synonyms</h2>
                <ul>`

            for (let i = 0; i < response[0].meanings[0].synonyms.length; i++) {
                const element = response[0].meanings[0].synonyms
                wordHtml += `<li>${response[0].meanings[0].synonyms.length > 0 ? response[0].meanings[0].synonyms[i] : "-"}</li>`
            }

            wordHtml += "</ul>"


            if (response[0].meanings[0].synonyms.length === 0) {
                wordHtml += `<p>Synonyms to this word are not available!</p>`
            }

            playAudio = () => {
                const audio1 = new Audio(response[0].phonetics[0].audio)
                audio1.play()

                const audio2 = new Audio(response[0].phonetics[1].audio)

                if (response[0].phonetics[0].audio === '') {
                    audio2.play()
                }
            }

            `
            </div >
        </div >

    `

            console.log(response[0])
            wordContainer.innerHTML = wordHtml

        } else {
            console.error('Some error occurred')
        }
    }

    xhr.send()
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        sendMeaning()
    }
})

