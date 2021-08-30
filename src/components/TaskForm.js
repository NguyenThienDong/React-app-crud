import React, {Component} from 'react';

export default class TaskForm extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: false
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm()   
    }

    onChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        if(name === 'status') {
            value = target.value === 'false' ? false : true
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        const { name, status } = this.state;
        return (
            <div className="panel panel-lg panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                    Thêm Công Việc
                    <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input 
                                type="text" 
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái: </label>
                            <select 
                                className="form-control"
                                name='status'
                                value={status}
                                onChange={this.onChange}
                            >
                                <option value={true}>Kích hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            
                        </div>
                        <div className='text-center'>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >
                                <span className="fa fa-plus mr-5"></span> Lưu lại
                            </button> &nbsp;
                            <button 
                                type="submit" 
                                className="btn btn-danger"
                                onClick={this.onClear}
                            ><span className="fa fa-close mr-5"></span> Hủy bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}