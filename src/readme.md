## 关于为什么能在`next`能无需配置就能识别`scr`目录下的`pages`

页面（pages）也可以添加到 src/pages 目录下，作为根目录下的 pages 目录的替代品。
该 src 目录在许多应用程序中非常常见，并且 Next.js 默认支持该目录。

> `public`文件夹`如果放在`scr`目录下, 无法被正确识别
>  > 类似 next.config.js 和 tsconfig.json 的配置文件应放在根目录中，将他们移至 src 木下的话将无法使用。这同样适用于 public 目录
