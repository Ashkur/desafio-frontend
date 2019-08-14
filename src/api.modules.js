const baseUrl = 'http://localhost:3333';

const api = {

    getTodos: async (response) => {
        response = await fetch(`${baseUrl}/todos`);
        let todos = await response.json();
        return todos;
    },

    savesOnCloud: async (todos, response) => {        
        let delestesResponse = await api.deletesTodos(todos);
        
        if(delestesResponse.status !== 400){
            let storeResponse = await api.storeTodos(todos);
            
            if(storeResponse.status !== 400)
                return response = {
                    status: 200,
                    message: 'Salvo com sucesso!'
                }
        }            

        return delestesResponse;
    },

    storeTodos: async (todos, response) => {
        response = await fetch(`${baseUrl}/todos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todos)
        });
        return response;
    },

    deletesTodos: async () => {
        let response = await fetch(`${baseUrl}/todos`, {
            method: 'DELETE'
        });

        return response;
    }

}

export default api;