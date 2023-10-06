import { Request, Response } from 'express';
import Agent from '../models/agent';

// Interface for agent data structure
interface AgentInterface {
    name?: string;
    email?: string;
    phoneNumber?: string;
    branch?: string;
}

// Add a new agent
export const addAgent = async (req: Request, res: Response): Promise<void> => {
    try {
        const agent = new Agent(req.body as AgentInterface);
        await agent.save();
        res.status(201).send(agent);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get an agent by ID
export const getAgent = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).send({ message: 'Agent not found.' });
        }
        res.send(agent);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an agent by ID
export const updateAgent = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const agent = await Agent.findByIdAndUpdate(req.params.id, req.body as AgentInterface, { new: true });
        if (!agent) {
            return res.status(404).send({ message: 'Agent not found.' });
        }
        res.send(agent);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an agent by ID
export const deleteAgent = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (!agent) {
            return res.status(404).send({ message: 'Agent not found.' });
        }
        res.send({ message: 'Agent deleted successfully.', agent });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllAgents = async (req: Request, res: Response): Promise<void> => {
    try {
        const agents = await Agent.find();
        res.status(200).json({
            status: 'success',
            data: {
                agents
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
