const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game3", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();

    return { game };
  }

  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect

    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);
    const signer3 = ethers.provider.getSigner(2);

    const addresses = [];

    addresses.push(await signer1.getAddress());
    addresses.push(await signer2.getAddress());
    addresses.push(await signer3.getAddress());

    await Promise.all([
      game.connect(signer1).buy({ value: "200" }),
      game.connect(signer2).buy({ value: "300" }),
      game.connect(signer3).buy({ value: "100" }),
    ]);

    // TODO: win expects three arguments
    await game.win(...addresses);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
