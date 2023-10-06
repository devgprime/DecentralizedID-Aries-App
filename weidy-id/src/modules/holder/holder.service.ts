import { Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agent.base';

@Injectable()
export class HolderService {

    public async acceptOffer(holder: AgentSession, credentialId?: string) {
        return await holder.agent.credentials.acceptOffer({ credentialRecordId: credentialId || holder.data.credentialId });
    }

    public async declineOffer(holder: AgentSession, credentialId?: string) {
        return await holder.agent.credentials.declineOffer(credentialId || holder.data.credentialId);
    }

    public async getCred(holder: AgentSession, credentialId?: string) {
        return await holder.agent.credentials.getById(credentialId || holder.data.credentialId);
    }

    public async getAllCreds(holder: AgentSession) {
        return await holder.agent.credentials.getAll();
    }

    public async acceptProofRequest(holder: AgentSession, proofId?: string) {
        const targetproofId = proofId || holder.data.proofId
        console.log("targetproofId: ", targetproofId)

        const creds = await holder.agent.proofs.autoSelectCredentialsForProofRequest({
            proofRecordId: targetproofId
        });

        await holder.agent.proofs.acceptRequest({
            proofRecordId: targetproofId,
            proofFormats: {
                indy: creds.proofFormats.indy
            }
        })
        return creds;
    }
}
