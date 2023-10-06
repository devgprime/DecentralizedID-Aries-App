import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { KeyDto } from 'src/common/dtos/key.dto';
import { SessionService } from './session.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    // @Post('/register')
    // public async register(@Body() keyDto: RegisterDto) {
    //   return await this.sessionService.register(
    //     keyDto.walletId,
    //     keyDto.walletKey,
    //     keyDto.masterSecretId
    //   );
    // }

    @Post('/login')
    public async login(@Body() keyDto: KeyDto) {
        return await this.sessionService.login(
            keyDto.walletId,
            keyDto.walletKey,
            keyDto.seed
        ).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.UNAUTHORIZED)
        });
    }


    @Post('/logout')
    public async logout() {
        return await this.sessionService.logout().catch(e => {
            throw new HttpException("error: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }

    @Post('/invitations')
    public async createInvitation() {
        return await this.sessionService.createInvitation().catch(e => {
            throw new HttpException("error: " + e, HttpStatus.UNAUTHORIZED)
        });
    }

    @Post('/invitations/accept')
    public async accepInvitation(@Query('invitation-url') invitationUrl: string) {
        return await this.sessionService.acceptInvitation(invitationUrl).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.BAD_REQUEST)
        });
    }
}
