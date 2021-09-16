def getQuoteEthToCrv(numEth):
        return crvAmt - (constantProduct/(ethAmt + numEth))

def getQuoteCrvToEth(numCrv):
        return ethAmt - (constantProduct/(crvAmt + numCrv))

# For this example it will be a ETH to CRV pool
ethAmt = 10
crvAmt = 1000

# Get our constant (k)
constantProduct = ethAmt * crvAmt

print(getQuoteEthToCrv(1))
print(getQuoteCrvToEth(10))

