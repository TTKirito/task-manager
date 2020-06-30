const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true}, (error , client) => {
    if(error) {
        console.log('Unable to connect Database')
    }
    
    const db = client.db(databaseName)


    db.collection('user').updateOne(
        {
            name: 'thuan',
            
        },{
            $set:{
                name: 'thuong'
            }
        }
    ).then(result => {
        console.log(result)
    }).catch(e => {
        console.log(e)
    })
})
