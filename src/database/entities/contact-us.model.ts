import { Column, Model, Table } from 'sequelize-typescript';


@Table({
  tableName: 'contact_us',
  underscored: true,
  paranoid: true,
})
export class ContactUs extends Model {
  @Column
  companyName: string;

  @Column
  representative: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  contactMessage: string;
}
