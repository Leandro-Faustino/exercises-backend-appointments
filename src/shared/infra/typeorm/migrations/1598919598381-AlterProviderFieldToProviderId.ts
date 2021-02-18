/* eslint-disable spaced-comment */
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1598919598381
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider'); // (tabela que eu quero deletar,coluna deletada
    await queryRunner.addColumn(
      //criar coluna nova
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      //criar chave estrangeira
      'appointments', //tabela
      new TableForeignKey({
        name: 'AppointmentProvider', // nome da foreignKey
        columnNames: ['provider_id'], //coluna da tabela que vai receber a chave estrangeira
        referencedColumnNames: ['id'], //qual e o nome na coluna da outra tabela  que vai representar o provider _id
        referencedTableName: 'users', // qual  nome da tabela vai ser referenciada
        onDelete: 'SET NULL', //  especifica como a chave estrangeira deve se comportar quando o objeto referenciado é excluído,setar como nulo
        onUpdate: 'CASCADE', // o objeto relacionado será inserido e atualizado no banco de dados
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // defaz tudo que eu fiz na up
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
