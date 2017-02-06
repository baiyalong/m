import Process from './schema'

Meteor.publish('processes', function () {
    return Process.find({user_id: this.userId})
})