/*
    Describe: Classe para controle das rotas do index.
    Authors: 
        - Daniel Borba Varela dos Santos
        - Bruno Henrique de Borba
    Created: 27/10/2019
    Updated: 27/10/2019
*/

//native libs
const fs = require('fs');
const path = require('path');

/*
    Describe: Função publica que recebe o post do form e retorna dados do arquivo encriptado.
    Params:
        -req: Passado objeto de request recebido no route.
        -res: Passado objeto de response recebido no route.
        -next: Passado parametro de função de callback.
    Return: Retorna para view parametros do resultado ou erro.
*/
const post = async (req, res, next) => {
    
    try {
        
        //*****validacoes*****
        if (req.body.nome == null || req.body.nome == "")
            throw new Error('Campo nome inválido!');
        
        if (req.body.chave == null || req.body.chave == "")
            throw new Error('Campo chave inválido!');

        //*****implementacao*****
        const filePath = path.join(__dirname, '..', 'files', req.file.filename);

        //faz leitura do arquivo
        const texto = await lerFile(filePath);

        //*****retorno*****
        res.render('index', { title: 'Result AES', result: texto });

    } catch (error) {
        var texto = "Não foi possível encriptar o texto, Erro: "+error.message;
        res.render('index', { title: 'Error AES', result: texto });
    }

};

/*
    Describe: Função privada que faz leitura do arquivo.
    Params:
        -filePath: Passado string de path do arquivo que devera ser lido.
    Return: Retorna uma string com dados que foram lidos no documento ou a mensagem de erro.
*/
const lerFile = (filePath) => {

    return new Promise(resolve => {

        fs.readFile(filePath, {encoding: 'utf-8'}, (err,data) => {

            if (!err)
                return resolve(data);
            else
                return resolve(err.message);
            
        });
        
    });
    
}


module.exports = {
    post:post
}