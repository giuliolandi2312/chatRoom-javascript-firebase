// dedicato a mettere le chat e i dati insieme

class Chatroom {
  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats')
    this.unsub

  }
  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the cat document
    const response = await this.chats.add(chat);
    return response
  }
  getChats(callback){
    this.unsub = this.chats
    .where('room','==', this.room)         // ci permette di prendere un documento se una certa condizione è vera
    .orderBy('created_at')                // ordina i documenti secondo una chiave
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
          // update UI
          callback(change.doc.data())
        }
      })
    })
  }
  updateName(username){
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room) {
    this.room = room;
    console.log('room updated')
    if(this.unsub){
      this.unsub();
    }
  }
}
