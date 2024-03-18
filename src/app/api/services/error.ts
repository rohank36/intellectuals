export default async function throwError(err: any){
    if (err instanceof Error) {
        throw new Error(err.message); 
    } else {
        throw new Error('An unknown error occurred');
    }
}