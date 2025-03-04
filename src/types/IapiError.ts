export interface IApiError {
    statusCode: number;
    message: string;
    data: null | any;
    success: boolean;
    errors: any[]; 
    stack?: string; 
}