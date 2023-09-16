import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, type Document } from 'mongoose';
import { ProductType } from '../enums/product.enum';
import slugify from 'slugify';

export type ProductDocument = Product & Document;

export class Clothing {
  @Prop({ type: String })
  brand: string;

  @Prop({ type: String })
  size: string;
}

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  thumb: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, enum: ProductType, required: true })
  type: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'shops' })
  shop: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true, ref: 'shops' })
  attributes: mongoose.Schema.Types.Mixed;

  @Prop({ type: Number })
  ratingAverage: number;

  @Prop({ type: Boolean, default: true })
  isDraft: boolean;

  @Prop({ type: Boolean, default: false })
  isPublished: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.slug, { lower: true });
});
