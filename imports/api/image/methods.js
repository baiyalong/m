import Docker from 'dockerode'
import Image from './schema'

docker = new Docker()

Meteor.methods({
    'image.refresh' () {
        Image.remove({})
        docker.listImages({}, Meteor.bindEnvironment((err, res) => {
            err ? console.error(err) : res.forEach(e => Image.upsert({ Id: e.Id }, e, Meteor.bindEnvironment((err,res)=>{})))
        }))
    }
})