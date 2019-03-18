## ROUTER RULEs

### 路由文件

- 每个组件下分别放置对应路由文件，暴露给根目录下使用。

### 路由规则

- 若无特殊需求，所有路由必须为懒加载。

- 若为单页菜单，则在此路由添加onePage属性并设置为true。

- 若路由显示在菜单中，则按路由level层级用‘_’分割命名，name要保持唯一。

- 一级菜单按需求在meta中添加icon属性，具体属性可在ant Design Vue中的icon分类中找对应图标name.

- 若菜单不需要显示在菜单中则添加hidden属性，并设置为true。

- eg: https://github.com/WKlili/ant-design-template-deepexi/blob/master/src/view/Home/router.js

### 菜单路由为什么需要‘_’分割

- 主要是为了菜单在点击，刷新时，保持高亮。

- 假设现在有一个三级菜单。一级菜单name为home，二级菜单为home_index,三级菜单为home_index_index2,若当前点击三级菜单，则会在ant design vue中a-menu组件中的open-keys属性中（数组）push二级和三级路由的name，从而保持菜单打开，selected-keys属性中添加当前focus的router name，保持高亮。
