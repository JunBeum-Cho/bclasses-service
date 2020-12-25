/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
interface CourseTextBox {
  id: number, 
  abbreviation: string, 
  course_number: string
}

interface CourseTextField {
  list: CourseTextBox[],
  handleCreate: (courseid: any) => void,
  handleCancel: () => void
}

export class AutocompleteCoursesTextField extends React.Component<CourseTextField> {
  state = {
    dept: "",
    courseid: "",
    dept_chosen: false,
    course_chosen: false
  }

  render() {
    return (
      <div style={{width: "fit-content", height: "fit-content", marginLeft: "auto", marginRight: "auto", alignContent: "center"}}>
        {this.renderDept()}
        {this.renderCourse()}
        {this.renderAddButton()}
        {this.renderRemoveButton()}
      </div>
    )
  }


  renderDept() {
    let department_list: string[] = []
    for (let course of this.props.list) {
      if(!(department_list.includes(course.abbreviation))) {
        department_list.push(course.abbreviation)
      }
    }

    return(
      <Autocomplete
        style={{width: "180px", display: "inline-block"}}
        options={department_list}
        getOptionLabel={(option) => `${option}`}
        id="dept"
        selectOnFocus
        onChange = {this.handleDeptText}
        renderInput={(params) => <TextField {...params} label={"Department"} margin="normal" />}
      />
    )
  }

  renderCourse() {
    let filtered_courses = this.props.list.filter(course => course.abbreviation === this.state.dept)
    return(
      <Autocomplete
        disabled={!this.state.dept_chosen}
        style={{width: "180px", marginLeft: "30px",display: "inline-block"}}
        options={filtered_courses}
        getOptionLabel={(option) => `${option.course_number}`}
        id="courses"
        selectOnFocus
        onChange = {this.handleCourseText}
        renderInput={(params) => <TextField {...params} label={"Course Number"} margin="normal" />}
      />
    )
  }

  renderAddButton() {
    return(
      <Button
        disabled={!(this.state.dept_chosen && this.state.course_chosen)}
        style={{marginLeft: "30px", verticalAlign: "bottom", marginBottom: "10px"}} 
        variant="contained" 
        size="large" 
        color="primary" 
        onClick={this.handleCreate}>Add
      </Button>
    )
  }

  renderRemoveButton() {
    return(
      <IconButton
        style={{marginLeft: "10px", verticalAlign: "bottom", marginBottom: "5px"}} 
        aria-label="delete" 
        onClick={this.props.handleCancel}>
        <DeleteIcon />
      </IconButton>
    )
  }

  handleDeptText = (event: any, newValue: string | null) => {
    this.setState({...this.state, dept:newValue, dept_chosen:true})
  }

  handleCourseText = (event: any, newValue: CourseTextBox | null) => {
    this.setState({...this.state, courseid:newValue?.id, course_chosen:true})
  }

  handleCreate = () => {
    this.props.handleCreate(this.state.courseid)
  }
}

export function AutocompleteCoursesTextBox(props: {label: string, list: CourseTextBox[]}) {
  const { label, list } = props
  return (
    <Autocomplete
      style={{ width: 300, display: "inline-block"}}
      options={list}
      autoHighlight
      getOptionLabel={(option) => `${option.abbreviation} ${option.course_number}`}
      renderOption={(option) => (
        <React.Fragment>
          {option.abbreviation} {option.course_number}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password" // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}


// export function AutocompleteListTextBox(props: {label: string, list: ListTextBox[]}) {
//   const { label, list } = props
//   return (
//     <Autocomplete
//       style={{ width: 350, display: "inline-block"}}
//       options={list}
//       autoHighlight
//       getOptionLabel={(option) => `${option.name}`}
//       renderOption={(option) => (
//         <React.Fragment>
//           {option.name}
//         </React.Fragment>
//       )}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           variant="outlined"
//           inputProps={{
//             ...params.inputProps,
//             autoComplete: "new-password" // disable autocomplete and autofill
//           }}
//         />
//       )}
//     />
//   );
// }

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

