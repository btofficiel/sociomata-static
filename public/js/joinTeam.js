const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let team = params.t; 

if(!team) {
    setError("Sorry, your invite link is invalid");
}

const onFormSubmit = async (e) => {
    try {
        e.preventDefault();

        if(team) {

            resetError();
            setLoading();


            let formData = new FormData(signupForm);
            let body = {};
            formData.forEach((value, key) => {body[key] = value});
            body.team_id = Number(team)

            let payload = JSON.stringify(body);

            let response = await fetch('/api/join', {
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
                    setTimeout(resetError, 3000);
                }
            }
        }
    } catch(e) {
        setError("Some error occurred on the server");
    }
}

function setLoading() {
    document.getElementById("message").className = "message loading";
    let dots = `
        <span>
            <span class="dot-flashing"></span>
            <span class="dot-flashing"></span>
            <span class="dot-flashing"></span>
            <span class="dot-flashing"></span>
            <span class="dot-flashing"></span>
            <span class="dot-flashing"></span>
        </span>
    `;
    document.getElementById("message").innerHTML = dots;
}

function resetError() {
    document.getElementById("message").className = "message nothing";
    document.getElementById("message").innerHTML = ``;
}

function setError(message) {
    document.getElementById("message").className ="message error";
    document.getElementById("message").innerHTML = `<span>${message}</span>`;
}


window.addEventListener('submit', (e) => onFormSubmit(e));
