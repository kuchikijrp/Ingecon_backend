const { Model, DataTypes } = require('sequelize');

class tblCadastroClienteFilial extends Model {
    static init(sequelize) {
        super.init({
            id_cliente: DataTypes.INTEGER,
            id_filial : DataTypes.INTEGER,
            nm_desc_filial: DataTypes.STRING,
            nm_desc_loja: DataTypes.STRING,
            nm_cidade: DataTypes.STRING,
            nm_uf: DataTypes.STRING,
            nr_cep: DataTypes.STRING,
            nm_endereco: DataTypes.STRING,
            nm_bairro: DataTypes.STRING,
            nm_local: DataTypes.STRING
        },
            {
                sequelize,
                tableName: 'tbl_cadastro_cliente_filial'
            }
        );
    }
}

module.exports = tblCadastroClienteFilial;