<template functional>
  <v-btn
    class="ma-1"
    :class="[data.class, data.staticClass]"
    :color="props.color ? props.color : props.toolbar !== undefined ? 'secondary' : 'primary'"
    :outlined="props.toolbar !== undefined ? true : props.outlined"
    :small="props.toolbar !== undefined ? true : props.small"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <template v-if="props.simpleIcon">
      <v-icon>{{ props.simpleIcon }}</v-icon>
    </template>
    <slot />
  </v-btn>
</template>
