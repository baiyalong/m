import Network from './schema'
import Docker from 'dockerode'

var docker = new Docker()

Meteor.methods({
    'network.refresh' () {
        var res = Meteor.wrapAsync(docker.listNetworks, docker)({'Labels.user_id': this.userId})
        console.log(res)
        res.forEach(e => {
            Network.upsert({
                Id: e.Id
            }, e)
        })
        Network.find({}, {fields: {
                    Id
                }})
            .fetch()
            .filter(e => res.find(r => r.Id == e.Id))
            .forEach(e => Image.remove({Id: e.Id}))
    },
    'network.create' (name) {
        return Meteor.wrapAsync(docker.createNetwork, docker)({
            Name: name,
            CheckDuplicate: true,
            Labels: {
                user_id: this.userId
            }
        })
    }
})