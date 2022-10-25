console.log("hi");
window.addEventListener("load",()=>{

    setInterval(()=>{
        refreshMSGS();
        console.log("every two seconds")
    },200);

    let chat_form = document.getElementById("chat_form");
    // on form submission
    chat_form.addEventListener("submit",(e)=>{
        e.preventDefault();
        console.log("sent");
        let chatName = document.getElementById("chat-name").value;
        let chatMsg = document.getElementById("chat-msg").value;
        console.log(chatName);
        console.log(chatMsg);

        let msgObject = {
            "name": chatName,
            "msg" : chatMsg
        };

        let myObjJSON = JSON.stringify(msgObject)
        console.log(myObjJSON);

        fetch('/message', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: myObjJSON
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })
        
    })
})


function refreshMSGS(){
    fetch("/messages")
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}

// after form submission

// 1.get the value of what the user typed

// 2. store the message in the server side

// 3. display the chat massage on screen
