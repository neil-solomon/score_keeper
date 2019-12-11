import random
import time
import json

riskProbs = {}
numSims = 1000
attackerFrom = 1
attackerTo = 100
defenderFrom = 1
defenderTo = 100
startTime = time.time()
for numAttackers in range(attackerFrom, attackerTo+1):
    for numDefenders in range(defenderFrom, defenderTo+1):
        print(numAttackers, "vs", numDefenders, " ", end="\r")
        # attacker wins, defenders wins, attacking armies remaining, defending armies remaining
        outcomes = [0, 0, 0, 0]
        start = time.time()
        while (outcomes[0]+outcomes[1] < numSims):
            attackers = numAttackers
            defenders = numDefenders
            while (attackers > 0 and defenders > 0):
                if (attackers == 1):
                    attackerRolls = [random.randrange(1, 7)]
                elif(attackers == 2):
                    attackerRolls = [random.randrange(
                        1, 7), random.randrange(1, 7)]
                else:
                    attackerRolls = [random.randrange(
                        1, 7), random.randrange(1, 7), random.randrange(1, 7)]
                if (defenders == 1):
                    defenderRolls = [random.randrange(1, 7)]
                else:
                    defenderRolls = [random.randrange(
                        1, 7), random.randrange(1, 7)]
                attackerRolls.sort(reverse=True)
                defenderRolls.sort(reverse=True)
                ix = 0
                while (ix < len(attackerRolls) and ix < len(defenderRolls)):
                    if (attackerRolls[ix] > defenderRolls[ix]):
                        defenders -= 1
                    else:
                        attackers -= 1
                    ix += 1
            if (attackers > defenders):
                outcomes[0] += 1
                outcomes[2] += attackers
            else:
                outcomes[1] += 1
                outcomes[3] += defenders
        outcomesAdjusted = [i/numSims for i in outcomes]
        key = str(numAttackers) + "vs" + str(numDefenders)
        riskProbs[key] = outcomesAdjusted
totalTime = time.time() - startTime
print("")
print(numSims, "simulations for", (attackerTo-attackerFrom+1)*(defenderTo-defenderFrom+1), "battles in",
      totalTime, "seconds.")
filename = "./riskProbs/riskProbs_"+"A"+str(attackerFrom)+"-"+str(attackerTo) + \
    "_D"+str(defenderFrom)+"-"+str(defenderTo)+"_"+str(numSims)+".json"
with open(filename, "w+") as f:
    json.dump(riskProbs, f)
