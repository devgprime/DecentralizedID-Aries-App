import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    public getHello() {
        return 'WeIDY app'
    } 
}
