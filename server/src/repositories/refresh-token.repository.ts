import { RefreshToken } from "@entities/refresh-token";
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
    constructor(private dataSource: DataSource)
    {
        super(RefreshToken, dataSource.createEntityManager());
    }
}
