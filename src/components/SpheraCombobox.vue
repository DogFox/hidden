<template>
  <v-autocomplete
    :items="items"
    :label="label"
    :value="value"
    :item-value="itemValue"
    :item-text="itemText"
    :outlined="outlined"
    dense
    return-object
    v-bind="$attrs"
    @input="onChange($event)"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SpheraCombobox',
  model: { prop: 'value', event: 'change' },
  props: {
    /**
     * Значение (ключ кобмобокса)
     * @model
     */
    value: { type: [Number, String], default: undefined },
    label: { type: String, default: 'Комбобокс' },
    items: { type: [Object, Array], default: ()=> {return {};} },
    itemValue: { type: String, default: 'id' },
     /**
     * функция коллбэк для кастомного вызуального вывода элементов комбобокса
     * по-умолчанию это поле значение
     */
    itemText: {
      type: [Function, String],
      default: (item: any) => {
        return item && item.name ? item.name : '';
      },
    },
    outlined: { type: Boolean, default: false },
  },
  data () {
    return {
      select: null,
    };
  },
  // created() {
  //   for (const key in this.items) {
  //     this.$set(this.items[key], '$text', typeof this.itemText === 'function' ? this.itemText(this.items[key]) : this.items[key][this.itemText]);
  //   }
  // },
  methods: {
    onChange(payload: any | string | null) {
      this.$emit('change', typeof payload === 'object' ? (payload && payload[this.itemValue] !== undefined ? payload[this.itemValue] : null) : payload);
      this.$emit('update:itemData', typeof payload === 'object' ? payload : payload ? { $text: payload } : undefined);
    },
  },
});
</script>
