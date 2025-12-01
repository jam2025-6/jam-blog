import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface MessageAttributes {
  id: number;
  name?: string;
  email?: string;
  content: string;
  ip: string;
  userAgent: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'> { }

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public name?: string;
  public email?: string;
  public content!: string;
  public ip!: string;
  public userAgent!: string;
  public status!: 'pending' | 'approved' | 'rejected';
  public createdAt!: Date;
  public updatedAt!: Date;
}

Message.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '留言者姓名'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true
    },
    comment: '留言者邮箱'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '留言内容'
  },
  ip: {
    type: DataTypes.STRING(45),
    allowNull: false,
    comment: '留言者IP地址'
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '留言者浏览器信息'
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
    comment: '留言状态'
  }
}, {
  sequelize,
  tableName: 'messages',
  timestamps: true,
  underscored: true
});
