import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAndRoles } from 'src/roles/junc.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
    imports: [SequelizeModule.forFeature([User,Role,UserAndRoles]),RolesModule],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
