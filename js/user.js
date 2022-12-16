const nameForm = document.querySelector("#name-form");

nameForm.addEventListener("submit", setSubmit);

function setSubmit(event){
    event.preventDefault();
    const name = nameForm.querySelector("input");
    const text = name.value;
    save("name", text);
    name.value = "";
    name.placeholder = `hello, ${text}`;
}

const localName = localStorage.getItem("name");

if(localName !== null){
    const name = nameForm.querySelector("input");
    name.placeholder = `HELLO, ${localName}`;
}