import Process from './schema'
import Docker from 'dockerode'

var docker = new Docker()

Meteor.methods({
    'process.refresh' () {
        var res = Meteor.wrapAsync(docker.listVolumes, docker)()

        res = res
            .Volumes
            .filter(e => e.Labels && e.Labels.user_id == this.userId)

        res.forEach(e => {
            Process.upsert({
                Name: e.Name
            }, {
                Name: e.Name,
                Mountpoint: e.Mountpoint,
                user_id: e.Labels.user_id
            })
        })
        Process
            .find()
            .fetch()
            .filter(e => e.user_id == this.userId && !res.find(r => r.Name == e.Name))
            .forEach(e => Process.remove({Name: e.Name}))
    },
    'process.create' (e) {
        try {
            Meteor.wrapAsync(docker.createContainer, docker)({
                Name: e.NAME,
                // DriverOpts: {     mountpoint: e.MOUNTPOINT },
                Labels: {
                    user_id: this.userId
                }
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'process.remove' (a) {
        try {
            a.forEach(name => {
                var process = docker.getVolume(name)
                Meteor.wrapAsync(process.remove, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    }
})