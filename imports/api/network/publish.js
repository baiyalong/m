import Network from './schema'

Meteor.publish('networks', function () {
    return Network.find({user_id: this.userId})
})