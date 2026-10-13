import moongoose from 'mongoose'

const FakultasSchema = new moongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true
    }
},{
    timestamps : true
})

const FakultasModel = moongoose.model('Fakultas',FakultasSchema)
export default FakultasModel