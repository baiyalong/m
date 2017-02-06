import Volume from './schema'

Meteor.publish('volumes', function () {
    return Volume.find({user_id: this.userId})
})