import Volume from './schema'
import Docker from 'dockerode'

var docker = new Docker()

Meteor.methods({
    'volume.refresh' () {
        var res = Meteor.wrapAsync(docker.listVolumes, docker)({
            filters: {
                label: ['user_id=' + this.userId]
            }
        })

        res = res
            .Volumes
            // .filter(e => e.Labels && e.Labels.user_id == this.userId)

        res.forEach(e => {
            Volume.upsert({
                Name: e.Name
            }, {
                Name: e.Name,
                Mountpoint: e.Mountpoint,
                user_id: e.Labels.user_id
            })
        })
        Volume
            .find()
            .fetch()
            .filter(e => e.user_id == this.userId && !res.find(r => r.Name == e.Name))
            .forEach(e => Volume.remove({ Name: e.Name }))
    },
    'volume.create' (e) {
        try {
            Meteor.wrapAsync(docker.createVolume, docker)({
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
    'volume.remove' (a) {
        try {
            a.forEach(name => {
                var volume = docker.getVolume(name)
                Meteor.wrapAsync(volume.remove, volume)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    }
})