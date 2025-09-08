// 是资源文件时才替换地址,路由url的话跳转再替换
export function replaceStaticUrl(obj: any) {
    const DOMAIN_NAME = location.origin

    if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'string') {
                if (
                    isHttpUrlAndGetOrigin(obj[key]).isHttp &&
                    isHttpUrlAndGetOrigin(obj[key]).isAsset
                ) {
                    obj[key] = obj[key].replaceAll(
                        isHttpUrlAndGetOrigin(obj[key]).origin!,
                        DOMAIN_NAME,
                    )
                }
            } else if (typeof obj[key] === 'object') {
                replaceStaticUrl(obj[key])
            }
        })
    }
}

export function isHttpUrlAndGetOrigin(url: string) {
    try {
        const urlObj = new URL(url)

        // 检查协议是否是 http 或 https
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return { isHttp: false, origin: null, isAsset: false }
        }

        const pathname = urlObj.pathname.toLowerCase()

        // 常见资源文件扩展名
        const assetExtensions = [
            '.jpg',
            '.jpeg',
            '.png',
            '.gif',
            '.webp',
            '.svg',
            '.ico',
            '.mp4',
            '.webm',
            '.ogg',
            '.mov',
            '.avi',
            '.mp3',
            '.wav',
            '.aac',
            '.js',
            '.mjs',
            '.css',
            '.scss',
            '.woff',
            '.woff2',
            '.ttf',
            '.eot',
            '.pdf',
            '.docx',
            '.xlsx',
            '.pptx',
            '.txt',
            '.zip',
            '.rar',
            '.7z',
            '.tar',
            '.gz',
        ]

        // 判断是否是资源文件
        const isAsset = assetExtensions.some((ext) => pathname.endsWith(ext))

        return {
            isHttp: true,
            origin: urlObj.origin,
            isAsset,
        }
    } catch (e) {
        // URL 格式无效
        return { isHttp: false, origin: null, isAsset: false }
    }
}