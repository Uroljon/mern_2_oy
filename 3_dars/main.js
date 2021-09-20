// request server using xml http request
function ajax(user) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${user}/repos`, true) //last param is_asyncronous_boolean
    xhr.onload = function () {
        if (this.status === 200) {
            let response = JSON.parse(this.response)
            document.querySelector("#result").innerHTML = "";
            // document.querySelector("#result").insertAdjacentHTML("afterbegin", `<img src="${response[0].owner.avatar_url}">`)
            document.querySelector(".user").innerHTML = `
            <h3 id="user_name">${response[0].owner.login}</h3>
            <img src="${response[0].owner.avatar_url}">
            <a href="${response[0].owner.html_url}">check out this user</a>
            `;
            response.forEach(repo => {
                document.querySelector("#result").innerHTML += `
            <div class="repo">
                
                <h3 id="repo_name">${repo.name}</h3>
                <p id="repo_description">${repo.description}</p>
                <a href="${repo.html_url}">Go to repo website</a>
            </div>
            `;

            });
        } else {
            document.querySelector("#result").innerHTML = "bunaqa user yo'qmi deyman :}";
        }
    }
    // xhr.onerror = () => {
    //     document.querySelector("#result").innerHTML = "bunaqa user yo'qmi deyman :}";
    // }
    xhr.send()
}

// next renders as button is pressed
document.querySelector("#search").addEventListener("click", (e) => {
    let search_key = document.querySelector("#username").value;
    e.preventDefault();
    ajax(search_key);
});


/****
Github API bilan:
- githubdan userlarni search qilish
- repo’larni search qilish (malum bir user uchunmas umumiy githubdagi barcha repo’lar orasidan)
- topilgan userni repo’larini sahifaga chiqarib bera olish
*/