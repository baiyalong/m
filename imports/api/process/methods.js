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
                Network: e.HostConfig.NetworkMode,
                Network_port: e.Ports,
                Volume: e.Mounts[0] && e.Mounts[0].Name,
                Volume_path: e.Mounts[0] && e.Mounts[0].Destination,
                Status: e.Status,
                Created: e.Created,
                user_id: e.Labels.user_id
            })
        })
        Process
            .find()
            .fetch()
            .filter(e => e.user_id == this.userId && !res.find(r => r.Id == e.Id))
            .forEach(e => Process.remove({Id: e.Id}))
    },
    'process.create' (e) {
        var host_port = e.NETWORK_PORT && e
            .NETWORK_PORT
            .split(':')[0] + ''
        var container_port = e.NETWORK_PORT && e
            .NETWORK_PORT
            .split(':')[1] + '/tcp'
        var volume_path = e.VOLUME_PATH

        var d = {
            AttachStdin: true,
            Tty: true,
            Cmd: '/bin/sh',
            HostConfig: {},
            Labels: {
                user_id: this.userId
            }
        }

        if (e.NAME) 
            d.name = e.NAME
        if (e.IMAGE) 
            d.Image = e.IMAGE
        if (e.NETWORK) 
            d.HostConfig.NetworkMode = e.NETWORK
        if (e.NETWORK_PORT) {
            d.ExposedPort = {
                [container_port]: {}
            }
            d.HostConfig.PortBindings = {
                [container_port]: [
                    {
                        HostPort: host_port
                    }
                ]
            }
        }

        if (e.VOLUME && e.VOLUME_PATH) {
            d.Volumes = {
                [volume_path]: {}
            }
            d.HostConfig.Binds = [e.VOLUME + ':' + e.VOLUME_PATH]
        }

        try {
            Meteor.wrapAsync(docker.createContainer, docker)(d)
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
    },
    'process.start' (a) {
        try {
            a.forEach(id => {
                var process = docker.getContainer(id)
                Meteor.wrapAsync(process.start, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'process.pause' (a) {
        try {
            a.forEach(id => {
                var process = docker.getContainer(id)
                Meteor.wrapAsync(process.pause, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'process.unpause' (a) {
        try {
            a.forEach(id => {
                var process = docker.getContainer(id)
                Meteor.wrapAsync(process.unpause, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'process.stop' (a) {
        try {
            a.forEach(id => {
                var process = docker.getContainer(id)
                Meteor.wrapAsync(process.stop, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'process.restart' (a) {
        try {
            a.forEach(id => {
                var process = docker.getContainer(id)
                Meteor.wrapAsync(process.restart, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'process.kill' (a) {
        try {
            a.forEach(id => {
                var process = docker.getContainer(id)
                Meteor.wrapAsync(process.kill, process)()
            })
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    },
    'process.console_open' (id) {
        var res
        try {
            var process = docker.getContainer(id)
            res = Meteor.wrapAsync(process.exec, process)({AttachStdin: true, AttachStdout: true, AttachStderr: true, Tty: true, Cmd: ['/bin/sh']})
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
        return res
    },
    'process.console_resize' (id, size) {
        try {
            var exec = docker.getExec(id)
            res = Meteor.wrapAsync(exec.resize, exec)(size)
        } catch (e) {
            throw new Meteor.Error(e.json.message)
        }
    }
})