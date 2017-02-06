import Network from './schema'
import Docker from 'dockerode'

var docker = new Docker()

Meteor.methods({
    'network.refresh' () {
        var res = Meteor.wrapAsync(docker.listNetworks, docker)()

        res = res.filter(e => e.Labels.user_id == this.userId)

        res.forEach(e => {
            Network.upsert({
                Id: e.Id
            }, {
                Id: e.Id,
                Name: e.Name,
                Created: e.Created,
                IPAM_Subnet: e.IPAM.Config[0].Subnet,
                IPAM_Gateway: e.IPAM.Config[0].Gateway,
                user_id: e.Labels.user_id
            })
        })
        Network
            .find()
            .fetch()
            .filter(e => e.user_id == this.userId && !res.find(r => r.Id == e.Id))
            .forEach(e => Network.remove({
                Id: e.Id
            }))
    },
    'network.create' (e) {
        return Meteor.wrapAsync(docker.createNetwork, docker)({
            Name: e.name,
            CheckDuplicate: true,
            Labels: {
                user_id: this.userId
            }
        })
    },
    'network.remove' (a) {
        return a.forEach(id => Meteor.wrapAsync(docker.getNetwork(id).remove, docker)({
            id
        }))
    },
})