function ajaxFromRequest(url, formId, resultIdDiv) {
    const resultDiv = document.getElementById(resultIdDiv)
    resultDiv.style.visibility = 'hidden'

    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            const data = JSON.parse(xmlhttp.responseText)

            if (data.success)
                resultDiv.className = "has-text-success"
            else
                resultDiv.className = "has-text-danger"

            resultDiv.innerHTML = data.message
            resultDiv.style.visibility = 'visible'
        }
    }

    xmlhttp.open("POST", url, true)
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    const form = document.getElementById(formId)
    const postData = Array.from(new FormData(form), e => e.map(encodeURIComponent).join('=')).join('&')
    xmlhttp.send(postData)
}