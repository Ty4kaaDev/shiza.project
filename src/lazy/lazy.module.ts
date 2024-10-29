import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdPost } from "src/advertiser/models/adPost.model";
import { Project } from "src/advertiser/models/project.model";
import { User } from "src/user/models/user.model";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, AdPost, Project]), 
        JwtModule.register({
            global: true,
            secret: "SECRET_KEY",
            signOptions: { expiresIn: '7d' },
          }),
    ],
    exports: [TypeOrmModule, JwtModule]
})

export class LazyModule {}