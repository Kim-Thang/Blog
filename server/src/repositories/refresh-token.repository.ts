import { Injectable } from "@nestjs/common";
import { RefreshToken } from "src/entities/refresh-token";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
    constructor(private dataSource: DataSource)
    {
        super(RefreshToken, dataSource.createEntityManager());
    }
}
