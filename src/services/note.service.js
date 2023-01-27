import notes from '../models/note.model';
import { client } from '../config/redis';

//get all notes of  single user
export const getallnote = async (body) => {
  const data = await notes.find({ email: body.email })
  //console.log(data)
  await client.set(body.email,JSON.stringify(data)) 
  return data
};

//get single note
export const getnote = async (_id, body) => {
  await client.del('getData')
  const data = await notes.findOne({ email: body.email, _id: _id });
  await client.set(_id,JSON.stringify(data))
  if (data != null) {
    return data;
  } else {
    throw new Error("Invalid Object_id")
  }
};


//create new note
export const createnote = async (body) => {
  await client.del("getAllData")
  const data = await notes.create(body);
  return data;
};

//update single note
export const updatenote = async (_id, body) => {
  await client.del("getAllData")
  const data = await notes.findOne({ email: body.email, _id: _id });
  if (data != null) {
    const note = await notes.findByIdAndUpdate(
      {
        _id  //_id which is in noteschema we cant rename it 
      },
      body,
      {
        new: true
      }
    );
    return note;
  } else
    throw new Error("Invalid Object_id")
};

//delete single note
export const deletenote = async (_id, body) => {
  await client.del("getAllData")
  const data = await notes.findOne({ email: body.email, _id: _id });
  if (data != null) {
    await notes.findByIdAndDelete(_id);
    return '';
  } else
    throw new Error("Invalid Object_id")
};


export const archivenote = async (id, body) => {
  await client.del("getAllData")
  const data = await notes.findOne({ $and: [{ email: body.email }, { _id: id }] });
  if (data != null) {
    if (data.archive == false) {
      const updatednote = await notes.updateOne(
        { _id: id }, { $set: { archive: true }, })
      return updatednote;
    } else {
      const updatednote = await notes.updateOne(
        { _id: id }, { $set: { archive: false } })
      return updatednote;
    }
  } else
    throw new Error("Invalid Object_id")
};

export const trashnote = async (id, body) => {
  await client.del("getAllData")
  const data = await notes.findOne({ $and: [{ email: body.email }, { _id: id }] });
  if (data != null) {
    if (data.trash == false) {
      const updatednote = await notes.updateOne(
        { _id: id }, { $set: { trash: true }, })
      return updatednote;
    } else {
      const updatednote = await notes.updateOne(
        { _id: id }, { $set: { trash: false } })
      return updatednote;
    }
  } else
    throw new Error("Invalid Object_id")
};