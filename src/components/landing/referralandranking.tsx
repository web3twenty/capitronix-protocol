const ReferralAndRankRewards = () => {
  const profitMap = {
    "1": 0.08,
    "2": 0.03,
    "3": 0.02,
    "4": 0.01,
    "5": 0.005,
    "6": 0.005,
  };

  const rankingMap = {
    "1": "20",
    "2": "32",
    "3": "64",
    "4": "256",
    "5": "512",
    "6": "2048",
  };

  // Transform the maps into arrays for rendering
  const referralLevels = Object.entries(profitMap).map(([level, bonus]) => ({
    level: `Affiliate Tier ${String(+level).padStart(2, "0")}`,
    bonus: `${bonus * 100}%`,
  }));

  const totalRankRewards = Object.entries(rankingMap).reduce(
    (acc, [rank, reward]) => acc + Number(reward),
    0
  );

  const rankRewards = Object.entries(rankingMap).map(
    ([rank, reward], index) => {
      let conditionText = "";

      if (index === 0) {
        conditionText = "4 Direct Active Refer";
      } else if (index >= 1 && index <= 5) {
        const numbers = ["One", "Two", "Three", "Four", "Five"];
        conditionText = `4 Direct Rank ${numbers[index - 1]}`;
      } else {
        conditionText = "";
      }

      return {
        rank: `Rank ${rank}`,
        condition: conditionText,
        reward: `${reward} USDT`,
      };
    }
  );

  return (
    <section className="py-6 sm:py-8 lg:py-12 px-4 relative overflow-hidden !pt-0">
      {/* Background Effects */}
      {/* <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#11B97E]/10 rounded-full blur-3xl pointer-events-none"></div> */}

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4">
          <div className="inline-block">
            <h2 className="text-[#11B97E] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-[#11B97E]/10 px-4 py-2 rounded-full border border-[#11B97E]/20">
              Rewards Program
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Community Position & Achievements
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Earn rewards by inviting others! Get up to 15% in multi-level
            bonuses and achieve ranks for additional rewards.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* 6-Tier Affiliate Bonus Card */}
          <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#11B97E]/30 hover:shadow-2xl hover:shadow-[#11B97E]/20 hover:scale-[1.02]">
            {/* Top Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#11B97E] to-transparent"></div>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#11B97E] mb-6 sm:mb-8 text-center">
                6 Tier Affiliate Bonus
              </h3>

              {/* Levels List */}
              <div className="space-y-3 sm:space-y-4">
                {referralLevels.map((level, index) => (
                  <div
                    key={index}
                    className="group/item relative bg-black/30 hover:bg-black/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-[#11B97E]/30 transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#11B97E] shadow-lg shadow-[#11B97E]/50 group-hover/item:scale-125 transition-transform duration-300"></div>
                        <span className="text-white font-semibold text-base sm:text-lg group-hover/item:text-[#11B97E] transition-colors duration-300">
                          {level.level}
                        </span>
                      </div>
                      <span className="text-[#11B97E] font-bold text-lg sm:text-xl">
                        {level.bonus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Box */}
              <div className="mt-6 sm:mt-8 bg-[#11B97E]/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#11B97E]/20">
                <p className="text-gray-300 text-sm sm:text-base text-center leading-relaxed">
                  <span className="font-semibold text-[#11B97E]">
                    Affiliate Bonus (6-tier system):
                  </span>{" "}
                  This plan is designed to drive viral growth and community-led
                  adoption.
                </p>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Community Positions Card */}
          <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#11B97E]/30 hover:shadow-2xl hover:shadow-[#11B97E]/20 hover:scale-[1.02]">
            {/* Top Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#11B97E] to-transparent"></div>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#11B97E] mb-6 sm:mb-8 text-center">
                Community Positions
              </h3>

              {/* Ranks List */}
              <div className="space-y-3 sm:space-y-4">
                {rankRewards.map((rank, index) => (
                  <div
                    key={index}
                    className="group/item relative bg-black/30 hover:bg-black/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-[#11B97E]/30 transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#11B97E] shadow-lg shadow-[#11B97E]/50 group-hover/item:scale-125 transition-transform duration-300"></div>
                        <span className="text-white font-bold text-base sm:text-lg group-hover/item:text-[#11B97E] transition-colors duration-300">
                          {rank.rank}
                        </span>
                      </div>
                      <span className="text-[#11B97E] font-semibold text-base sm:text-lg">
                        {rank.reward}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base pl-5 group-hover/item:text-gray-300 transition-colors duration-300">
                      {rank.condition}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total Rewards Box */}
              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#11B97E]/10 to-[#11B97E]/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#11B97E]/30 shadow-lg shadow-[#11B97E]/10">
                <p className="text-[#11B97E] text-center font-semibold text-sm sm:text-base leading-relaxed">
                  Earn up to{" "}
                  <span className="text-lg sm:text-xl font-bold">
                    {totalRankRewards} USDT
                  </span>{" "}
                  by growing your referral network and achieving ranks with
                  active members.
                </p>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#11B97E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralAndRankRewards;
