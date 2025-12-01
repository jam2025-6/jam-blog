import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Memory } from './Memory';

@Table({
  tableName: 'memory_images',
  timestamps: true
})
export class MemoryImage extends Model<MemoryImage> {
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
  url!: string;

  @ForeignKey(() => Memory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  memoryId!: number;

  @BelongsTo(() => Memory)
  memory!: Memory;

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
}