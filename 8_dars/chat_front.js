async function get_users() {
    let response = await fetch("/chat_data", { method: 'GET' })
    if (response.status === 404) {
        throw new Error("User already exists :(")
    } else {
        let data = await response.json()
        return data
    }
}

window.addEventListener("DOMContentLoaded", initiate_render)
function initiate_render() {
    get_users().then(data => {
        document.querySelector("#users_here").innerHTML = "";
        data.users.forEach((reg_user) => {//render users
            let username = reg_user.name;
            document.querySelector("#users_here").innerHTML += `<li class="list-group-item ${username === data.current_user ? 'bg-primary text-light' : ''} bg-opacity-75">${username.replaceAll("+", " ")}</li>`;
        })
        document.querySelector("#messages_here").innerHTML = "";
        data.messages.forEach(message => {//render messages
            document.querySelector("#messages_here").innerHTML += `
            <li class="list-group-item w-100 ${message.username === data.current_user ? 'bg-primary bg-opacity-25' : ''}">
                <h6>${decodeURIComponent(message.username.replaceAll("+", " "))}</h6>
                <hr class="m-1">
                <p class="m-0">${decodeURIComponent(message.message.replaceAll("+", " "))}</p>
            </li>`
        });

    }).catch(err => {
        console.log(err);
    })
}