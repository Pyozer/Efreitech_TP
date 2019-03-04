import Sequelize from "sequelize"
import User from "./user"
import Project from "./project"

// postgres://USER:PASS@HOST:PORT/DBNAME
// createdb sanji.dev
export const db = new Sequelize("postgres://podpak@localhost:5432/sanji.dev")

User.init(db)
Project.init(db)