const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // brute force find address starting with 0x00
    let signer, address;
    do {
      const pKey = ethers.Wallet.createRandom();
      signer = new ethers.Wallet(pKey, ethers.provider);
      address = await signer.getAddress();
    } while (!address.startsWith("0x00"));

    // fund the account with 1 ETH
    const defaultSigner0 = ethers.provider.getSigner(0);
    await defaultSigner0.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("1.0"),
    });

    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
