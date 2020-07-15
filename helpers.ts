import { renderFileToString } from "./deps.ts"

export const renderView = (view: string, params: object = {}) => {
    return renderFileToString(`${Deno.cwd()}/views/${view}.ejs`, params)
}

export const fileExists = async (filename: string): Promise<boolean> => {
    try {
        const stat = await Deno.lstat(filename)
        return stat && stat.isFile
    }
    catch (e) {
        if (e && e instanceof Deno.errors.NotFound) {
            return false
        } else {
            throw e
        }
    }
}