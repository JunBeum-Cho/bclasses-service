import './Table.css';
import React from 'react'
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import { AutocompleteCoursesTextField } from './AutocompleteField'
import allCourseList_json from "./all_courses.json"
import Input from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export interface TableProps {
    tableName: string
    tableData: any
    handleAddData: (tableName: string, courseid: any) => void
    handleRemoveData: (tableName: string, courseid: any) => void
    handleTableName: (tableName: string, newtableName: string) => void
}

class Table extends React.Component<TableProps> {
    state = { 
        editing: false, 
        titlefocused: false
    }

    // componentDidUpdate(prevProps: any, prevState: any) {
    //     // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    //     // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    //     // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
    
    //     const { info, onUpdate } = this.props;
    //     if(!prevState.editing && this.state.editing) {
    //       // editing 값이 false -> true 로 전환 될 때
    //       // info 의 값을 state 에 넣어준다
    //       this.setState({
    //         name: info.name,
    //         phone: info.phone
    //       })
    //     }
    
    //     if (prevState.editing && !this.state.editing) {
    //       // editing 값이 true -> false 로 전환 될 때
    //       onUpdate(info.id, {
    //         name: this.state.name,
    //         phone: this.state.phone
    //       });
    //     }
    //   }

	render() {
        return (
            <div className="tablearea">
                
                {this.rendertitle()}
                <table className="content-table">
                    <TableHeader/>
                    <tbody>
                        {this.renderbody()}
                        {this.renderadditem()}
                    </tbody>
                </table>
            </div>
        )
    }

    rendertitle() {
        if (this.state.titlefocused) {
            return (
                <div className="titlediv">
                    <Input
                        autoFocus={true}
                        disableUnderline={true}
                        defaultValue={this.props.tableName}
                        inputProps={{ 'aria-label': 'description' }}
                        className={"title"}
                        color= {"primary"}
                        style = { {fontSize: "20px", fontWeight: "bold", width: "750px"}}
                        onChange={this.handleTitleEditonChange}
                        onBlur={() => {this.setState({titlefocused: false})}}
                    />
                </div>
            )
        } else {
            return (
                <div className="titlediv">
                    <h2 className="title">{this.props.tableName}</h2>
                    <IconButton
                        className={"titleEditIcon"}
                        onClick={()=>{this.setState({titlefocused: true})}}>
                        <EditIcon fontSize="small"/>
                    </IconButton>
                </div>
            )
        }

    }

    renderbody() {
        const { tableData } = this.props
        return tableData.map((data: any, index: number) => {
            return <TableBody handleRemove={this.handleRemove} key={index} data={data} />
        })
    }

    renderadditem() {
        const allCourseList = allCourseList_json.courses
        if (this.state.editing === true) {
            return (
                <tr>
                    <td colSpan={7}>
                        <AutocompleteCoursesTextField
                            list={allCourseList} 
                            handleCancel={() => {this.setState({editing: false})}} 
                            handleCreate={this.handleCreate}>
                        </AutocompleteCoursesTextField></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td colSpan={8}>
                        <div 
                            className="additem_btn" 
                            onClick={() => {this.setState({editing: !this.state.editing})}}>+
                        </div>
                    </td>
                </tr>
            )
        }
    }

    handleCreate = (courseid: number) => {
        this.props.handleAddData(this.props.tableName, courseid)
        this.setState({editing: false})
    }

    handleRemove = (courseid: number) => {
        this.props.handleRemoveData(this.props.tableName, courseid)
    }

    handleTitleEditonChange = (e: any) => {
        this.props.handleTableName(this.props.tableName, e.target.value)
    }
}

export default Table