def getQuoteEthToCrv(numEth):
    print(str(crvAmt) + ' - (' + str(constantProduct) + '/(' + str(ethAmt) + ' + ' + str(numEth) + '))')
    return crvAmt - (constantProduct//(ethAmt + numEth))

def getQuoteCrvToEth(numCrv):
    print(str(ethAmt) + ' - (' + str(constantProduct) + '/(' + str(crvAmt) + ' + ' + str(numCrv) + '))')
    return ethAmt - (constantProduct//(crvAmt + numCrv))

# For this example it will be a ETH to CRV pool
decimalBase = 100000000000000000
#decimalBase = 1
ethAmt = 10 * decimalBase
crvAmt = 1000 * decimalBase

# Get our constant (k)
constantProduct = ethAmt * crvAmt

print(getQuoteEthToCrv(1 * decimalBase))
print(getQuoteCrvToEth(100 * decimalBase))

