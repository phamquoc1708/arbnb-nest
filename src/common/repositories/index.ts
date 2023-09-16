import 'mongoose-paginate-v2';
import { HttpStatus } from '@nestjs/common';
import { Document, PaginateModel, PaginateResult } from 'mongoose';
import { AppException } from '../exceptions/app.exception';
import { ErrorResponse } from '@src/common/exceptions/app.exception';

export abstract class AbstractRepository<T extends Document> {
  public model: PaginateModel<T>;
  constructor(model: PaginateModel<T>) {
    this.model = model;
  }

  findOne({
    conditions,
    projection,
    options,
    populates,
  }: {
    conditions: object;
    projection?: any;
    options?: object;
    populates?: any;
  }): Promise<T | undefined> {
    return this.model
      .findOne(conditions, projection, options)
      .populate(populates)
      .exec() as Promise<T | undefined>;
  }

  findMany(
    conditions: object,
    projection?: any,
    options?: object,
    populates?: any,
  ): Promise<T[]> {
    return this.model
      .find(conditions, projection, options)
      .populate(populates)
      .exec();
  }

  async firstOrFail({
    conditions,
    projection,
    options,
    populates,
    error,
  }: {
    conditions: object;
    projection?: any;
    options?: object;
    populates?: any;
    error?: ErrorResponse;
  }): Promise<T> {
    const data = await this.findOne({
      conditions,
      projection,
      options,
      populates,
    });
    if (!data) {
      if (!error) {
        error = {
          error: 'NOT_FOUND',
          message: 'Not Found',
          httpStatus: HttpStatus.NOT_FOUND,
        };
      }
      throw new AppException(error);
    }
    return data;
  }

  paginate({
    conditions,
    options,
  }: {
    conditions: object;
    options: object;
  }): Promise<PaginateResult<T>> {
    return this.model.paginate(conditions, options);
  }

  async create(payload: object, options?: object): Promise<T> {
    const instance = new this.model(payload);
    await instance.save(options);
    return instance;
  }

  async update(
    conditions: object,
    payload: object,
    options?: object,
  ): Promise<T> {
    const data = await this.firstOrFail({ conditions });
    data.set(payload);
    return data.save(options);
  }

  findOneAndUpdate({
    conditions,
    payload,
    options,
  }: {
    conditions: object;
    payload: object;
    options?: object;
  }) {
    return this.model.findOneAndUpdate(conditions, payload, options).exec();
  }

  updateMany(conditions: object, payload: object, options?: object) {
    return this.model
      .updateMany(conditions, payload, {
        new: true,
        ...options,
      })
      .exec();
  }

  removeOne({ conditions, options }: { conditions: object; options?: object }) {
    return this.model.findOneAndRemove(conditions, options).exec();
  }

  removeMany(conditions: object, options?: object) {
    return this.model.deleteMany(conditions, options).exec();
  }
}
