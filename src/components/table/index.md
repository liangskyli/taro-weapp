# Table 组件
> 表格组件。

```tsx
<Table columns={columns} dataSource={dataSource} />
```
## 属性

| 属性             | 说明                       | 类型                | 默认值      |
| --------------- | ------------------------- | ----------------- | ----------- |
| columns         | 表格列的配置描述，具体项见下表 | `Columns`        | - |
| dataSource      | 数据数组,支持一级折叠结构   | `DataSourceItem[]` | -  |
| className       | 类名                      | `string`       | `''`   |

## columns 属性

| 属性             | 说明                       | 类型                | 默认值      |
| --------------- | ------------------------- | ----------------- | ----------- |
| dataIndex       | 列数据在数据项中对应的路径    | `string`        | - |
| title           | 表格标题                   | `string`     | -  |
| subTitle        | 表格副标题                 | `string`       | -  |
| width           | 表格宽度                   | `string`       | -  |
| align           | 对齐方式                   | `'left' \| 'right' \| 'center'`    | -  |
| render          | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据       | `(text, record) => JSX.Element`       | -  |
| fixed           | 列是否固定，目前只支持第一列  | `boolean`       | -  |
