import { Sectors } from "./sectors.imterface"
export interface Startups{
    id?:string,
    startupName:string,
    logoImage?:string,
    city:string,
    sectors:Sectors[],
    founderName:string,
    numberOfEmployees:number,
    yearOfEstablishment:number,
    websiteUrl:string,
    emailAddress:string,
    // sectorLogo?:string,
    // designColor?:string,
    // parentCategoryName?:string

  }
