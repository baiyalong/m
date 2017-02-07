import Network from './schema'
import Docker from 'dockerode'

var docker = new Docker()

Meteor.methods({
    'network.refresh' () {
        var res = Meteor.wrapAsync(docker.listNetworks, docker)({
            filters: {
                label: ['user_id=' + this.userId]
            }
        })

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
            .forEach(e => Network.remove({ Id: e.Id }))
    },
    'network.create' (e) {
        try {
            Meteor.wrapAsync(docker.createNetwork, docker)({
                Name: e.NAME,
                CheckDuplicate: true,
                Labels: {
                    user_id: this.userId
                }
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'network.remove' (a) {
        try {
            a.forEach(id => {
                var network = docker.getNetwork(id)
                Meteor.wrapAsync(network.remove, network)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    }
})