window.addEventListener("load", () => {

    //get messages from server every 2 seconds
    setInterval(() => {
      console.log("checking for messages every 2 seconds");
      refreshMsgs();
    }, 2000);
  
  
    let chatForm = document.getElementById("chat_form");
    // on form submission
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let chatName = document.getElementById("chat-name").value;
      let chatMsg = document.getElementById("chat-msg").value;
      console.log("chat sent!", chatName, chatMsg);
  
      let msgObj = {
        "name" : chatName,
        "msg" : chatMsg,
        "updateAt" : new Date()
      };
  
      let msgObjJSON = JSON.stringify(msgObj);
      console.log(msgObjJSON);
  
      fetch('/message', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: msgObjJSON
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    })
  })
  
  
  function refreshMsgs() {
    console.log("inside refresh messages")
    fetch('/messages')
    .then(res => res.json())
    .then(data => {
  
      console.log(data, document.getElementById("chat-msgs"));
      document.getElementById("chat_area").innerHTML = "";
      let allChats = data.msgs;
      allChats.forEach((chat) => {
        let chatContainer = document.createElement('li');
        let nameElt = document.createElement('p');
        let colon = document.createElement('p');
        let msgElt = document.createElement('p');
        let x = document.createElement("HR");
        nameElt.innerHTML= chat.name;
        msgElt.innerHTML = chat.msg;
        colon.innerHTML = ":<br>"
        chatContainer.classList.add("chat__list-item");
        nameElt.classList.add("chat__list-item-name");
        msgElt.classList.add("chat__list-item-msg");
        msgElt.classList.add("msgss");
  
        //append all the elements as per their hierarchy
        chatContainer.appendChild(nameElt);
        chatContainer.appendChild(colon);
        chatContainer.appendChild(msgElt);
        chatContainer.appendChild(x);
        document.getElementById("chat_area").appendChild(chatContainer);
        // document.getElementById("chat_area").appendChild("<hr/>");
  
  
      })
  
        //clear out the HTML div that contains all the messages
        //add all the new messages that we have
    })
  }
  
  
  /* what happens on form submission?
  1. get the value of what the user typed - DONE
  2a. Sent message to the server - DONE
  2b. store the message on server side
  3. display the chat message on screen
  
  */
  
// console.log("hi");
// window.addEventListener("load",()=>{

//     setInterval(()=>{
//         refreshMSGS();
//         console.log("every two seconds")
//     },200);

//     let chat_form = document.getElementById("chat_form");
//     // on form submission
//     chat_form.addEventListener("submit",(e)=>{
//         e.preventDefault();
//         console.log("sent");
//         let chatName = document.getElementById("chat-name").value;
//         let chatMsg = document.getElementById("chat-msg").value;
//         console.log(chatName);
//         console.log(chatMsg);

//         let msgObject = {
//             "name": chatName,
//             "msg" : chatMsg
//         };

//         let myObjJSON = JSON.stringify(msgObject)
//         console.log(myObjJSON);

//         fetch('/message', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: myObjJSON
//           })
//           .then(res => res.json())
//           .then(data => {
//             console.log(data)
//           })
        
//     })
// })


// function refreshMSGS(){
//     fetch("/messages")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// }

// // after form submission

// // 1.get the value of what the user typed

// // 2. store the message in the server side

// // 3. display the chat massage on screen
