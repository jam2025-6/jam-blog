import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { MemoryImage } from './MemoryImage';

interface MemoryAttributes {
  id: number;
  title: string;
  description: string;
  content: string;
  date: Date;
  location: string;
  emotion: string;
  emotionIcon: string;
  coverImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MemoryCreationAttributes extends Optional<MemoryAttributes, 'id' | 'coverImage' | 'createdAt' | 'updatedAt'> { }

export class Memory extends Model<MemoryAttributes, MemoryCreationAttributes> implements MemoryAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public content!: string;
  public date!: Date;
  public location!: string;
  public emotion!: string;
  public emotionIcon!: string;
  public coverImage?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public images!: MemoryImage[];
}

Memory.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Memory title'
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'Memory description'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Memory content'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Memory date'
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Memory location'
  },
  emotion: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Memory emotion'
  },
  emotionIcon: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'Memory emotion icon'
  },
  coverImage: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Memory cover image URL'
  }
}, {
  sequelize,
  tableName: 'memories',
  timestamps: true,
  underscored: true
});

