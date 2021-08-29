import React from 'react';

export default function TaskForm() {
    return (
        <div className="panel panel-lg panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                Thêm Công Việc
                <span className="fa fa-times-circle text-right"></span>
                </h3>
            </div>
            <div className="panel-body">
                <form>
                    <div className="form-group">
                        <label>Tên: </label>
                        <input 
                            type="text" 
                            className="form-control"
                         />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái: </label>
                        <select className="form-control">
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        
                    </div>
                    <div className='text-center'>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        ><span className="fa fa-plus mr-5"></span> Lưu lại
                        </button> &nbsp;
                        <button 
                            type="submit" 
                            className="btn btn-danger"
                        ><span className="fa fa-close mr-5"></span> Hủy bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}