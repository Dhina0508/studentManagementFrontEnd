export interface StudentInfoModel{
    id:number,
    fullName: string,
    email:string,
    mobile: number,
    address: string,
    graduated: boolean
    image:File
}

export interface StudentResponseModel{
    status:string,
    data:any
}

export interface Student {
    fullName: string;
    email: string;
    mobile: number;
    address: string;
    graduated: boolean;
    image:File
  }
  