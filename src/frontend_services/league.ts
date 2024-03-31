class LeagueService{
    static async getLeague(accessCode: string){
        try{
            const res = await fetch(`http://localhost:3000/api/leagues/:accesCode?accessCode=${accessCode}`, {
                method: 'GET',
            })
            const resData = await res.json();
            if(!res.ok){
                throw new Error("Failed to fetch league");
            }
            return resData;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default LeagueService;