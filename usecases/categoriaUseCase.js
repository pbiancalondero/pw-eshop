const {pool} = require('../config');
const Categoria = require('../entities/categoria');

const getCategoriasDB = async () => {
    try{
        const {rows} = await pool.query('SELECT * FROM categorias ORDER BY nome');
        return rows.map(row => new Categoria(row.codigo, row.nome));
    }catch(err){
        throw "Erro :" +err;
    }
}

const addCategoriaDB = async (body) => {
    try{
        const {nome} = body;
        const results = await pool.query(`INSERT INTO categorias (nome) VALUES ($1) RETURNING codigo, nome`,
            [nome]);
            const categoria = results.rows[0];
            return new Categoria(categoria.codigo, categoria.nome);
    }catch(err){
        throw "Erro ao inserir categoria: " + err;
    }      
}

const updateCategoriaDB = async (body) => {
    try{
        const {codigo, nome} = body;
        const results = await pool.query(`UPDATE categorias SET nome=$2 WHERE codigo=$1 RETURNING codigo, nome`,
            [codigo, nome]);
        if (results.rowCount == 0){
            throw `nenhum registro encontrado para o código ${codigo} para ser alterado`;
        }
            const categoria = results.rows[0];
            return new Categoria(categoria.codigo, categoria.nome);
    }catch(err){
        throw "Erro ao alterar categoria: " + err;
    }      
}

const deleteCategoriaDB = async (codigo) => {
    try{
        const results = await pool.query(`DELETE FROM categorias WHERE codigo=$1`, [codigo]);
             if (results.rowCount == 0){
            throw `nenhum registro encontrado para o código ${codigo} para ser excluído`;
        }
        else{
            return 'Categoria removida com sucesso!';
        }            
    }catch(err){
        throw "Erro ao excluir categoria: " + err;
    }      
}

const getCategoriaPorCodigoDB = async (codigo) => {
    try{
        const results = await pool.query('SELECT * FROM categorias WHERE codigo=$1', [codigo]);
        if(results.rowCount == 0)
        {
            throw`Nenhum registro encontrado para o código ${codigo}`;
        }
        else{
            const categoria = results.rows[0];
            return new Categoria(categoria.codigo, categoria.nome);
        }
    }catch(err){
        throw "Erro ao consultar categoria: " + err;
    }
}

module.exports = { getCategoriasDB, addCategoriaDB, updateCategoriaDB, deleteCategoriaDB, getCategoriaPorCodigoDB}