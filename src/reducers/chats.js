/* eslint-disable */

// var initialState = [
//     { name: 'mojombo', id: 1 },
//     { name: 'mojomb', id: 2 },
//     { name: 'mojom', id: 3 },
//     { name: 'mojo', id: 4 },
//     { name: 'moj', id: 5 },
//     { name: 'mo', id: 6 },
//     { name: 'm', id: 7 }
// ];



// export default function chatList(state = initialState, action) {
//     if (action.type === 'LOAD_CHATS') {
//         return action.chats
//     }
//     return state;
// }

// var asd = function () {
//     return window.fetch('http://localhost:3012/chats')
//         .then(function (res) {
//              res.json()
//         }).then(data => console.log(data))
// };
// asd();




const chatsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CHATS':
    console.log(123)
      return action.chats;
    
    default:
      return state;
  }
}
 
export default chatsReducer;


