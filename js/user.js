const nameForm = document.querySelector("#name-form");

nameForm.addEventListener("submit", setSubmit);

function setSubmit(event){
    event.preventDefault();
    const name = nameForm.querySelector("input");
    const text = name.value;
    save("name", text);
    name.value = "";
    setPlaceholder(text)
}

const localName = localStorage.getItem("name");

if(localName !== null){
    setPlaceholder(localName)
}

function setPlaceholder(text){
    const name = nameForm.querySelector("input");
    name.placeholder = `Hello, ${text}`;
}