import { Agent, ConnectionEventTypes, ConnectionStateChangedEvent, CredentialEventTypes, CredentialState, CredentialStateChangedEvent, DidExchangeState, ProofEventTypes, ProofState, ProofStateChangedEvent } from '@aries-framework/core';
import { agentDependencies } from '@aries-framework/node';
import { Dependencies, Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agent.base';
import { ledgerPoolConfig } from 'src/common/config';

@Injectable()
export class SessionService {
    public session: AgentSession;

    public async login(walletId: string, walletKey: string, seed?: string) {
        const agentPort = process.env.AGENT_PORT ? parseInt(process.env.AGENT_PORT) : 9000
        const newSession = new AgentSession({
            label: 'agent',
            port: agentPort,
            walletConfig: {
                id: walletId,
                key: walletKey
            },
            ledgerConfig: ledgerPoolConfig,
            didSeed: seed
        })

        if (this.session) {
            await this.session.exit();
        }

        this.session = newSession;
        await this.session.initialize()
        this.addListeners()
        return true;
    }

    public async createInvitation() {
        const outOfBandRecord = await this.session.agent.oob.createInvitation();
        const domain = `https://localhost:${this.session.port}`;
        return {
            invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({
                domain
            }),
            outOfBandRecord,
        };
    }

    public async acceptInvitation(invitationUrl: string) {
        const { outOfBandRecord } = await this.session.agent.oob.receiveInvitationFromUrl(
            invitationUrl,
        );
        return outOfBandRecord;
    }

    public async logout() {
        this.session.exit()
    }

    private addListeners() {
        this.session.agent.events.on<ConnectionStateChangedEvent>(
            ConnectionEventTypes.ConnectionStateChanged,
            async ({ payload }) => {
                if (payload.connectionRecord.state === DidExchangeState.Completed) {
                    console.log(`Connection setup successfully `, payload);
                    this.session.data.connectionId = payload.connectionRecord.id;
                }
            },
        );
        this.session.agent.events.on<CredentialStateChangedEvent>(
            CredentialEventTypes.CredentialStateChanged,
            async ({ payload }) => {
                if (payload.credentialRecord.state === CredentialState.OfferReceived) {
                    console.log(`Credential received:`, payload);
                    this.session.data.credentialId = payload.credentialRecord.id;
                }
            },
        );

        this.session.agent.events.on<ProofStateChangedEvent>(
            ProofEventTypes.ProofStateChanged,
            async ({ payload }) => {
                console.log("proof state change event:", payload.proofRecord)
                if (payload.proofRecord.state === ProofState.RequestReceived) {
                    console.log(`Proof Request received:`, payload);
                    this.session.data.proofId = payload.proofRecord.id;
                }
            },
        );
    }

}
