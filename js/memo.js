const KEY_FOLD = "fold";
const KEY_MEMO = "prememo";
const KEY_RENEWAL = "renewal";
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


const count = 3;

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
    insertMemoList(pastSelectList[0].memoList);
}

function insertPast(title, id){
    const button = document.createElement("button");
    button.innerText = title;
    button.className = KEY_PAST;
    button.id = id;
    button.addEventListener("click",pastSelect);
    memoContainer.appendChild(button);
}

function numberPadStart(number){
    return String(number).padStart(2,"0");
}

function past(button){
    checkButton = button;
    const renewalButton = document.getElementById(KEY_RENEWAL);
    // button.disabled = true;
    if(!renewalButton.disabled){
        button.classList.remove("check");
        renewal();
    }else{
        button.classList.add("check");
        renewalButton.disabled = false;
        saveRenewalList = JSON.parse(localStorage.getItem("saveRenewalList"));
        for(let i = saveRenewalList.length - 1; i >= 0 ; i--){
            const date = new Date(saveRenewalList[i].id);
            const title = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${numberPadStart(date.getHours())}:${numberPadStart(date.getMinutes())}:${numberPadStart(date.getSeconds())}`;
            insertPast(title, saveRenewalList[i].id);
        }
    }
}

function visibleMemo(button){
    const containers = baseContainer.querySelectorAll(".container");
    if(memoFlag){
        button.innerText = "글감생성기";
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
        button.classList.add("check");
        memoSizeFlag = false;
    }else{
        memo.classList.remove("memosize");
        button.classList.remove("check");
        memoSizeFlag = true;
    }
}

function renewal(){

    document.getElementById(KEY_RENEWAL).disabled = true;
    document.getElementById(KEY_PAST).classList.remove("check");

    if(memoList.length > 0){
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
        insertMemo(memoList[i]);
    }
}

function insertMemo(memo){
    const textarea = document.createElement("textarea");
    textarea.value = memo;
    textarea.className = KEY_MEMO;
    textarea.disabled = true;
    textarea.cols = 30;
    textarea.rows = 10;
    memoContainer.appendChild(textarea);
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
