import Axios from "axios"

export default class bclasses {
    public semester: string
    public year: string
    public listname: string
    public my_course_list_ID: {courseid: number, coursename: string}[]
    public my_course_list_info : { [id: string]: {
        course_validation?: boolean,
        is_offered?: boolean,
        course_title?: string,
        course_subtitle?: string,
        currently_enrolled?: string,
        max_enrolled?: string,
        currently_waitlisted?: string,
        max_waitlisted?: string
        recent_section_period?: string
        recent_section_grade?: string
        recent_section_id?: string
        total_class_grade?: string
    }} = {}

    constructor(semester: string, year: string, listname: string, my_course_list_ID: {courseid: number, coursename: string}[]) {
        this.semester = semester
        this.year = year
        this.listname = listname
        this.my_course_list_ID = my_course_list_ID
    }

    async main () {
        // for (let course of this.my_course_list) {
        //     let id = this.checkifexists(course)
        //     if(id) {
        //         this.my_course_list_ID.push([id, `${course.toUpperCase()}`])
        //     } else {
        //         // in case there are two invalid courses, used course title instead of id 
        //         this.my_course_list_info[course] = {}
        //         this.my_course_list_info[course].course_validation = false
        //         this.my_course_list_info[course].course_title = `${course.toUpperCase()}`
        //     }
        // }

        return Promise.all(this.my_course_list_ID.map(async (course) => {
            await this.get_enroll_info(course.courseid, course.coursename)
            await this.get_gradenumber_info(course.courseid)
            await this.get_grade_info(course.courseid)
        }))
    }

    private async get_enroll_info(courseID: number, course_name: string) {
        this.my_course_list_info[courseID] = {}
        try {
            // const course_enroll_info = JSON.parse(cp.execSync([
            //     `curl -X GET "https://www.berkeleytime.com/api/enrollment/aggregate/${courseID}/${this.semester}/${this.year}/"`,
            //     `-H "accept: application/json"`
            //     ].join(" ")).toString())

            const course_enroll_info_res = await Axios.get(`https://www.berkeleytime.com/api/enrollment/aggregate/${courseID}/${this.semester}/${this.year}/`)
            const course_enroll_info = await course_enroll_info_res.data

            this.my_course_list_info[courseID].course_validation = true
            this.my_course_list_info[courseID].is_offered = true
            this.my_course_list_info[courseID].course_title = course_enroll_info["title"]
            this.my_course_list_info[courseID].course_subtitle = course_enroll_info["subtitle"]
            this.my_course_list_info[courseID].currently_enrolled = course_enroll_info["data"][course_enroll_info["data"].length-1]["enrolled"]
            this.my_course_list_info[courseID].max_enrolled = course_enroll_info["data"][course_enroll_info["data"].length-1]["enrolled_max"]
            this.my_course_list_info[courseID].currently_waitlisted = course_enroll_info["data"][course_enroll_info["data"].length-1]["waitlisted"]
            this.my_course_list_info[courseID].max_waitlisted = course_enroll_info["data"][course_enroll_info["data"].length-1]["waitlisted_max"]
        } catch {
            this.my_course_list_info[courseID].course_validation = true
            this.my_course_list_info[courseID].is_offered = false
            this.my_course_list_info[courseID].course_title = course_name
        }
    }

    private async get_gradenumber_info(courseID: number) {
        try {
            // const course_gradenumber_info = JSON.parse(cp.execSync([
            //     `curl -X GET curl -X GET "https://www.berkeleytime.com/api/grades/course_grades/${courseID}/"`,
            //     `-H "accept: application/json"`
            //     ].join(" ")).toString())

            const course_gradenumber_info_res = await Axios.get(`https://www.berkeleytime.com/api/grades/course_grades/${courseID}/`)
            const course_gradenumber_info = await course_gradenumber_info_res.data

            let recent_section = course_gradenumber_info[0]
            this.my_course_list_info[courseID].recent_section_id = recent_section["grade_id"]
            this.my_course_list_info[courseID].recent_section_period = `${recent_section["semester"]} ${recent_section["year"]}`
        } catch {
            this.my_course_list_info[courseID].recent_section_id = "0"
            this.my_course_list_info[courseID].recent_section_period = "N/A"
        }
    }

    private async get_grade_info(courseID: number) {
        try {
            // const course_grade_info = JSON.parse(cp.execSync([
            //     `curl -X GET curl -X GET "https://www.berkeleytime.com/api/grades/sections/${this.my_course_list_info[courseID].recent_section_id}/"`,
            //     `-H "accept: application/json"`
            //     ].join(" ")).toString())
            
            const course_grade_info_res = await Axios.get(`https://www.berkeleytime.com/api/grades/sections/${this.my_course_list_info[courseID].recent_section_id}/`)
            const course_grade_info = await course_grade_info_res.data
            
            this.my_course_list_info[courseID].total_class_grade = course_grade_info["course_gpa"] || "N/A"
            this.my_course_list_info[courseID].recent_section_grade = course_grade_info["section_gpa"] || "N/A"
        } catch {
            this.my_course_list_info[courseID].total_class_grade = "N/A"
            this.my_course_list_info[courseID].recent_section_grade = "N/A"
        }
    }

    public print_all() {
        for (const course of Object.entries(this.my_course_list_info)) {
            if (!course[1].is_offered) {
                console.log(`${course[1].course_title} is not offered in ${this.semester} ${this.year}`)
            } else {
                console.log(course[1])
            }
        }
    }
}


