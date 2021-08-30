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
            tasks: []
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

    onGenerateData = () => {
        var tasks = [
            {
                id: randomString.generate(),
                name: 'Học lập trình ReactJs',
                status: true
            }, {
                id: randomString.generate(),
                name: 'Học lập trình JavaScript',
                status: true
            }, {
                id: randomString.generate(),
                name: 'Học lập trình NodeJs',
                status: false
            }
        ];
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    render() {
        const { tasks } = this.state;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
                        <TaskForm />
                    </div>
                    <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8 '>
                        <button type="button" className="btn btn-primary mb-10" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button type="button" className="btn btn-danger pr-5 mb-10" onClick={this.onGenerateData} >
                            <span className="fa fa-plus mr-5"></span>Generate
                        </button>
                        <TaskControl />
                        <TaskList tasks={tasks}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;