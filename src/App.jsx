import React, { Component } from 'react';


class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         todo: {
            task: "",
            priority: 0,
            editEnabled: false,
            completed: false
         },
         todoList: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.addTask = this.addTask.bind(this);
      this.update = this.update.bind(this)
      this.edit = this.edit.bind(this);
      this.delete = this.delete.bind(this);
      this.complete = this.complete.bind(this);
   }

   handleChange(e) {
      let todoCopy = JSON.parse(JSON.stringify(this.state.todo));
      const {name, value} = e.target;
      todoCopy[name] = value; 
      this.setState({
         todo: todoCopy
      });

   }

   addTask(){
      this.state.todo.priority == 0 ?
      document.getElementById('alert').hidden = false :
      (document.getElementById('alert').hidden = true,
      this.setState({
         todoList: this.state.todoList.concat(this.state.todo)
      }));
   }

   update(e,i){
      let listClone = JSON.parse(JSON.stringify(this.state.todoList));
      const {name, value} = e.target
      listClone[i][name] = value
      this.setState({
         todoList : listClone
      });
   }

   edit(i){
      let listClone = JSON.parse(JSON.stringify(this.state.todoList));
      listClone[i].editEnabled = !listClone[i].editEnabled
      this.setState({
         todoList: listClone
      });

   }

   delete(i){
      let listClone = JSON.parse(JSON.stringify(this.state.todoList));
      listClone.splice(i,1);
      this.setState({
         todoList: listClone
      });

   }

   complete(i){
      let listClone = JSON.parse(JSON.stringify(this.state.todoList));
      listClone[i].completed = !listClone[i].completed
      this.setState({
         todoList: listClone
      });
   }

   render() {
      return (
         <div className="container">
            <div className="pb-2 mt-4 mb-2 border-bottom text-white">
               <h1>Very Simple Todo App</h1>
               <p className="lead">Track all of the things</p>
            </div>
            <div className="row">
               <div className="col-sm-4">
                  <AddTask
                     task={this.state.todo.task}
                     handleChange={this.handleChange}
                     addTask={this.addTask}
                  />
               </div>
               <div className="col-sm-8">
                  <div className="card">
                     <p className="card-header">View Todos</p>
                     {this.state.todoList.length == 0 ?
                        <p className="text-muted text-center mt-4">Add New Todo To Get Started</p> :
                        this.state.todoList.map((todoItem, i) => 
                           <ViewTask
                              key={i}
                              index={i}
                              todoList={this.state.todoList}
                              delete={this.delete}
                              edit={this.edit}
                              complete={this.complete}
                              addTask={this.addTask}
                              update={this.update}
                              />
                              
                        )
                     }
                  </div>    
               </div>
            </div>
         </div>
      ); 
   }
}

class AddTask extends Component {

   render() {
      return (
         <div className="card">
            <p className="card-header">Add New Todo</p>
            <div className="card-body">
               <label htmlFor="create-text">I want to...</label>
               <textarea name="task" id="create-text" className="create-todo-text" onChange={this.props.handleChange} value={this.props.task}/>
               <label htmlFor="create-select" className="mt-2">How much of a priority is this?</label>
               <select name="priority" id="create-select" className="create-todo-priority w-100" defaultValue="0" onChange={this.props.handleChange}>
                     <option value="0" disabled>Select a Priority</option>
                     <option value="1">Low Priority</option>
                     <option value="2">Medium Priority</option>
                     <option value="3">High Priority</option>
               </select>
               <div className="text-danger text-center fw-bold mt-3" id="alert" hidden>Choose a priority!</div>
            </div>
            <div className="card-footer">
               <button className="create-todo btn btn-success w-100" onClick={(e) => this.props.addTask(e)}>Add</button>
            </div>
         </div>
      );
   }
}

class ViewTask extends Component {

   render() {
      return (
         <div>
               {this.props.todoList[this.props.index].editEnabled == false ?
                  <ul className="list-group list-group-flush">
                     <li className={`${this.props.todoList[this.props.index].priority==1 ? "list-group-item-success" : this.props.todoList[this.props.index].priority==2 ? "list-group-item-warning" : "list-group-item-danger"}`}>
                        <input type="checkbox" name="completed" onClick={() => this.props.complete(this.props.index)}/>
                        <span className="">{this.props.todoList[this.props.index].task}</span>
                        <div className="float-end">
                           <a className="edit-todo mx-2" onClick={() => this.props.edit(this.props.index)}><span className="material-symbols-outlined" aria-label="edit-todo">edit_note</span></a>
                           <a className="delete-todo mx-2" onClick={() => this.props.delete(this.props.index)}><span className="material-symbols-outlined" aria-label="delete-todo">delete_forever</span></a>
                        </div>
                     </li>
                  </ul> :
                  <div className="list-group list-group-flush">
                     <div className={`${this.props.todoList[this.props.index].priority==1 ? "list-group-item-success" : this.props.todoList[this.props.index].priority==2 ? "list-group-item-warning" : "list-group-item-danger"}`}>
                     <label htmlFor="update-text">Description</label>
                        <textarea name="task" id="update-text" className="update-todo-text mb-2" defaultValue={this.props.todoList[this.props.index].task} onChange={(e) => this.props.update(e,this.props.index)}/>
                        <label htmlFor="update-select">Priority</label>
                        <select name="priority" id="update-select" className="update-todo-priority w-50" defaultValue={this.props.todoList[this.props.index].priority} onChange = {(e) => this.props.update(e,this.props.index)} required>
                              <option value="1">Low Priority</option>
                              <option value="2">Medium Priority</option>
                              <option value="3">High Priority</option>
                        </select>
                        <div className="float-end">
                           <button className="btn btn-success update-todo" onClick={() => this.props.edit(this.props.index)}>Save</button>
                        </div>
                     </div>
                  </div>
               }
         </div>
      );
   }
}

export default App;