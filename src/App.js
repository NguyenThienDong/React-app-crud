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
            taskEdit: null,
            isDisplayForm: false,
            keyword: '',
            filter: {
                name: '',
                status:-1
            }
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
        if(this.state.isDisplayForm && this.state.taskEdit !== 'null'){
            this.setState({
                isDisplayForm: true,
                taskEdit: null
            })
        }else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm
            })
        }
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    onSubmit = (data) => {
        let { tasks} = this.state;
        if(data.id === '') {
            data.id = randomString.generate(); 
            tasks.push(data);
        }else {
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }
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

    onFilter = (filterName , filterStatus) => {
        filterStatus = parseInt(filterStatus)
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }

    onUpdate = (id) => {
        let index = this.findIndex(id);
        let { tasks } = this.state;
        let taskEdit = tasks[index];
        this.setState({
            taskEdit: taskEdit
        })
        this.onShowForm();
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

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword.toLowerCase()
        })
    }

    render() {
        let { tasks, isDisplayForm, taskEdit, filter, keyword } = this.state;
        if(filter) {
            if(filter.name){
                tasks = tasks.filter(task => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1
                })
            }
            tasks = tasks.filter(task => {
                if(filter.status === -1) {
                    return task
                }else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }

        if(keyword) {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            })
        }

        const elmTaskForm = isDisplayForm ? 
            <TaskForm 
                onCloseForm={this.onCloseForm} 
                onSubmit={this.onSubmit}
                task={taskEdit}
            /> : '';
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
                        <TaskControl onSearch={this.onSearch}/>
                        <TaskList 
                            tasks={tasks} 
                            onUpdateStatus={this.onUpdateStatus} 
                            onDeleteItem={this.onDeleteItem}
                            onUpdate={this.onUpdate}
                            onFilter={this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;