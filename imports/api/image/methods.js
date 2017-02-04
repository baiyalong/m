import Docker from 'dockerode'
import Image from './schema'

var docker = new Docker()

Meteor.methods({
    'image.refresh' () {
        var res = Meteor.wrapAsync(docker.listImages, docker)()
        res.forEach(e => {
            Image.upsert({
                Id: e.Id
            }, {
                Id: e.Id,
                RepoTags: e.RepoTags,
                Created: e.Created,
                Size: e.Size
            })
        })
        Image
            .find()
            .fetch()
            .filter(e => !res.find(r => r.Id == e.Id))
            .forEach(e => Image.remove({Id: e.Id}))
    }
})
