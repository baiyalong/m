// import { SimpleSchema } from 'meteor/aldeed:simple-schema'
const Volume = new Mongo.Collection('Volume')



Volume.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
})



export default Volume