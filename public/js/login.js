const onFormSubmit = async (e) => {
    try {
        e.preventDefault();

        resetError();
        setLoading();

        let formData = new FormData(loginForm);
        let body = {};
        formData.forEach((value, key) => {body[key] = value});

        let payload = JSON.stringify(body);


        let response = await fetch('/api/login', {
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
    } catch(e) {
        setError("Some error occurred on the server");
    }
}

function init() {
    let token = localStorage.getItem('__token__');
    if(token) {
        window.location.replace('/app');
    }

    else {
        var loginForm = `
            <span class='logo-wrapper'>
                <img class='logo' src='/images/logo-small.png'/>
            </span>
            <h2>Sign in to Sociomata</h2>
            <form id="loginForm">
                <input placeholder="Email" name="email" type="email"/>
                <input placeholder="Password" name="password" type="password"/>
                <button type="submit">Sign in</button>
            </form>
            <script src="/js/login.js"></script>
            <!---
            <span class="links">
                <a>Forgot password?</a>
            </span>
            --->
        `;

        document.getElementById("content").innerHTML = loginForm;

        window.addEventListener('submit', (e) => onFormSubmit(e));
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


window.addEventListener("load", init);
