import {defineConfig, Options} from 'tsup'
import * as preset from 'tsup-preset-solid'

const preset_options: preset.PresetOptions = {
    entries: {
        entry: 'src/index.tsx',
    },
    drop_console: true,
}

const CI =
    process.env['CI'] === 'true' ||
    process.env['GITHUB_ACTIONS'] === 'true' ||
    process.env['CI'] === '"1"' ||
    process.env['GITHUB_ACTIONS'] === '"1"'

export default defineConfig(async config => {
    const watching = !!config.watch

    const parsed_options = preset.parsePresetOptions(preset_options, watching)

    if (!watching && !CI) {
        const package_fields = preset.generatePackageExports(parsed_options)
        await preset.writePackageJson(package_fields)
    }

    const options = preset.generateTsupOptions(parsed_options)
    console.log(options)

    return options.map(opt => ({
        ...opt,
        clean: true,
        minify: !watching,
        injectStyle: true,
    } as Options))
})
