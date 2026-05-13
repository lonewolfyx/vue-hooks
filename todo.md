# TODO

## 需求：实现 createContext Hook

参考 [reka-ui createContext.ts](https://github.com/unovue/reka-ui/blob/v2/packages/core/src/shared/createContext.ts)，实现类似 React `createContext` 的 Vue 3 上下文 Hooks，封装 Vue 的 `provide` / `inject` API。

## 步骤

- [x] 1. 在 `src/` 目录下创建 `createContext.ts`，参考 reka-ui 源码实现
- [x] 2. 创建 `src/index.ts` 作为入口，导出 `createContext` 和类型
- [x] 3. 创建 `tsdown.config.ts` 配置文件
- [x] 4. 在 `package.json` 中补充构建脚本和包导出配置（exports、main、module、types 字段）
- [x] 5. 执行 `tsdown` 构建，验证产物正确
