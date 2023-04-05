export enum ProfileTabs {
    PersonalInfo,
    PreviousCalls,
    Appointments
}

export type Gender = "male" | "female" | "trans";

export type UserData = {
    name: string,
    dob: string,
    weight: string,
    gender: string
}