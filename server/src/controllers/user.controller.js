import {createUserService, getAll, getUserById, updateUserService, deleteUserService} from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAll();

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(req.params.id, req.body);

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserService(req.params.id);

    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
