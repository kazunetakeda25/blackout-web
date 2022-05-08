import { Decimal } from "decimal.js";
import {
  Interface,
  methodId,
  StateMutability,
  InterfaceType,
  token256,
} from "src/abi";
import { FANTOM_DAI, FANTOM_TOR } from "src/constants";
import {
  Provider,
  ProviderRpcError,
  sendTransaction,
  TransactionAddress,
} from "src/provider";
import { Result } from "src/util";

export const TOR_MINTER_ADDRESS = "0x9b0c6FfA7d0Ec29EAb516d3F2dC809eE43DD60ca";

export async function mintWithDai(
  provider: Provider,
  owner: string,
  dai: Decimal,
): Promise<Result<TransactionAddress, ProviderRpcError>> {
  const method = await methodId(MINT_WITH_DAI_ABI);
  const result = await sendTransaction(provider, {
    from: owner,
    to: TOR_MINTER_ADDRESS,
    data: "0x" + method + token256(FANTOM_DAI, dai),
  });
  return result;
}
const MINT_WITH_DAI_ABI: Interface = {
  inputs: [
    {
      name: "_daiAmount",
      type: "uint256",
    },
  ],
  name: "mintWithDai",
  outputs: [
    {
      name: "_torAmount",
      type: "uint256",
    },
  ],
  stateMutability: StateMutability.NonPayable,
  type: InterfaceType.Function,
};

export async function redeemToDai(
  provider: Provider,
  owner: string,
  tor: Decimal,
): Promise<Result<TransactionAddress, ProviderRpcError>> {
  const method = await methodId(REDEEM_TO_DAI_ABI);
  const result = await sendTransaction(provider, {
    from: owner,
    to: TOR_MINTER_ADDRESS,
    data: "0x" + method + token256(FANTOM_TOR, tor),
  });
  return result;
}

const REDEEM_TO_DAI_ABI: Interface = {
  inputs: [
    {
      name: "_torAmount",
      type: "uint256",
    },
  ],
  name: "redeemToDai",
  outputs: [
    {
      name: "_daiAmount",
      type: "uint256",
    },
  ],
  stateMutability: StateMutability.NonPayable,
  type: InterfaceType.Function,
};
