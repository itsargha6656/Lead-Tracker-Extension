const saveBtn = document.getElementById("input-btn")
let inputBox = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let arr = []
let listItems = ""
let deleteBtn = document.getElementById("delete-btn")
let saveTabBtn=document.getElementById("save-btn")
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()

    arr = []
    renderValues(arr)

})
saveTabBtn.addEventListener("click",function(){
 chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let url = activeTab.url;
    arr.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(arr))
    renderValues(arr)
}) 
})
saveBtn.addEventListener("click", function () {
    arr.push(inputBox.value)
    inputBox.value = ""
    localStorage.setItem("myLeads", JSON.stringify(arr))
    renderValues(arr)
})
let leadsfromlocalstorage = JSON.parse(localStorage.getItem("myLeads"))
if (Boolean(leadsfromlocalstorage)) {
    arr = leadsfromlocalstorage
    renderValues(arr)
}

function renderValues(arr) {
    listItems=""
    for (let a = 0; a < arr.length; a++) {
        // listItems+="<li>"+"<a target ='_blank' href='arr[a]'>"+arr[a]+"</a>"+"</li>"
        //template strings
        listItems += `<li> 

    <a target ='_blank' href='${arr[a]}'>

   ${arr[a]}
</a>


</li>`
    }
    ulEl.innerHTML = listItems
}