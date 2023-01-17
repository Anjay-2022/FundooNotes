import HttpStatus from 'http-status-codes';
import * as noteService from '../services/note.service';

export const getallnote = async (req, res, next) => {
  try {
    const data = await noteService.getallnote(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

//single note of any user
export const getnote = async (req, res, next) => {
  try {
    const data = await noteService.getnote(req.params._id,req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'note fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const createnote = async (req, res, next) => {
  try {
    const data = await noteService.createnote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'note created successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const updatenote = async (req, res, next) => {
  try {
    const data = await noteService.updatenote(req.params._id,req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note updated successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const deletenote = async (req, res, next) => {
  try {
    await noteService.deletenote(req.params._id,req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'note deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const archivenote = async (req, res, next) => {
  try {
    const data = await noteService.archivenote(req.params._id,req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note archive/unarchive successfully'
    });
  } catch (error) {
    next(error);
  }
};export const trashnote = async (req, res, next) => {
  try {
    const data = await noteService.trashnote(req.params._id,req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note trash/untrash successfully'
    });
  } catch (error) {
    next(error);
  }
};
