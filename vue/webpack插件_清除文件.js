// 获取output路径，也就是出口路径一般为dist
// 绑定钩子事件 compiler.plugin('done', (stats) => {})
// 编译文件，与原来文件对比，删除未匹配文件 （同时可以 options 设置要忽略的文件）

const recursiveReadSync = require("recursive-readdir-sync");
const minimatch = require("minimatch");
const path = require("path");
const fs = require("fs");
const union = require("lodash.union");

// 匹配文件
function getFiles(fromPath, exclude = []) {
    const files = recursiveReadSync(fromPath).filter(file =>
        exclude.every(
            excluded =>
                !minimatch(path.relative(fromPath, file), path.join(excluded), {
                    dot: true
                })
        )
    );
    // console.log(files);
    return files;
}

class WebpackCleanupPlugin {
    constructor(options = {}) {
        // 配置文件
        this.options = options;
    }
    apply(compiler) {
        // 获取output路径
        const outputPath = compiler.options.output.path;
        // 绑定钩子事件
        compiler.plugin("done", stats => {
            if (
                compiler.outputFileSystem.constructor.name !== "NodeOutputFileSystem"
            ) {
                return;
            }
            // 获取编译完成 文件名
            const assets = stats.toJson().assets.map(asset => asset.name);
            console.log(assets);
            // 多数组合并并且去重
            const exclude = union(this.options.exclude, assets);
            console.log(exclude);
            // console.log('outputPath', outputPath);
            // 获取未匹配文件
            const files = getFiles(outputPath, exclude);
            // const files = [];
            console.log("files", files);
            if (this.options.preview) {
                // console.log('%s file(s) would be deleted:', files.length);
                // 输出文件
                files.forEach(file => console.log("    %s", file));
                // console.log();
            } else {
                // 删除未匹配文件
                files.forEach(fs.unlinkSync);
            }
            if (!this.options.quiet) {
                // console.log('\nWebpackCleanupPlugin: %s file(s) deleted.', files.length);
            }
        });
    }
}
module.exports = WebpackCleanupPlugin;
