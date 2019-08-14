const Todo = require('../models/Todo');

module.exports = {
    async index(request, response) {

        const todos = await Todo.find((error, todos) => {
            if(error)
                return {error};
            
            return todos;
        });

        if(
            todos.error != "" ||
            todos.error != null ||
            todos.error != undefined

        )   return response.status(200)
                            .json({todos});

        return response.status(400)
                        .json(todos);
        
    },

    async store(request, response) {
        const todos = request.body;
        
        Todo.insertMany(todos, (err, todos) => {
            if(err)
                return response.status(400)
                        .json({error: `Erro ao cadastrar Todos: ${err}` });
            
            return response.status(201)
                            .json({todos});
        });
    },

    async delete(request, response) {

        await Todo.deleteMany( (err, todos) => {
            if (err)
                return response.status(400)
                                .json({message: 'Error ao remover TODOs'});
                
        return response.status(200)
                        .json({message: 'Removido com sucesso'});
        });
    },

    async deleteOne(request, response) {
        const {_id } = request.params;

        await Todo.deleteOne({_id}, (err, todo) => {
            if(err)
                return response.status(400)
                                .json({message: 'Error ao remover TODO'});

            return response.status(200)
                            .json({message: 'Removido com sucesso!'});
        });
    }

    
};