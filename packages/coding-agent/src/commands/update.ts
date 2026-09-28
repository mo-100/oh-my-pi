/**
 * Update installed plugins. Self-update is disabled in this source fork.
 */

import { Command, Flags } from "@oh-my-pi/pi-utils/cli";
import { updateHelp as commandHelp } from "../cli/command-help";
import * as pluginCli from "../cli/plugin-cli";
import { initTheme } from "@oh-my-pi/pi-tui/theme";

export default class Update extends Command {
	static description = commandHelp.description;
	static flags = {
		plugins: Flags.boolean({ char: "l", description: "Update installed plugins", default: false }),
	};

	static examples = ["mozn update --plugins"];

	async run(): Promise<void> {
		const { flags } = await this.parse(Update);
		await initTheme();
		if (!flags.plugins) {
			process.stderr.write(
				"update: self-update is disabled in this build (source fork of oh-my-pi); rebuild with `bun run build` in packages/coding-agent, or pass --plugins to update installed plugins.\n",
			);
			process.exitCode = 1;
			return;
		}
		await pluginCli.runPluginCommand({ action: "upgrade", args: [], flags: {} });
	}
}
