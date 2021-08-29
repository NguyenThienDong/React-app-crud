import React from 'react';
import TaskSearchControl from './TaskSearchControl';
import TaskSortControl from './TaskSortControl';

export default function TaskControl () {
    return (
        <div className="row mt-15">
            <TaskSearchControl />
            <TaskSortControl />
        </div>
    )
}