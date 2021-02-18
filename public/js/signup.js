function resetError() {
    document.getElementById("message").style.background = "white";
    document.getElementById("message").innerHTML = ``;
}

function setError(message) {
    document.getElementById("message").style.background = "red";
    document.getElementById("message").innerHTML = `<span>${message}</span>`;
}

signupForm.onsubmit = async (e) => {
    try {
        e.preventDefault();

        resetError();

        let formData = new FormData(signupForm);
        let body = {};
        formData.forEach((value, key) => {body[key] = value});

        let payload = JSON.stringify(body);


        let response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });

        if(response.status === 502) {
            setError("Some error occurred on the server");
        }
        else {
            let result = await response.json();
            if(response.ok) {
                localStorage.setItem('__token__', result.token);
                window.location.replace("/app");
            }
            else {
                setError(result.message);
            }
        }
    } catch(e) {
        setError("Some error occurred on the server");
    }
}
