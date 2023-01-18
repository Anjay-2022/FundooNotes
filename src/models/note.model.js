import { Schema, model } from 'mongoose';


const noteSchema = new Schema(
  {
    user_id: {type: String},    
    title: {type: String},    
    description: {type: String},    
    colour: {type: String,default:'red'}, 
    archive:{type:Boolean,default:false},   
    trash:{type:Boolean,default:false},   
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);