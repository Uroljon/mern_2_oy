// makes scrolling convenient
window.addEventListener("DOMContentLoaded", ()=>{
    let chat = document.querySelector('.col-8');
    console.log(chat.scrollHeight, "px");
    chat.scrollTop = chat.scrollHeight;
})