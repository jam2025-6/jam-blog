import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ArticleAttributes {
  id: number;
  title: string;
  date: Date;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ArticleCreationAttributes extends Optional<ArticleAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
  public id!: number;
  public title!: string;
  public date!: Date;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Article.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: 'Article title'
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Article date'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Article content'
  }
}, {
  sequelize,
  tableName: 'articles',
  timestamps: true,
  underscored: true
});