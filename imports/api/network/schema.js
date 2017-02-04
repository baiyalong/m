// import { SimpleSchema } from 'meteor/aldeed:simple-schema'
const Network = new Mongo.Collection('Network')



Network.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
})

// Network.schema = new SimpleSchema({
//     user_id: { type: String },
//     container_id: { type: String },
//     ip_addr: { type: String },
// })

// Network.attachSchema(Network.schema)

export default Network