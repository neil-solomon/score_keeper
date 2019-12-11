while(True):
    n = float(input("Size of grid:"))
    s = float(input("Number in a row to win:"))
    waysToWin = 2*(2*n**2 + s**2 - 3*n*s - 2*s + 3*n + 1)
    print("Ways to win:", waysToWin)
    print("")
