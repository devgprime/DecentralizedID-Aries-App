import { Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agent.base';

@Injectable()
export class VerifierService{

  public async checkProof(verifier: AgentSession, proofId: string) {
    const proofRecord = await verifier.agent.proofs.findById(proofId || verifier.data.proofId);
    const presentation = await verifier.agent.proofs.findPresentationMessage(proofId || verifier.data.proofId)

    return {proofRecord, presentation};
  }

  public async createProofRequest(verifier: AgentSession, credDefId: string) {
    const proofRecord = await verifier.agent.proofs.requestProof({
      protocolVersion: 'v1',
      connectionId: verifier.data.connectionId,
      proofFormats: {
        indy: {
          requestedAttributes: {
            attr1_referent: {
              name: 'name',
              restrictions: [
                { credentialDefinitionId: credDefId },
              ],
            },
            attr2_referent: {
              name: 'sex',
              restrictions: [
                { credentialDefinitionId: credDefId },
              ],
            },
            attr3_referent: {
              name: 'birth_year',
              restrictions: [
                { credentialDefinitionId: credDefId },
              ],
            },
          },
        },
      },
    });

    verifier.data.proofId = proofRecord.id;
    return proofRecord;
  }
}
