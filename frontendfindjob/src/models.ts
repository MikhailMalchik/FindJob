export interface IProduct {
    id? : number
    title : string 
    price : number
    description : string
    category: string
    image : string
    rating: {
        rate : number
        count : number
    }
}
export interface IApplicant{
    id : number
    email : string
    phone : string
    password : string
    name : string
    surname : string
    dateOfBirth : string
    gender : string
}

export interface IEmployer{
    id : number
    email : string
    phone : string
    password : string
    name : string
    surname : string
    companyName : string
}
export interface IResume{
    id : number
    description : string
    skills : string
    experience : string
    applicantId : number
    
}
export interface IRewiews{
    id : number
    rewiews : string
    dates : string
    applicantId : number
    vacancyId : number
    email : string
}

export interface IStaff{
    id : number
    email : string
    password : string
    name : string
    surname : string
    admin : boolean
}

export interface IVacancy{
    id : number
    nameVacancy : string
    description : string
    skills : string
    experience : string
    salary : string
    employerId : number

}

export interface IVacancyAbout{
    id : number
    nameVacancy : string
    description : string
    skills : string
    experience : string
    salary : string
    employerId : number
    phone : string
    email : string

}
    