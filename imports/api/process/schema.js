// import { SimpleSchema } from 'meteor/aldeed:simple-schema'
const Process = new Mongo.Collection('Process')



Process.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
})



export default Process