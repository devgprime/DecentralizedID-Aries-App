import { Body, Controller, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { CredentialInput } from './dto/credentialInput.dto';
import { SchemaInput } from './dto/schemaInput.dto';
import { IssuerService } from './issuer.service';

@Controller('issuer')
export class IssuerController {
    constructor(
        private readonly issuerService: IssuerService,
        private readonly sessionService: SessionService
    ) { }

    @Post('/credentials/schemas')
    public async createSchemaAndDef(@Body() schema: SchemaInput) {
        return await this.issuerService.createCredCredentialSchemaAndDef(this.sessionService.session, schema).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.BAD_REQUEST)
        });
    }

    @Post('/credentials/offer')
    public async offerCredential(
        @Body() input: CredentialInput,
        @Query('cred-def-id') credDefId?: string
    ) {
        return await this.issuerService.issueCredential(this.sessionService.session, input, credDefId).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.BAD_REQUEST)
        });
    }


}
