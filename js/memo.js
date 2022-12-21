const KEY_FOLD = "fold";
const KEY_MEMO = "prememo";
const KEY_RENEWAL = "renewal";
const KEY_CHECK = "check";
const KEY_PAST = "past";
const baseContainer = document.querySelector(".base-container");
const memoContainer = document.querySelector(".memo-container");
const memo = document.querySelector(".memo");
let memoList = [];

let saveRenewalList = [];
const preRenewalList = localStorage.getItem("saveRenewalList");

let memoFlag = true;
let memoSizeFlag = true;

let checkButton = null;

const savedMemoList = JSON.parse(localStorage.getItem("memoList"));
const pastButton = document.querySelector("#button-container .hidden");
const saveButton = document.querySelector("#save-button");

let pastSelectId = null;


const count = 3;


function onText(textarea){
    if(textarea.value.length > 0){
        saveButton.disabled = false;
    }
    else{
        saveButton.disabled = true;
    }
}

if(preRenewalList !== null){
    saveRenewalList = JSON.parse(preRenewalList);
    pastButton.classList.remove(KEY_HIDDEN);
}

function removeAllPast(){
    const pastButtons = document.querySelectorAll(".past");
    pastButtons.forEach(button => button.remove());
}

function pastSelect(button){
    saveRenewalList = JSON.parse(localStorage.getItem("saveRenewalList"));
    const pastSelectList = saveRenewalList.filter(list => String(list.id) === button.target.id);
    saveRenewalList.forEach(list => document.getElementById(list.id).classList.remove(KEY_CHECK))
    if(pastSelectId !== null && pastSelectId === button.target.id){
        button.target.classList.remove(KEY_CHECK);
        pastSelectId = null;
        removeAllMemo();
    }else{
        button.target.classList.add(KEY_CHECK);
        pastSelectId = button.target.id;
        insertMemoList(pastSelectList[0].memoList);
    }
}

function insertPast(title, id){
    const memoButtonContainer = document.querySelector("#memo-button-container")
    const button = document.createElement("button");
    button.innerText = title;
    button.className = KEY_PAST;
    button.id = id;
    button.addEventListener("click",pastSelect);
    memoButtonContainer.appendChild(button);
}

function numberPadStart(number){
    return String(number).padStart(2,"0");
}

function insertPastList(list){
    const date = new Date(list.id);
    const title = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${numberPadStart(date.getHours())}:${numberPadStart(date.getMinutes())}:${numberPadStart(date.getSeconds())}`;
    insertPast(title, list.id);
}

function past(button){
    checkButton = button;
    const renewalButton = document.getElementById(KEY_RENEWAL);
    if(!renewalButton.disabled){
        button.classList.remove(KEY_CHECK);
        renewal();
    }else{
        button.classList.add(KEY_CHECK);
        renewalButton.disabled = false;
        saveRenewalList = JSON.parse(localStorage.getItem("saveRenewalList"));
        saveRenewalList.forEach(list => insertPastList(list));
    }
}

function visibleMemo(button){
    const containers = baseContainer.querySelectorAll(".container");
    if(memoFlag){
        button.innerText = "create";
        containers.forEach(container => container.classList.add(KEY_FOLD));
        memoContainer.classList.remove(KEY_FOLD);
        memoFlag = false;
    }else{
        button.innerText = "memo";
        containers.forEach(container => container.classList.remove(KEY_FOLD));
        memoContainer.classList.add(KEY_FOLD);
        memoFlag = true;
    }
}

function size(button){
    if(memoSizeFlag){
        memo.classList.add("memosize");
        button.classList.add(KEY_CHECK);
        memoSizeFlag = false;
    }else{
        memo.classList.remove("memosize");
        button.classList.remove(KEY_CHECK);
        memoSizeFlag = true;
    }
}

function renewal(){

    document.getElementById(KEY_RENEWAL).disabled = true;
    document.getElementById(KEY_PAST).classList.remove(KEY_CHECK);

    if(memoList.length > 0){
        saveButton.disabled = true;
        const saveRenewal = {
            id : Date.now(),
            memoList : memoList
        }
        saveRenewalList.push(saveRenewal);
        
        if(saveRenewalList.length > 3){
            const tempList = saveRenewalList;
            let cnt = 0;
            saveRenewalList = [];
            for(let i = tempList.length-1; i >= 0; i--){
                if(cnt < count){
                    saveRenewalList.push(tempList[i]);
                }
                cnt++;
            }
        }

        localStorage.setItem("saveRenewalList",JSON.stringify(saveRenewalList));
    }

    removeAllMemo();

    if(checkButton !== null){
        checkButton.disabled = false;
    }
    removeAllPast();
    memoList = [];
    saveLocalStorage(memoList);
    pastButton.classList.remove(KEY_HIDDEN);
    document.getElementById(KEY_PAST).disabled = false;
}

function removeAllMemo(){
    const preMemoList = document.querySelectorAll(".prememo");
    preMemoList.forEach(memo => memo.remove());
}

function insert(){
    if(memo.value.trim() === ""){
        alert("memo is empty !!");
        return;
    }
    if(memoList.length >= count){
        alert("memo can't exceed "+count+" !!");
        return;
    }

    // const renewalButton = document.getElementById(KEY_RENEWAL);
    // if(!renewalButton.disabled){
    //     renewal();
    // }

    document.getElementById(KEY_PAST).disabled = true;

    document.getElementById(KEY_RENEWAL).disabled = false;

    memoList.push(memo.value);
    insertMemoList(memoList);
    saveLocalStorage(memoList);
    memo.value = "";
}

function insertMemoList(memoList){
    removeAllMemo();
    for(let i = memoList.length-1; i>=0;i--){
        insertMemo(memoList[i], memoList.length-i, count);
    }
}

function insertMemo(memo, number, length){
    const div = document.createElement("div");
    div.className = KEY_MEMO;
    const textarea = document.createElement("textarea");
    textarea.value = memo;
    textarea.disabled = true;
    textarea.cols = 30;
    textarea.rows = 10;
    const span = document.createElement("span");
    span.innerText = String(number) +"/"+ length;
    div.appendChild(span);
    div.appendChild(textarea);
    memoContainer.appendChild(div);
}

function saveLocalStorage(memoList){
    const saveMemoList = JSON.stringify(memoList)
    localStorage.setItem("memoList", saveMemoList);
}

if(savedMemoList !== null && savedMemoList.length > 0){
    document.getElementById(KEY_PAST).disabled = true;
    document.getElementById(KEY_RENEWAL).disabled = false;
    memoList = savedMemoList;
    insertMemoList(savedMemoList);
}
