
import mongoose from 'mongoose';

function db() {
    try {
        mongoose.connect("mongodb+srv://codebuddysync:l0NiebA4ZvAEFdhV@codebuddysync-cluster.truuxr3.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const connection = mongoose.connection

        connection.once('open', () => {
            console.log('Database Connected')
        })
    } catch (err) {
        console.log("database connection failed")
    }

}

export default db;
