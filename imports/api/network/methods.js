import Docker from 'dockerode'
import Network from './schema'

docker = new Docker()

Meteor.methods({
    'network.create' (name) {
        var user_id = this.userId
        return Meteor.wrapAsync(docker.createNetwork, docker)({ name, CheckDuplicate: true })
    }
})