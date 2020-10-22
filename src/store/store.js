import Vue from "vue";
function formateDate(date){
    let month = date.getMonth()+1;
    let date1 = date.getDate()
    return `${month}.${date1}`
}
let store = Vue.observable({
    enter_time:formateDate(new Date()),
    leave_time:formateDate(new Date())
})

export default store