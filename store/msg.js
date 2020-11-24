export const state = () => ({
  showMsg: false,
  text: ''
})

export const getters = {
  showMsg(state){
    return state.showMsg;
  },
  text(state){
    return state.text;
  }
}

export const mutations = {
  setShowMsg(state, payload){
    this.state.msg.showMsg = payload.show;
    this.state.msg.text = payload.text; 
  }
}