

Meteor.methods({
    'samba.createUser'(e){
        var e = {
            username:'admin',
            password:'qwe'
        }

    },
    'samba.shareDir'(dir){},
    'samba.cancelDir'(dir){}
})