class UserService{
    static async getUser(email: string){
        try{
            const res = await fetch(`http://localhost:3000/api/users/${email}`, {
                method: 'GET',
            })
            const resData = await res.json();
            if(!res.ok){
                throw new Error("Failed to fetch user");
            }
            return resData;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    static async createNewUser(email:string, displayName:string, accessCode:string, firstName:string, lastName:string){
        try{
            const res = await fetch(`http://localhost:3000/api/users/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    displayName,
                    accessCode,
                }), 
            });
            const resData = await res.json();
            if(!res.ok){
                throw new Error("Failed to create user");
            }
            return resData;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default UserService;