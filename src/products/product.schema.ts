import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'elasticsearchliveproducts',timestamps: true })
export class Product {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ type: String })
  productDescription?: string;

  @Prop({ type: Number })
  com_id?: number;

  @Prop({ type: String })
  prod_id?: string;

  @Prop({ type: String })
  uniqueId?: string;

  @Prop({ type: String })
  liveUrl?: string;

  @Prop({ type: String })
  skuCode?: string;

  @Prop({
    type: {
      _id: String,
      name: String,
      uniqueId: String,
    },
  })
  category?: {
    _id: string;
    name: string;
    uniqueId: string;
  };

  @Prop({
    type: {
      _id: String,
      name: String,
      uniqueId: String,
    },
  })
  subCategory?: {
    _id: string;
    name: string;
    uniqueId: string;
  };

  @Prop({
    type: {
      _id: String,
      name: String,
      uniqueId: String,
    },
  })
  productCategory?: {
    _id: string;
    name: string;
    uniqueId: string;
  };

  @Prop({
    type: {
      industry: String,
      reason: String,
      suggestedCategory: String,
    },
  })
  categorySuggestion?: {
    industry: string;
    reason: string;
    suggestedCategory: string;
  };

  @Prop([
    {
      src: String,
      alt: String,
      exten: String,
      size: Number,
    },
  ])
  productImage?: {
    src: string;
    alt: string;
    exten: string;
    size: number;
  }[];

  @Prop({
    type: { name: String, code: String },
  })
  countryOfOrigin?: {
    name: string;
    code: string;
  };

  @Prop({
    type: { code: String, name: String, symbol: String },
  })
  currency?: {
    code: string;
    name: string;
    symbol: string;
  };

  @Prop({
    type: { pricingType: String },
  })
  pricing?: {
    pricingType: string;
  };

  @Prop()
  minOrderQuantity?: number;

  @Prop()
  moqUnit?: string;

  @Prop([
    {
      key: String,
      values: [
        {
          name: String,
          isSelected: Boolean,
          isRemoved: Boolean,
        },
      ],
      isSuggested: Boolean,
      isValid: Number,
    },
  ])
  attributes?: {
    key: string;
    values: {
      name: string;
      isSelected: boolean;
      isRemoved: boolean;
    }[];
    isSuggested: boolean;
    isValid: number;
  }[];

  @Prop()
  detailedDescription?: string;

  @Prop({
    type: {
      min_day: Number,
      max_day: Number,
      min_quantity: Number,
      max_quantity: Number,
      unit: String,
    },
  })
  productionLeadTime?: {
    min_day: number;
    max_day: number;
    min_quantity: number;
    max_quantity: number;
    unit: string;
  };

  @Prop()
  stockAvailability?: string;

  @Prop({
    type: { availabilityType: String },
  })
  samplesAvailability?: {
    availabilityType: string;
  };

  @Prop()
  paymentTerms?: string;

  @Prop()
  portOfDispatch?: string;

  @Prop({
    type: {
      min_day: Number,
      max_day: Number,
    },
  })
  dispatchLeadTime?: {
    min_day: number;
    max_day: number;
  };

  @Prop()
  isCustomizable?: boolean;

  @Prop()
  brandName?: string;

  @Prop()
  isDraft?: boolean;

  @Prop()
  isQuickInsert?: boolean;

  @Prop()
  isArchived?: boolean;

  @Prop()
  showcase?: boolean;

  @Prop({
    type: {
      ProductInformation: String,
      PricingAndMoq: String,
      Specification: String,
      ProductDescription: String,
      ProductionAndStock: String,
      PaymentTerms: String,
      ShippingDetails: String,
      AdditionalDetails: String,
    },
  })
  productStage?: Record<string, string>;

  @Prop()
  status?: string;

  @Prop()
  productApplications?: string;

  @Prop()
  businessOf?: string;

  @Prop()
  isQuickinsert?: boolean;

  @Prop()
  showInCatalog?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
