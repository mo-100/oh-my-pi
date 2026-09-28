/**
 * Show what the read tool will return for a path, URL, or internal URI.
 */

import { Args, Command } from "@oh-my-pi/pi-utils/cli";
import { readHelp as commandHelp } from "../cli/command-help";
import { type ReadCommandArgs, runReadCommand } from "../cli/read-cli";
import { initTheme } from "@oh-my-pi/pi-tui/theme";

export default class Read extends Command {
	static description = commandHelp.description;
	static args = {
		path: Args.string({
			description:
				"Path, URL, or internal URI to read (append :sel for line ranges or raw mode, e.g. src/foo.ts:50-100)",
			required: true,
		}),
	};

	static examples = [
		"mozn read src/foo.ts",
		"mozn read src/foo.ts:50-100",
		"mozn read src/foo.ts:raw",
		"mozn read https://example.com",
		"mozn read omp://",
		"mozn read issue://123",
		"mozn read path/to/archive.zip:dir/file.ts",
		"mozn read path/to/db.sqlite:users:42",
	];

	async run(): Promise<void> {
		const { args } = await this.parse(Read);
		const cmd: ReadCommandArgs = {
			path: args.path ?? "",
		};
		await initTheme();
		await runReadCommand(cmd);
	}
}
