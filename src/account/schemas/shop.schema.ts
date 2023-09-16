import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ShopStatus } from '@src/account/contracts/shop';

export type ShopDocument = Shop & Document;

export class Address {
  @Prop({ type: String })
  province: string;

  @Prop({ type: String })
  stress: string;

  @Prop({ type: String })
  buildingNumber: string;
}

@Schema({
  collection: 'shops',
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
    },
  },
})
export class Shop {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Address })
  address: Address;

  @Prop({ required: true, enum: ShopStatus, default: ShopStatus.INACTIVE })
  status: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ type: Array, default: [] })
  role: Array<string>;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

ShopSchema.pre('save', async function () {
  if (this.password && this.isModified('password')) {
    const saltRounds = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});
