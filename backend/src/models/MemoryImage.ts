import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Memory } from './Memory';

interface MemoryImageAttributes {
  id: number;
  memoryId: number;
  url: string;
  image_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MemoryImageCreationAttributes extends Optional<MemoryImageAttributes, 'id' | 'createdAt' | 'updatedAt' | 'image_order'> { }

export class MemoryImage extends Model<MemoryImageAttributes, MemoryImageCreationAttributes> implements MemoryImageAttributes {
  public id!: number;
  public memoryId!: number;
  public url!: string;
  public image_order!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public memory!: Memory;
}

MemoryImage.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  memoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Memory ID'
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Image URL'
  },
  image_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Image order'
  }
}, {
  sequelize,
  tableName: 'memory_images',
  timestamps: true,
  underscored: true
});

