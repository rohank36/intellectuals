import StatsCard from "./StatsCard";
export default function StatsPage() {
  return(
    <div className="ml-14">
      <h1 className="text-2xl font-bold mb-6 ml-12">📈 Your Stats!</h1>
      <div className="flex flex-wrap justify-center gap-y-8 gap-x-12">
        <StatsCard icon="🕹️" cardTitle="Minis Played" data="25"/>
        <StatsCard icon="⏳" cardTitle="Avg Mini Time" data="25"/>
        <StatsCard icon="⚔️" cardTitle="Avg Mini Time vs League Avg" data="25"/>
        <StatsCard icon="🏆" cardTitle="Total Mini Podium Finishes" data="25"/>
        <StatsCard icon="🕹️" cardTitle="Connections Played" data="25"/>
        <StatsCard icon="🚩" cardTitle="Avg Mistakes Made" data="25"/>
        <StatsCard icon="⚔️" cardTitle="Avg Mistakes Made vs League Avg" data="25"/>
        <StatsCard icon="🚀" cardTitle="Longest Perfect Streak" data="25"/>
      </div>
    </div>
  );
}


//Stats to track
/*
  Mini Games played
  Average Mini Time 
  Average Mini time vs league average 
  Total Mini Podium Finishes 

  Connections Games played
  Average Mistakes made 
  Average Mistakes made vs league average
  Longest Perfect Connections Streak
*/