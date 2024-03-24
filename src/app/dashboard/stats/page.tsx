//TODO: figure out a way to validate their input? How can we do this? do we need to? 
export default function StatsPage() {
  return(

    <div className="ml-14"> 
      <h1 className="text-2xl font-bold mb-6 ml-12">📈 Your Stats!</h1>
      <div className="flex flex-wrap justify-center gap-y-8 gap-x-12">
        
        <div className="stats shadow mt-5 ml-14">
          <div className="stat">
            <div className="stat-figure text-primary">
              <p className="text-3xl">🕹️</p>
            </div>
            <div className="stat-title">Minis Played</div>
            <div className="stat-value text-primary">25</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <p className="text-3xl">⏳</p>
            </div>
            <div className="stat-title">Average Mini Time</div>
            <div className="stat-value text-secondary">25</div>
            <div className="stat-desc">vs 4.01 League Average</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <p className="text-3xl">🏆</p>
            </div>
            <div className="stat-title">Total Mini Podiums</div>
            <div className="stat-value">25</div>
          </div>
        </div>

        <div className="stats shadow mt-5 ml-14">
          <div className="stat">
            <div className="stat-figure text-primary">
              <p className="text-3xl">🕹️</p>
            </div>
            <div className="stat-title">Connections Played</div>
            <div className="stat-value text-primary">25</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <p className="text-3xl">🎯</p>
            </div>
            <div className="stat-title">Average Mistakes Made</div>
            <div className="stat-value text-secondary">25</div>
            <div className="stat-desc">vs 2 League Average</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <p className="text-3xl">🚀</p>
            </div>
            <div className="stat-title">Longest Perfect Streak</div>
            <div className="stat-value">25</div>
          </div>
        </div>
      
      </div>
    </div>
  );
}
