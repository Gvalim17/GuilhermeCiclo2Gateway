import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NovoVeiculo{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    veiculo_nome:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    veiculo_tipo_:string;

}