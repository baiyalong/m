import Network from './schema'


Meteor.publish('networks', function() {
    return Network.find()
})