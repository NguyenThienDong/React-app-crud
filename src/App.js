import React, { Component } from 'react';
import randomString from 'randomstring';

import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false
        }
    }

    componentDidMount() {
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks: tasks
            })
        }
    }


    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onSubmit = (data) => {
        let { tasks} = this.state;
        data.id = randomString.generate(); 
        tasks.push(data);
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        let index = this.findIndex(id);
        let { tasks } = this.state;
        if(index !== -1) {
            tasks[index].status = !tasks[index].status
        }
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onDeleteItem = (id) => {
        let index = this.findIndex(id);
        let { tasks } = this.state;
        if(index !== -1) {
            tasks.splice(index, 1)
        }
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }


    findIndex = (id) => {
        let result = - 1;
        let { tasks } = this.state;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        })
        return result;
    }

    render() {
        let { tasks, isDisplayForm } = this.state;
        const elmTaskForm = isDisplayForm ? 
            <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit}/> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : 'col-xs-0 col-sm-0 col-md-0 col-lg-0'}>
                        { elmTaskForm }
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary mb-10" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <TaskControl />
                        <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDeleteItem}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;