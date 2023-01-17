
import { Schema, model } from 'mongoose';


const noteSchema = new Schema(
  {
    user_id: {type: String},    
    title: {type: String},    
    description: {type: String},    
    colour: {type: String,default:'red'},    
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);