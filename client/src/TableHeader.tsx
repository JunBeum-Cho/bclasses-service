import React from 'react';
import './Table.css';

export default function TableHeader() {
    return (
        <thead>
            <tr>
                <th>Status</th>
                <th>Course number</th>
                <th>Course title</th>
                <th>Enrolled</th>
                <th>Waitlisted</th>
                <th>Accumulated class avg</th>
                <th>Most recent section avg</th>
                <th></th>
            </tr>
        </thead>
    )
}