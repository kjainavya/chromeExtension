//part 1
const inputSave = document.getElementById("input-btn")
// part 2
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];

// let myLeads = `["www.google.com"]`;//myleads is an string as we quote it inside backtick
// myLeads = JSON.parse(myLeads);//to convert string to array:
// myLeads = JSON.stringify(myLeads);//converting array to string

// localStorage.setItem("key", "value");//both key and val need to be string
// localStorage.setItem("myLeads" , "www.google")
// localStorage.getItem("key");
//localStorage.getItem("myLeads");//we use localstorage to store prev save leads so that next time user visit the extension prev ledas can be seen
//local storage already inbuilt no need to define(read about it)
// localStorage.clear();



// function saveInput(){
//     console.log("button clicked")
// }
//or  instead of using onclick we can use addeventlistener()

//so now when we reload the page the prev leads will still be there(imp)
let leadFromLocal = JSON.parse(localStorage.getItem("myLeads"))
if(leadFromLocal){
  myLeads = leadFromLocal;
  renderLeads(myLeads)
}


inputSave.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    //saving myleads array to localstorage
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    renderLeads(myLeads);
    // console.log(localStorage.getItem("myLeads"))
  inputEl.value = " ";//to clear the input field automatically
})

//2.adding eventlistener to delete btn
deleteBtn.addEventListener("click",function(){//clear locstorage , myleads array and dom
  localStorage.clear()
  myLeads = []
  renderLeads(myLeads)//clear dom
})

//tab-btn
tabBtn.addEventListener("click",function(){
  //get the url of current website or tab 
//   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//     console.log(tabs[0].url);
// });
//chrome is a var we have access to while using chrome extension,tabs is an object and query is its method.Also chrome.tab is an api
//active means the tab we are at and not other tab opened in browser and currentwindow true means say we have other window open where our browser is running so grab url from the window we are working on
chrome.tabs.query({active : true , currentWindow : true}, function(tabs){
  myLeads.push(tabs[0].url);
  //save it to local storage
  localStorage.setItem("myLeads" ,JSON.stringify(myLeads));
  renderLeads(myLeads);
})
})

function renderLeads(leads){//making func dyanamic by not directly passing myleads array but a local var and can replace it with any var
    let listItems = " "
      
    for(let i=0;i<leads.length;i++){
        //render the leads in <li> tag inside uo list and first push in arrys , also template strings or bactics helps in multiline code
        listItems += `<li> 
        <a target= '_blank' href='${leads[i]}'>${leads[i]} </a>
        </li>` ;//To open a link in a new tab, set the target attribute to _blank
        }
         ulEl.innerHTML = listItems;
}



// playing around with innerhtml prop(important)
// let contAl = document.getElementById("container");
// contAl.innerHTML = "<button onclick='buy()''>BUY!</button>"
// function buy(){
//     contAl.innerHTML += "<p>thanks for buying</p>"
// }


