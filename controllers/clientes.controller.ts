import { Request, Response } from "express";
import { Cliente } from "../models/clienteModel";
import clienteRepository from "../repositories/ClienteRepository";

export default class ClienteController {
    // Criar um novo cliente
    async create(req: Request, res: Response) {
        const { nome, dataNasc, email } = req.body;

        // Verifica se os campos obrigatórios foram fornecidos
        if (!nome || !dataNasc || !email) {
            res.status(400).send({
                message: "Os campos nome, data de nascimento e email são obrigatórios."
            });
            return;
        }

        try {
            const cliente: Cliente = req.body;
            const savedCliente = await clienteRepository.save(cliente);
            res.status(201).send(savedCliente); // Retorna o cliente criado com status 201
        } catch (err) {
            res.status(500).send({
                message: "Erro ao tentar salvar o cliente."
            });
        }
    }

    // Buscar todos os clientes
    async findAll(req: Request, res: Response) {
        try {
            const clientes = await clienteRepository.retrieveAll();
            res.status(200).send(clientes); // Retorna os clientes encontrados com status 200
        } catch (err) {
            res.status(500).send({
                message: "Erro ao buscar todos os clientes."
            });
        }
    }

    // Buscar um cliente por ID
    async findOne(req: Request, res: Response) {
        const idCliente: number = parseInt(req.params.id);

        try {
            const cliente = await clienteRepository.retrieveById(idCliente);
            if (cliente) {
                res.status(200).send(cliente); // Retorna o cliente encontrado com status 200
            } else {
                res.status(404).send({
                    message: `Não foi encontrado nenhum cliente com id=${idCliente}.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Erro ao buscar o cliente com id=${idCliente}.`
            });
        }
    }

    // Buscar um cliente por email
    async findByEmail(req: Request, res: Response) {
        const email: string = req.params.email;

        try {
            const cliente = await clienteRepository.retrieveByEmail(email);
            if (cliente) {
                res.status(200).send(cliente); // Retorna o cliente encontrado com status 200
            } else {
                res.status(404).send({
                    message: `Não foi encontrado nenhum cliente com email=${email}.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Erro ao buscar o cliente com email=${email}.`
            });
        }
    }

    // Atualizar um cliente por ID
    async update(req: Request, res: Response) {
        const idCliente: number = parseInt(req.params.id);
        let cliente: Cliente = req.body;
        cliente.idCliente = idCliente; // Associa o ID ao cliente

        try {
            await clienteRepository.update(cliente);
            res.send({
                message: `Cliente ${cliente.nome} atualizado com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: `Erro ao atualizar o cliente com id=${idCliente}.`
            });
        }
    }

    // Deletar um cliente por ID
    async delete(req: Request, res: Response) {
        const idCliente: number = parseInt(req.params.id);

        try {
            const num = await clienteRepository.delete(idCliente);

            if (num === 1) {
                res.send({
                    message: "Cliente deletado com sucesso!"
                });
            } else {
                res.status(404).send({
                    message: `Não foi possível deletar o cliente com id=${idCliente}. O cliente não foi encontrado.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Erro ao deletar o cliente com id=${idCliente}.`
            });
        }
    }

    // Deletar todos os clientes
    async deleteAll(req: Request, res: Response) {
        try {
            const num = await clienteRepository.deleteAll();
            res.send({
                message: `${num} clientes foram deletados com sucesso!`
            });
        } catch (err) {
            res.status(500).send({
                message: "Erro ao deletar todos os clientes."
            });
        }
    }
}
