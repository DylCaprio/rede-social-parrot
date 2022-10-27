import express from "express"
import { JwtPayload } from "jsonwebtoken"

export interface IJwtoken extends express.Request {
  token: string | JwtPayload
}
