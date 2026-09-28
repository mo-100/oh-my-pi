import { CliUsageError, Command } from "@oh-my-pi/pi-utils/cli";
import { predictHelp as commandHelp } from "../cli/command-help";
import { runPredictCompare } from "../cli/predict-cli";

export default class Predict extends Command {
	static description = commandHelp.description;

	static examples = ["mozn predict"];

	async run(): Promise<void> {
		await this.parse(Predict);
		if (!process.stdin.isTTY || !process.stdout.isTTY)
			throw new CliUsageError("mozn predict needs an interactive terminal");
		await runPredictCompare();
	}
}
