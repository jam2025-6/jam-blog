import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SelfTalkingAttributes {
  id: number;
  time: Date;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SelfTalkingCreationAttributes extends Optional<SelfTalkingAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class SelfTalking extends Model<SelfTalkingAttributes, SelfTalkingCreationAttributes> implements SelfTalkingAttributes {
  public id!: number;
  public time!: Date;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

SelfTalking.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Self-talking time'
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    comment: 'Self-talking content'
  }
}, {
  sequelize,
  tableName: 'self_talkings',
  timestamps: true,
  underscored: true
});