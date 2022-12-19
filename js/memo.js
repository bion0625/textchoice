const KEY_FOLD = "fold";
const KEY_MEMO = "prememo";
const baseContainer = document.querySelector(".base-container");
const memoContainer = document.querySelector(".memo-container");
const memo = document.querySelector(".memo");
let memoList = [];

let memoFlag = true;
let memoSizeFlag = true;

function visibleMemo(button){
    const containers = baseContainer.querySelectorAll(".container");
    if(memoFlag){
        containers.forEach(container => container.classList.add(KEY_FOLD));
        memoContainer.classList.remove(KEY_FOLD);
        memoFlag = false;
    }else{
        containers.forEach(container => container.classList.remove(KEY_FOLD));
        memoContainer.classList.add(KEY_FOLD);
        memoFlag = true;
    }
}

function size(){
    if(memoSizeFlag){
        memo.classList.add("memosize");
        memoSizeFlag = false;
    }else{
        memo.classList.remove("memosize");
        memoSizeFlag = true;
    }
}

function renewal(){
    removeAllMemo();
    memoList = [];
    saveLocalStorage(memoList);
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
    if(memoList.length >= 10){
        alert("memo can't exceed 10 !!");
        return;
    }
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

const savedMemoList = JSON.parse(localStorage.getItem("memoList"));

if(savedMemoList !== null && savedMemoList.length > 0){
    memoList = savedMemoList;
    insertMemoList(savedMemoList);
}
