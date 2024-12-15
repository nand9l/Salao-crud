import { AppDataSource } from "../db/data-source";
import { Repository } from "typeorm";
import { Cliente } from "../models/clienteModel";

class ClienteRepository {
    private clienteRepository: Repository<Cliente>;

    constructor() {
        this.clienteRepository = AppDataSource.getRepository(Cliente);
    }

    // Salvar cliente
    async save(cliente: Cliente): Promise<Cliente> {
        try {
            return await this.clienteRepository.save(cliente);
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            throw new Error("Falha ao salvar o cliente!");
        }
    }

    // Buscar todos os clientes
    async retrieveAll(): Promise<Cliente[]> {
        try {
            return await this.clienteRepository.find();
        } catch (error) {
            console.error("Erro ao buscar todos os clientes:", error);
            throw new Error("Falha ao buscar clientes!");
        }
    }

    // Buscar cliente por ID
    async retrieveById(idCliente: number): Promise<Cliente | null> {
        try {
            return await this.clienteRepository.findOneBy({ idCliente });
        } catch (error) {
            console.error("Erro ao buscar cliente por ID:", error);
            throw new Error("Falha ao buscar o cliente!");
        }
    }

    // Buscar cliente por email
    async retrieveByEmail(email: string): Promise<Cliente | null> {
        try {
            return await this.clienteRepository.findOneBy({ email });
        } catch (error) {
            console.error("Erro ao buscar cliente por email:", error);
            throw new Error("Falha ao buscar cliente pelo email!");
        }
    }

    // Atualizar dados de um cliente
    async update(cliente: Cliente): Promise<Cliente> {
        try {
            await this.clienteRepository.update(cliente.idCliente, cliente);
            return cliente;
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            throw new Error("Falha ao atualizar o cliente!");
        }
    }

    // Deletar cliente por ID
    async delete(idCliente: number): Promise<number> {
        try {
            const result = await this.clienteRepository.delete(idCliente);
            return result.affected || 0; // Retorna 0 se nenhum registro for deletado
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            throw new Error("Falha ao deletar o cliente!");
        }
    }

    // Deletar todos os clientes
    async deleteAll(): Promise<number> {
        try {
            const result = await this.clienteRepository.clear();
            return (await this.clienteRepository.count()) === 0 ? 1 : 0;
        } catch (error) {
            console.error("Erro ao deletar todos os clientes:", error);
            throw new Error("Falha ao deletar todos os clientes!");
        }
    }
}

export default new ClienteRepository();
