import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { MemoryImage } from './MemoryImage';

@Table({
  tableName: 'memories',
  timestamps: true
})
export class Memory extends Model<Memory> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  date!: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  location?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;

  @CreatedAt
  @Column({
    type: DataType.DATE
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE
  })
  updatedAt!: Date;

  @HasMany(() => MemoryImage, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  images!: MemoryImage[];
}