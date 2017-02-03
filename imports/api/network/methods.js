import Docker from 'dockerode'
import Image from './schema'
import shell from 'shelljs'

docker = new Docker()

Meteor.methods({
    'network.create' () {
       var user_id = Meteor.userId()

    }
})