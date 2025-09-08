import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class CategoryDto {
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  uniqueId: string;
}

class ProductImageDto {
  @IsString()
  src: string;

  @IsString()
  alt: string;

  @IsString()
  exten: string;

  @IsNumber()
  size: number;
}

class AttributeValueDto {
  @IsString()
  name: string;

  @IsBoolean()
  isSelected: boolean;

  @IsBoolean()
  isRemoved: boolean;
}

class AttributeDto {
  @IsString()
  key: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeValueDto)
  values: AttributeValueDto[];

  @IsBoolean()
  isSuggested: boolean;

  @IsNumber()
  isValid: number;
}

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  productDescription?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  category?: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  subCategory?: CategoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  productCategory?: CategoryDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  productImage?: ProductImageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  attributes?: AttributeDto[];

  @IsOptional()
  @IsString()
  detailedDescription?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
