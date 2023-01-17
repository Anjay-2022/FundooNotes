import notes from '../models/note.model';


//get all notes of  single user
export const getallnote = async (body) => {
  const data = await notes.find({ user_id: body.user_id })
  return data
};

//get single note
export const getnote = async (id, body) => {
  const data = await notes.findOne({$and:[{user_id: body.user_id },{_id:id}]}); 
  return data;
};


//create new note
export const createnote = async (body) => {
  const data = await notes.create(body);
  return data;
};

//update single note
export const updatenote = async (_id, body) => {
  const data = await notes.find({ user_id: body.user_id });
  if (data !== null) {
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
  }
};

//delete single note
export const deletenote = async (_id, body) => {
  const data = await notes.find({ user_id: body.user_id });
  if (data !== null) {
    await notes.findByIdAndDelete(_id);
    return '';
  }
};

export const archivenote = async (id, body) => {
  try {
    const data = await notes.findOne({$and:[{user_id: body.user_id },{_id:id}]});
    if (data !== null) {
      if (data.archive == false) {
        const updatednote = await notes.updateOne(
          { _id:id }, { $set: { archive: true }, })
        return updatednote;
      } else {
        const updatednote = await notes.updateOne(
          { _id: id }, { $set: { archive: false } })
        return updatednote;
      }
    }
  } catch (err) {
    console.log(err)
  }
};

export const trashnote = async (id, body) => {
  try {
    const data = await notes.findOne({$and:[{user_id: body.user_id },{_id:id}]});
    if (data !== null) {
      if (data.trash == false) {
        const updatednote = await notes.updateOne(
          { _id:id }, { $set: { trash: true } })
        return updatednote;
      } else {
        const updatednote = await notes.updateOne(
          { _id: id }, { $set: { trash: false } })
        return updatednote;
      }
    }
  } catch (err) {
    console.log(err)
  }
};
