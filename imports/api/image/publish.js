import Image from './schema'


Meteor.publish('images', function() {
    return Image.find()
})