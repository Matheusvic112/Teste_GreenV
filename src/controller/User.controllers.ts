import { Request, Response } from "express"
import UserService from "../service/User.service"

export const createUserController = async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body)
  return res.status(201).json(user)
}

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers()
  return res.json(users)
}
export const getUserIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await UserService.getUserById(id)
  return res.status(200).json(user)
}

export const UserDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await UserService.deleteUserById(id)
  return res.status(204).json(user)
}

export const UserUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await UserService.updateUser(req.body, id)
  return res.status(200).json(user)
}

export async function addUserToCompanyController(req: Request, res: Response) {
  const { id, idCompanie } = req.params
  const comapnies = await UserService.addUserToCompany(id, idCompanie)
  res.status(201).json(comapnies)
}

export async function addUserToVehicleController(req: Request, res: Response) {
  const { id, idVeiculo } = req.params
  const companies = await UserService.addUserToVeiculo(id, idVeiculo)
  return res.status(201).json(companies)
}
