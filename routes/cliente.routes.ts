import { Router } from "express";
import ClienteController from "../controllers/clientes.controller";

class ClienteRoutes {
  router = Router();
  controller = new ClienteController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {

    // Criar um novo cliente
    this.router.post("/cliente", this.controller.create);

    // Buscar todos os clientes
    this.router.get("/clientes", this.controller.findAll);

    // Buscar um cliente por ID
    this.router.get("/cliente/:id", this.controller.findOne);

    // Buscar um cliente por email
    this.router.get("/cliente/email/:email", this.controller.findByEmail);

    // Atualizar um cliente por ID
    this.router.put("/cliente/:id", this.controller.update);

    // Deletar um cliente por ID
    this.router.delete("/cliente/:id", this.controller.delete);

    // Deletar todos os clientes
    this.router.delete("/clientes", this.controller.deleteAll);
  }
}

export default new ClienteRoutes().router;
