import { PangolinRewards } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const { args } = event;
  if (args) {
    const pangolinRewardRecord = new PangolinRewards(
      `${event.blockHash}-${event.logIndex}`
    );

    pangolinRewardRecord.transactionHash = event.transactionHash;
    pangolinRewardRecord.blockHash = event.blockHash;
    pangolinRewardRecord.blockNumber = BigInt(event.blockNumber);

    pangolinRewardRecord.receiver = args.user;
    pangolinRewardRecord.amount = BigInt(args.reward.toString());

    await pangolinRewardRecord.save();
  }
}
