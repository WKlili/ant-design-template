## ROUTER RULEs

### 路由文件

- 每个组件下分别放置对应路由文件，暴露给根目录下使用。

### 路由规则

- 若无特殊需求，所有路由必须为懒加载。

- 若为单页菜单，则在此路由添加onePage属性并设置为true。

- 一级菜单按需求在meta中添加icon属性，具体属性可在ant Design Vue中的icon分类中找对应图标name.

- 若菜单不需要显示在菜单中则添加hidden属性，并设置为true。

- eg: https://github.com/WKlili/ant-design-template-deepexi/blob/master/src/view/Home/router.js

