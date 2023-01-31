export class TodolistService {
  todolist = ["Arifal", "Hidayat", "Salamulloh"];

  getJsonTodolist(){
    return JSON.stringify({
      code: 200,
      status : "OK",
      data : this.todolist.map((value,index) => {
        return {
          id: index,
          todo: value
        }
      })
    });
  }

  getErrorTodolist(){
    return JSON.stringify({
      code:400,
      status: "bad request"
    })
  }
  getTodolist(request,response){
    response.write(this.getJsonTodolist());
    response.end();
  }

  createTodo(request, response){
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      this.todolist.push(body.todo);

      response.write(this.getJsonTodolist());
      response.end();
    })
  }

  updateTodo(request,response){
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      if(this.todolist[body.id]){
        this.todolist[body.id] = body.todo;
      }else{
        response.write(this.getErrorTodolist);
        response.end();
      }

      response.write(this.getJsonTodolist());
      response.end();
    })
  }

  deleteTodo(request,response){
    request.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      if(this.todolist[body.id]){
        this.todolist.splice(body.id, 1);
      }else{
        response.write(this.getErrorTodolist());
        response.end();
      }

      response.write(this.getJsonTodolist());
      response.end();
    })
  }
}