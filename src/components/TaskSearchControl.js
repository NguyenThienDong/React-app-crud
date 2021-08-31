import React, {Component} from 'react';

export default class TaskSearchControl extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSeacrch = () => {
        this.props.onSearch(this.state.keyword);
        this.setState({
            keyword: ''
        })
    }

    render() {
        const {keyword} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-10">
                <div className="input-group">
                    <input
                        name="keyword"
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        value={keyword}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.onSeacrch}>
                            <span className="fa fa-search mr-5"></span>Tìm
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}