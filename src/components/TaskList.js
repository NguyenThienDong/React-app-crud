import React, {Component} from 'react';
import TaskItem from './TaskItem';

export default class TaskList extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (e) => {
        var {filterName, filterStatus} = this.state;
        var target = e.target;
        var value = target.value;
        var name = target.name;
        this.props.onFilter(
            name === 'filterName' ? value : filterName,
            name === 'filterStatus' ? value : filterStatus
        )
        this.setState({
            [name]: value
        })
    }

    render() {
        const { tasks } = this.props;
        const { filterName, filterStatus } = this.state;
        const elmTasks = tasks.map((task, index) => (
            <TaskItem 
                key={task.id} 
                index={index} 
                task={task} 
                onUpdateStatus={this.props.onUpdateStatus} 
                onDeleteItem={this.props.onDeleteItem}
                onUpdate={this.props.onUpdate}
            />
        ))
        return(
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        value={filterName}
                                        onChange={this.onChange}
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        value={filterStatus}
                                        onChange={this.onChange}
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { elmTasks }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}