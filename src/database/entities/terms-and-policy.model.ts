import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'terms_and_policy',
  underscored: true,
  paranoid: true,
})
export class TermsAndPolicy extends Model {
  @Column
  version: string;

  @Column
  termsOfService: string;

  @Column
  privacyPolicy: string;

  @Column
  termAndCondition: string;
}
