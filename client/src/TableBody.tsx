import React from "react"
import './Table.css';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export interface TableBodyProps {
    handleRemove: (courseid: number) => void,
    data: any
}

export default class TableBody extends React.Component<TableBodyProps> {
    
    render() {
        return (
            this.renderRow()
        )
    }

    renderRow() {
        const greenlight = "🟢" // &#128994;
        const yellowlight = "🟡" // &#128993;
        const redlight = "🔴" // &#128308;
        const whitelight = "⚪" // &#9898;
        const { data } = this.props;

        if (!data.course_validation) {
            return (
                <tr>
                    <td>{whitelight}</td>
                    <td className="italic" colSpan={6}> * {data.course_title} is not a valid course number</td>
                    <td>dasd</td>
                </tr>
            )
        } else if (!data.is_offered) {
            return (
                <tr>
                    <td>{whitelight}</td>
                    <td className="italic" colSpan={6}> * {data.course_title} is not offered in {data.semester} {data.year}</td>
                    <td>dasd</td>
                </tr>
            )
        } else {
            let availability_sign = redlight
            if (Number(data.currently_waitlisted) === 0) {
                availability_sign = greenlight
            } else if (Number(data.currently_waitlisted) < Number(data.max_waitlisted)) {
                availability_sign = yellowlight
            }

            return(
                <tr>
                    <td>{availability_sign}</td>
                    <td>{data.course_title}</td>
                    <td>{data.course_subtitle}</td>
                    <td>{data.currently_enrolled} / {data.max_enrolled}</td>      
                    <td>{data.currently_waitlisted} / {data.max_waitlisted}</td>      
                    <td>{data.total_class_grade}</td>
                    <td>{data.recent_section_grade} ({data.recent_section_period})</td>
                    <td>
                    <IconButton 
                        style={{width: "30px", height: "30px"}}
                        onClick={this.handleRemove}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                    </td>
                </tr>
            )
        }
    }

    handleRemove = () => {
        this.props.handleRemove(this.props.data.courseid)
    }
}






// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// <IconButton aria-label="delete" className={classes.margin}>
// <DeleteIcon />
// </IconButton>