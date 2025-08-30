import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsOptional,
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
    @IsOptional()
    destinationFirstName?: string;

    @IsString()
    @IsOptional()
    destinationLastName?: string;

    @IsString()
    @IsOptional()
    destinationEmail?: string;

    @IsString()
    @IsOptional()
    destinationPhoneNumber?: string;

    @IsString()
    @IsOptional()
    department?: string;

    @IsString()
    @IsOptional()
    municipality?: string;

    @IsString()
    @IsOptional()
    referencePoint?: string;

    @IsString()
    @IsOptional()
    instructions?: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateProductDto)
    products: CreateProductDto[];
}