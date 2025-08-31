import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    pickupAddress: string;

    @IsDateString()
    @IsNotEmpty()
    scheduledDate: string;

    @IsString()
    @IsNotEmpty()
    destinationAddress: string;

    @IsString()
    @IsNotEmpty()
    destinationFirstName: string;

    @IsString()
    @IsNotEmpty()
    destinationLastName: string;

    @IsString()
    @IsNotEmpty()
    destinationEmail: string;

    @IsString()
    @IsNotEmpty()
    destinationPhoneNumber: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsString()
    @IsNotEmpty()
    municipality: string;

    @IsString()
    @IsNotEmpty()
    referencePoint: string;

    @IsString()
    @IsNotEmpty()
    instructions: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateProductDto)
    products: CreateProductDto[];
}