const KEY_FOLD = "fold";
const baseContainer = document.querySelector(".base-container");

let memoFlag = true;

function visibleMemo(button){
    const containers = baseContainer.querySelectorAll(".container");
    const memoList = document.querySelectorAll(".memo");
    if(memoFlag){
        containers.forEach(container => container.classList.add(KEY_FOLD));
        memoList.forEach(memo => memo.classList.remove(KEY_FOLD));
        memoFlag = false;
    }else{
        containers.forEach(container => container.classList.remove(KEY_FOLD));
        memoList.forEach(memo => memo.classList.add(KEY_FOLD));
        memoFlag = true;
    }
}