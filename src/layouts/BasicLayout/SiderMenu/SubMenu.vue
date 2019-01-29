<template functional>
  <a-sub-menu
    :key="data.key"
    v-on="listeners">
    <span
      slot="title">
      <a-icon
        v-if="data.attrs['menu-info'].meta.icon"
        :type="data.attrs['menu-info'].meta.icon" /><span>{{ data.attrs['menu-info'].meta.name }}</span>
    </span>
    <template v-for="item in data.attrs['menu-info'].children">
      <template v-if="!item.hidden">
        <a-menu-item
          v-if="!item.children"
          :key="item.name">
          <a-icon
            v-if="item.meta.icon"
            :type="item.meta.icon" />
          <span>{{ item.meta.name }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :key="item.name"
          :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>
