import Process from './schema'
import Docker from 'dockerode'

var docker = new Docker()

Meteor.methods({
    'process.refresh' () {
        var res = Meteor.wrapAsync(docker.listContainers, docker)({
            all: true,
            filters: {
                label: ['user_id=' + this.userId]
            }
        })
        res.forEach(e => {
            Process.upsert({
                Id: e.Id
            }, {
                Id: e.Id,
                Name: e.Names,
                Image: e.Image,
                Network: null,
                Network_port: null,
                Volume: null,
                Volume_path: null,
                Status: e.Status,
                Created: e.Created,
                user_id: e.Labels.user_id
            })
        })
        Process
            .find()
            .fetch()
            .filter(e => e.user_id == this.userId && !res.find(r => r.Id == e.Id))
            .forEach(e => Process.remove({
                Id: e.Id
            }))
    },
    'process.create' (e) {
        var host_port = e.NETWORK_PORT && e.NETWORK_PORT.split(':')[0] + ''
        var container_port = e.NETWORK_PORT && e.NETWORK_PORT.split(':')[1] + '/tcp'
        var volume_path = e.VOLUME_PATH

        try {
            Meteor.wrapAsync(docker.createContainer, docker)({
                name: e.NAME,
                Image: e.IMAGE,
                ExposedPort: {
                    [container_port]: {}
                },
                Volumes: {
                    [volume_path]: {}
                },
                HostConfig: {
                    Binds: [e.VOLUME + ':' + e.VOLUME_PATH],
                    NetworkMode: e.NETWORK,
                    PortBindings: {
                        [container_port]: [{
                            HostPort: host_port
                        }]
                    },
                },
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
            a.forEach(id => {
                var process = docker.getContainer(id)
                Meteor.wrapAsync(process.remove, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    }
})