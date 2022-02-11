# SidePopUp 组件
> 右边列表数据单选弹出框组件。

- 泛型T通过组件SidePopUp传入，默认string
- 如设置泛型T为number：
```tsx
<SidePopUp<number> />
```
## 属性

| 属性              | 说明                  | 类型                                  | 默认值        |
|-----------------|---------------------|-------------------------------------|------------|
| title           | 标题                  | `string`                            | `请选择`      |
| selectedId      | 列表项选择id             | `T`                                 | -          |
| list            | 列表数据                | `Item<T>[]                          | undefined` | -  |
| isOpen          | 弹出框是否可见             | `boolean`                           | -          |
| onSelectedClick | `list设置时可用` 列表项选择事件 | `(item: Item<T>) => void;`          | -          |
| closePopUp      | 弹出框关闭回调事件           | `MouseEventHandler<HTMLDivElement>` | -          |
| className       | `AtDrawer` 类名       | `string`                            | `''`       |
| children        | `list 没设置时可用` 自定义内容 | `JSX.Element`                       | -          |
