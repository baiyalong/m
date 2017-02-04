import Image from './schema'

// var docker = new Docker()

// const POLL_INTERVAL = 2000;

Meteor.publish('images', function () {

    // Meteor.call('image.refresh')

    // this.ready()

    // const interval = Meteor.setInterval(Meteor.call('image.refresh'), POLL_INTERVAL);

    // this.onStop(() => {
    //     Meteor.clearInterval(interval);
    // });

    return Image.find()
})