import {
    SchemaTemplate,
} from '@aries-framework/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agent.base';
import { CredentialInput } from './dto/credentialInput.dto';
import { SchemaInput } from './dto/schemaInput.dto';

@Injectable()
export class IssuerService {
    public async issueCredential(
        issuer: AgentSession,
        payload: CredentialInput,
        credDefId?: string
    ) {
        console.log(issuer.data.connectionId);
        console.log(issuer.data.credDefId, credDefId)
        return await issuer.agent.credentials.offerCredential({
            protocolVersion: 'v1',
            connectionId: issuer.data.connectionId,
            credentialFormats: {
                indy: {
                    credentialDefinitionId: credDefId || issuer.data.credDefId,
                    attributes: [
                        { name: 'name', value: payload.name },
                        { name: 'sex', value: payload.sex },
                        { name: 'birth_year', value: payload.birth_year },
                    ],
                },
            },
        });
    }


    public async createCredCredentialSchemaAndDef(issuer: AgentSession, schemaInput: SchemaInput): Promise<any> {
        console.log(schemaInput.name)
        const schemaTemplate: SchemaTemplate = {
            name: schemaInput.name,
            version: '1.3',
            attributes: ['name', 'sex', 'birth_year'],
        };

        if (!issuer) {
            throw new BadRequestException('Please login first.')
        }

        const schema = await issuer.agent.ledger.registerSchema(schemaTemplate).catch(e => {
            throw new BadRequestException(e)
        });

        const schemaDef = await issuer.agent.ledger.registerCredentialDefinition({
            schema: schema,
            tag: 'CI1',
            supportRevocation: false,
        }).catch(e => {
            throw new BadRequestException(e)
        });

        issuer.data.credDefId = schemaDef.id
        console.log('Storing cred defs: ', schema.id, schemaDef.id)
        return {
            schema,
            schemaDef,
        };
    }
}
