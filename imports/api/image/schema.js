import { SimpleSchema } from 'meteor/aldeed:simple-schema'
const Image = new Mongo.Collection('Image')



Image.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
})

// Image.schema = new SimpleSchema({
//     Containers: { type: Number },
//     Created: { type: Number },
//     Id: { type: String },
//     Labels: { type: Object },
//     ParentId: { type: String },
//     RepoDigests: { type: [String] },
//     RepoTags: { type: [String] },
//     SharedSize: { type: Number },
//     Size: { type: Number },
//     VirtualSize: { type: Number },
// })

// Image.attachSchema(Image.schema)

export default Image